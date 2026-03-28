// Simple in-memory data store (replace with database in production)

const users = new Map();
const purchases = new Map();
const deployments = new Map();

// User management
function getOrCreateUser(developerId, email, domain) {
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
  return users.get(developerId);
}

function getUser(developerId) {
  return users.get(developerId);
}

function userExists(developerId) {
  return users.has(developerId);
}

// Purchase management
function createPurchase(purchaseData) {
  const purchaseId = `PUR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const purchase = {
    purchaseId,
    ...purchaseData,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  purchases.set(purchaseId, purchase);
  return purchase;
}

function getPurchase(purchaseId) {
  return purchases.get(purchaseId);
}

function getUserPurchases(developerId) {
  const userPurchases = [];
  purchases.forEach((purchase) => {
    if (purchase.developerId === developerId) {
      userPurchases.push(purchase);
    }
  });
  return userPurchases.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function updatePurchase(purchaseId, updates) {
  const purchase = purchases.get(purchaseId);
  if (purchase) {
    Object.assign(purchase, updates);
    return purchase;
  }
  return null;
}

// Deployment management
function createDeployment(deploymentData) {
  const deploymentId = `DEP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const deployment = {
    deploymentId,
    ...deploymentData,
    createdAt: new Date().toISOString(),
    status: 'pending',
    stages: [
      { id: 'scanning', name: 'Threat Scanning', status: 'pending', progress: 0 },
      { id: 'firewall', name: 'Firewall Injection', status: 'pending', progress: 0 },
      { id: 'malware', name: 'Malware Shield Activation', status: 'pending', progress: 0 },
      { id: 'dns', name: 'DNS Protection Deployment', status: 'pending', progress: 0 },
      { id: 'monitoring', name: 'Intrusion Monitoring', status: 'pending', progress: 0 },
    ],
    apiKey: `ns_live_${Math.random().toString(36).substring(2, 30)}`,
    dnsRecords: [
      { type: 'A', name: '@', value: '104.16.85.20' },
      { type: 'CNAME', name: 'www', value: deploymentData.domain },
      { type: 'TXT', name: '@', value: `ns-verify=${Math.random().toString(36).substring(2, 10)}` },
    ],
  };
  deployments.set(deploymentId, deployment);
  return deployment;
}

function getDeployment(deploymentId) {
  return deployments.get(deploymentId);
}

function getUserDeployments(developerId) {
  const userDeployments = [];
  deployments.forEach((deployment) => {
    if (deployment.developerId === developerId) {
      userDeployments.push(deployment);
    }
  });
  return userDeployments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function updateDeployment(deploymentId, updates) {
  const deployment = deployments.get(deploymentId);
  if (deployment) {
    Object.assign(deployment, updates);
    return deployment;
  }
  return null;
}

module.exports = {
  getOrCreateUser,
  getUser,
  userExists,
  createPurchase,
  getPurchase,
  getUserPurchases,
  updatePurchase,
  createDeployment,
  getDeployment,
  getUserDeployments,
  updateDeployment,
};
