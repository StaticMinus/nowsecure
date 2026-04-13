const express = require('express');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const {
  getOrCreateUser,
  getUser,
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
  updateUser,
  purchases,
} = require('./data/store');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Paystack configuration
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Exchange rate: 1 USD = 1,383.46 NGN
const USD_TO_NGN_RATE = 1383.46;

// Authorized developer IDs (in production, use a database)
const AUTHORIZED_DEVELOPER_IDS = [
  'NS-ANDROID-WX8LTIBT-0IR5TC9E-RI1PQ023',
  '74839261590427386105'
];

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'NowSecure Payment API',
    status: 'running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ===== USER API =====

// Authenticate developer
app.post('/api/auth/login', async (req, res) => {
  const { developerId } = req.body;
  
  if (!developerId) {
    return res.status(400).json({ success: false, message: 'Developer ID is required' });
  }

  // Check if authorized
  const isAuthorized = AUTHORIZED_DEVELOPER_IDS.includes(developerId);
  
  if (!isAuthorized) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid Developer Console ID. Access denied.' 
    });
  }

  // Get or create user
  const user = await getOrCreateUser(developerId);
  
  res.json({
    success: true,
    data: {
      developerId: user.developer_id || user.developerId,
      email: user.email,
      domain: user.domain,
      createdAt: user.created_at || user.createdAt,
      lastLogin: user.last_login || user.lastLogin,
      isNewUser: !userExists(developerId) || (await getUserPurchases(developerId)).length === 0
    }
  });
});

// Get user profile with purchases and deployments
app.get('/api/user/:developerId', async (req, res) => {
  const { developerId } = req.params;
  
  const user = await getUser(developerId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const purchases = await getUserPurchases(developerId);
  const deployments = await getUserDeployments(developerId);

  res.json({
    success: true,
    data: {
      user,
      purchases,
      deployments
    }
  });
});

// Update user billing info
app.post('/api/user/:developerId/billing', async (req, res) => {
  const { developerId } = req.params;
  const { billingAddress, cardDetails } = req.body;
  
  const user = await getUser(developerId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const updatedUser = await updateUser(developerId, { 
    billing_address: billingAddress, 
    card_details: cardDetails 
  });

  res.json({
    success: true,
    data: updatedUser
  });
});

// Get user purchases
app.get('/api/user/:developerId/purchases', async (req, res) => {
  const { developerId } = req.params;
  const purchases = await getUserPurchases(developerId);
  
  res.json({
    success: true,
    data: purchases
  });
});

// Get user deployments
app.get('/api/user/:developerId/deployments', async (req, res) => {
  const { developerId } = req.params;
  const deployments = await getUserDeployments(developerId);
  
  res.json({
    success: true,
    data: deployments
  });
});

// Get single deployment
app.get('/api/deployment/:deploymentId', async (req, res) => {
  const { deploymentId } = req.params;
  const deployment = await getDeployment(deploymentId);
  
  if (!deployment) {
    return res.status(404).json({ success: false, message: 'Deployment not found' });
  }
  
  res.json({
    success: true,
    data: deployment
  });
});

// Update deployment status (simulated progress)
app.post('/api/deployment/:deploymentId/update', async (req, res) => {
  const { deploymentId } = req.params;
  const { status, stageId, stageStatus, stageProgress } = req.body;
  
  const deployment = await getDeployment(deploymentId);
  if (!deployment) {
    return res.status(404).json({ success: false, message: 'Deployment not found' });
  }
  
  const updates = {};
  if (status) updates.status = status;
  
  if (stageId && stageStatus !== undefined) {
    const stages = deployment.stages;
    const stage = stages.find(s => s.id === stageId);
    if (stage) {
      stage.status = stageStatus;
      stage.progress = stageProgress || 0;
      stage.updatedAt = new Date().toISOString();
      
      if (stage.id === 'scanning' && stageStatus === 'completed') {
        stage.results = [
          { type: 'High', message: 'Active C2 Botnet connection detected via port 4444' },
          { type: 'Critical', message: 'Unauthorized SSH brute-force attempt' }
        ];
      }
      updates.stages = JSON.stringify(stages);
    }
  }
  
  const result = await updateDeployment(deploymentId, updates);
  
  res.json({
    success: true,
    data: result
  });
});

// Update API Status
app.post('/api/deployment/:deploymentId/api-status', async (req, res) => {
  const { deploymentId } = req.params;
  const { status } = req.body;
  
  const result = await updateDeployment(deploymentId, { api_status: status });
  res.json({ success: true, data: result });
});

// Manage SSH Keys
app.post('/api/deployment/:deploymentId/ssh-keys', async (req, res) => {
  const { deploymentId } = req.params;
  const { action, keyId, keyName, publicKey } = req.body;
  
  const deployment = getDeployment(deploymentId);
  if (!deployment) {
    return res.status(404).json({ success: false, message: 'Deployment not found' });
  }
  
  if (action === 'add') {
    const newKey = {
      id: `key-${Date.now()}`,
      name: keyName,
      publicKey,
      createdAt: new Date().toISOString()
    };
    deployment.sshKeys = deployment.sshKeys || [];
    deployment.sshKeys.push(newKey);
  } else if (action === 'delete') {
    deployment.sshKeys = deployment.sshKeys.filter(k => k.id !== keyId);
  }
  
  res.json({ success: true, data: deployment });
});

// ===== PAYMENT API =====

// Initialize Paystack transaction
app.post('/api/payment/initialize', async (req, res) => {
  try {
    const { email, amount, currency = 'NGN', metadata = {} } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and amount are required' 
      });
    }

    // Convert USD to NGN if needed
    let amountInKobo = amount;
    if (currency === 'USD') {
      amountInKobo = Math.round(amount * USD_TO_NGN_RATE * 100);
    } else {
      amountInKobo = Math.round(amount * 100);
    }

    const callbackUrl = process.env.FRONTEND_URL 
      ? `${process.env.FRONTEND_URL}/payment/callback`
      : 'http://localhost:5173/payment/callback';

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amountInKobo,
        currency: 'NGN',
        callback_url: callbackUrl,
        metadata: {
          ...metadata,
          original_currency: currency,
          original_amount: amount,
          developer_id: metadata.developerId,
          domain: metadata.domain,
          hosting: metadata.hosting,
          provider: metadata.provider
        }
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const paystackData = response.data.data;
    
    // Create purchase record
    const purchase = await createPurchase({
      developerId: metadata.developerId,
      email,
      amount: amountInKobo / 100, // Store in NGN
      amountUsd: amount,
      currency: 'NGN',
      reference: paystackData.reference,
      accessCode: paystackData.access_code,
      domain: metadata.domain,
      hosting: metadata.hosting,
      provider: metadata.provider,
    });

    res.json({
      success: true,
      data: {
        authorization_url: paystackData.authorization_url,
        access_code: paystackData.access_code,
        reference: paystackData.reference,
        purchaseId: purchase.purchase_id || purchase.purchaseId
      }
    });
  } catch (error) {
    console.error('Paystack initialize error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Payment initialization failed',
      error: error.response?.data?.message || error.message
    });
  }
});

