const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// JSON Fallback logic
const users = new Map();
const purchases = new Map();
const deployments = new Map();

const DATA_DIR = path.join(__dirname, '..', 'data', 'persistence');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function saveToDisk() {
  if (process.env.DATABASE_URL) return; // Skip if using postgres
  const data = {
    users: Array.from(users.entries()),
    purchases: Array.from(purchases.entries()),
    deployments: Array.from(deployments.entries()),
  };
  fs.writeFileSync(path.join(DATA_DIR, 'db.json'), JSON.stringify(data, null, 2));
}

function loadFromDisk() {
  if (process.env.DATABASE_URL) return;
  const filePath = path.join(DATA_DIR, 'db.json');
  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (data.users) data.users.forEach(([k, v]) => users.set(k, v));
      if (data.purchases) data.purchases.forEach(([k, v]) => purchases.set(k, v));
      if (data.deployments) data.deployments.forEach(([k, v]) => deployments.set(k, v));
    } catch (err) {
      console.error('Error loading data from disk:', err);
    }
  }
}

loadFromDisk();

// Table Initialization
async function initializeTables() {
  if (!process.env.DATABASE_URL) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        developer_id TEXT PRIMARY KEY,
        email TEXT,
        domain TEXT,
        billing_address JSONB,
        card_details JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS purchases (
        purchase_id TEXT PRIMARY KEY,
        developer_id TEXT REFERENCES users(developer_id),
        email TEXT,
        amount DECIMAL,
        amount_usd DECIMAL,
        currency TEXT,
        reference TEXT,
        access_code TEXT,
        domain TEXT,
        hosting TEXT,
        provider TEXT,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        paid_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS deployments (
        deployment_id TEXT PRIMARY KEY,
        developer_id TEXT REFERENCES users(developer_id),
        purchase_id TEXT,
        domain TEXT,
        hosting TEXT,
        provider TEXT,
        status TEXT,
        stages JSONB,
        api_status TEXT,
        ssh_keys JSONB,
        scan_metrics JSONB,
        api_key TEXT,
        dns_records JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Postgres tables initialized');
  } catch (err) {
    console.error('❌ Failed to initialize postgres tables:', err);
  }
}

initializeTables();

// User management
async function getOrCreateUser(developerId, email, domain) {
  if (process.env.DATABASE_URL) {
    const res = await pool.query(
      'INSERT INTO users (developer_id, email, domain, last_login) VALUES ($1, $2, $3, NOW()) ON CONFLICT (developer_id) DO UPDATE SET last_login = NOW() RETURNING *',
      [developerId, email, domain]
    );
    return res.rows[0];
  } else {
    if (!users.has(developerId)) {
      users.set(developerId, {
        developerId,
        email,
        domain,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });
    } else {
      const user = users.get(developerId);
      user.lastLogin = new Date().toISOString();
      if (email) user.email = email;
      if (domain) user.domain = domain;
    }
    saveToDisk();
    return users.get(developerId);
  }
}

async function getUser(developerId) {
  if (process.env.DATABASE_URL) {
    const res = await pool.query('SELECT * FROM users WHERE developer_id = $1', [developerId]);
    return res.rows[0];
  }
  return users.get(developerId);
}

function userExists(developerId) {
  return users.has(developerId);
}

async function getPurchase(purchaseId) {
  if (process.env.DATABASE_URL) {
    const res = await pool.query('SELECT * FROM purchases WHERE purchase_id = $1', [purchaseId]);
    return res.rows[0];
  }
  return purchases.get(purchaseId);
}

// Purchase management
async function createPurchase(purchaseData) {
  const purchaseId = `PUR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  if (process.env.DATABASE_URL) {
    const res = await pool.query(
      'INSERT INTO purchases (purchase_id, developer_id, email, amount, amount_usd, currency, reference, access_code, domain, hosting, provider, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [purchaseId, purchaseData.developerId, purchaseData.email, purchaseData.amount, purchaseData.amountUsd, purchaseData.currency, purchaseData.reference, purchaseData.accessCode, purchaseData.domain, purchaseData.hosting, purchaseData.provider, 'pending']
    );
    return res.rows[0];
  } else {
    const purchase = {
      purchaseId,
      ...purchaseData,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    purchases.set(purchaseId, purchase);
    saveToDisk();
    return purchase;
  }
}

async function updatePurchase(purchaseId, updates) {
  if (process.env.DATABASE_URL) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setQuery = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const res = await pool.query(`UPDATE purchases SET ${setQuery} WHERE purchase_id = $1 RETURNING *`, [purchaseId, ...values]);
    return res.rows[0];
  } else {
    const purchase = purchases.get(purchaseId);
    if (purchase) {
      Object.assign(purchase, updates);
      saveToDisk();
      return purchase;
    }
    return null;
  }
}

async function updatePurchaseByReference(reference, updates) {
  if (process.env.DATABASE_URL) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setQuery = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const res = await pool.query(`UPDATE purchases SET ${setQuery} WHERE reference = $1 RETURNING *`, [reference, ...values]);
    return res.rows[0];
  } else {
    for (const [id, purchase] of purchases.entries()) {
      if (purchase.reference === reference) {
        Object.assign(purchase, updates);
        saveToDisk();
        return purchase;
      }
    }
  }
  return null;
}

async function getUserPurchases(developerId) {
  if (process.env.DATABASE_URL) {
    const res = await pool.query('SELECT * FROM purchases WHERE developer_id = $1 ORDER BY created_at DESC', [developerId]);
    return res.rows;
  }
  const userPurchases = [];
  purchases.forEach((purchase) => {
    if (purchase.developerId === developerId) {
      userPurchases.push(purchase);
    }
  });
  return userPurchases.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Deployment management
async function createDeployment(deploymentData) {
  const deploymentId = `DEP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const defaultStages = [
    { id: 'scanning', name: 'Threat Scanning', status: 'pending', progress: 0, results: [] },
    { id: 'firewall', name: 'Firewall Injection', status: 'pending', progress: 0 },
    { id: 'malware', name: 'Malware Shield Activation', status: 'pending', progress: 0 },
    { id: 'dns', name: 'DNS Protection Deployment', status: 'pending', progress: 0 },
    { id: 'monitoring', name: 'Intrusion Monitoring', status: 'pending', progress: 0 },
  ];
  const apiKey = `ns_live_${Math.random().toString(36).substring(2, 30)}`;
  const dnsRecords = [
    { type: 'A', name: '@', value: '104.16.85.20' },
    { type: 'CNAME', name: 'www', value: deploymentData.domain },
    { type: 'TXT', name: '@', value: `ns-verify=${Math.random().toString(36).substring(2, 10)}` },
  ];

  if (process.env.DATABASE_URL) {
    const res = await pool.query(
      'INSERT INTO deployments (deployment_id, developer_id, purchase_id, domain, hosting, provider, status, stages, api_status, ssh_keys, scan_metrics, api_key, dns_records) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [deploymentId, deploymentData.developerId, deploymentData.purchaseId, deploymentData.domain, deploymentData.hosting, deploymentData.provider, 'pending', JSON.stringify(defaultStages), 'enabled', JSON.stringify([]), JSON.stringify({}), apiKey, JSON.stringify(dnsRecords)]
    );
    return res.rows[0];
  } else {
    const deployment = {
      deploymentId,
      ...deploymentData,
      createdAt: new Date().toISOString(),
      status: 'pending',
      stages: defaultStages,
      apiStatus: 'enabled',
      sshKeys: [],
      scanMetrics: { threatLevel: 'Low', activeAttacks: 0, vulnerabilitiesFound: 0, botnetsDetected: 0 },
      apiKey,
      dnsRecords,
    };
    deployments.set(deploymentId, deployment);
    saveToDisk();
    return deployment;
  }
}

async function getDeployment(deploymentId) {
  if (process.env.DATABASE_URL) {
    const res = await pool.query('SELECT * FROM deployments WHERE deployment_id = $1', [deploymentId]);
    return res.rows[0];
  }
  return deployments.get(deploymentId);
}

async function getUserDeployments(developerId) {
  if (process.env.DATABASE_URL) {
    const res = await pool.query('SELECT * FROM deployments WHERE developer_id = $1 ORDER BY created_at DESC', [developerId]);
    return res.rows;
  }
  const userDeployments = [];
  deployments.forEach((deployment) => {
    if (deployment.developerId === developerId) {
      userDeployments.push(deployment);
    }
  });
  return userDeployments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function updateDeployment(deploymentId, updates) {
  if (process.env.DATABASE_URL) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setQuery = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const res = await pool.query(`UPDATE deployments SET ${setQuery} WHERE deployment_id = $1 RETURNING *`, [deploymentId, ...values]);
    return res.rows[0];
  } else {
    const deployment = deployments.get(deploymentId);
    if (deployment) {
      Object.assign(deployment, updates);
      saveToDisk();
      return deployment;
    }
    return null;
  }
}

async function updateUser(developerId, updates) {
  if (process.env.DATABASE_URL) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    // Convert objects to strings for pg
    const mappedValues = values.map(v => typeof v === 'object' ? JSON.stringify(v) : v);
    const setQuery = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const res = await pool.query(`UPDATE users SET ${setQuery} WHERE developer_id = $1 RETURNING *`, [developerId, ...mappedValues]);
    return res.rows[0];
  } else {
    const user = users.get(developerId);
    if (user) {
      Object.assign(user, updates);
      saveToDisk();
      return user;
    }
    return null;
  }
}

module.exports = {
  getOrCreateUser,
  getUser,
  updateUser,
  userExists,
  createPurchase,
  getPurchase,
  getUserPurchases,
  updatePurchase,
  updatePurchaseByReference,
  createDeployment,
  getDeployment,
  getUserDeployments,
  updateDeployment,
  purchases,
};