// Verify Paystack transaction
app.get('/api/payment/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const transaction = response.data.data;
    
    // Update purchase status
    const purchase = await updatePurchaseByReference(reference, {
      status: transaction.status,
      paid_at: transaction.paid_at,
    });

    // If payment successful, create deployment
    let deployment = null;
    if (transaction.status === 'success' && purchase) {
      deployment = await createDeployment({
        developerId: purchase.developer_id || purchase.developerId,
        purchaseId: purchase.purchase_id || purchase.purchaseId,
        domain: purchase.domain,
        hosting: purchase.hosting,
        provider: purchase.provider,
        email: purchase.email,
      });
      
      // Update purchase with deployment ID
      await updatePurchase(purchase.purchase_id || purchase.purchaseId, { deploymentId: deployment.deployment_id || deployment.deploymentId });
    }
    
    res.json({
      success: true,
      data: {
        status: transaction.status,
        reference: transaction.reference,
        amount: transaction.amount / 100,
        currency: transaction.currency,
        paid_at: transaction.paid_at,
        channel: transaction.channel,
        customer: transaction.customer,
        purchaseId: purchase?.purchase_id || purchase?.purchaseId,
        deploymentId: deployment?.deployment_id || deployment?.deploymentId
      }
    });
  } catch (error) {
    console.error('Paystack verify error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.response?.data?.message || error.message
    });
  }
});


// Paystack Webhook
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(400).json({ success: false, message: 'Invalid signature' });
  }

  const event = JSON.parse(req.body);
  
  switch (event.event) {
    case 'charge.success':
      console.log('Payment successful via webhook:', event.data);
      const purchase = await updatePurchaseByReference(event.data.reference, {
        status: 'success',
        paidAt: event.data.paid_at,
      });
      
      if (purchase && !purchase.deploymentId) {
        const deployment = await createDeployment({
          developerId: purchase.developer_id || purchase.developerId,
          purchaseId: purchase.purchase_id || purchase.purchaseId,
          domain: purchase.domain,
          hosting: purchase.hosting,
          provider: purchase.provider,
          email: purchase.email,
        });
        await updatePurchase(purchase.purchase_id || purchase.purchaseId, { deploymentId: deployment.deployment_id || deployment.deploymentId });
      }
      break;
    case 'charge.failed':
      console.log('Payment failed via webhook:', event.data);
      await updatePurchaseByReference(event.data.reference, {
        status: 'failed',
      });
      break;
    default:
      console.log('Unhandled event:', event.event);
  }

  res.sendStatus(200);
});

// Get exchange rate
app.get('/api/exchange-rate', (req, res) => {
  res.json({
    success: true,
    data: {
      usd_to_ngn: USD_TO_NGN_RATE,
      updated_at: new Date().toISOString()
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Exchange Rate: 1 USD = ${USD_TO_NGN_RATE} NGN`);
});
