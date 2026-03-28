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
  createDeployment,
  getDeployment,
  getUserDeployments,
  updateDeployment,
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
  'NS-ANDROID-WX8LTIBT-0IR5TC9E-RI1PQ023'
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
app.post('/api/auth/login', (req, res) => {
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
  const user = getOrCreateUser(developerId);
  
  res.json({
    success: true,
    data: {
      developerId: user.developerId,
      email: user.email,
      domain: user.domain,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      isNewUser: !userExists(developerId) || getUserPurchases(developerId).length === 0
    }
  });
});

// Get user profile with purchases and deployments
app.get('/api/user/:developerId', (req, res) => {
  const { developerId } = req.params;
  
  const user = getUser(developerId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const purchases = getUserPurchases(developerId);
  const deployments = getUserDeployments(developerId);

  res.json({
    success: true,
    data: {
      user,
      purchases,
      deployments
    }
  });
});

// Get user purchases
app.get('/api/user/:developerId/purchases', (req, res) => {
  const { developerId } = req.params;
  const purchases = getUserPurchases(developerId);
  
  res.json({
    success: true,
    data: purchases
  });
});

// Get user deployments
app.get('/api/user/:developerId/deployments', (req, res) => {
  const { developerId } = req.params;
  const deployments = getUserDeployments(developerId);
  
  res.json({
    success: true,
    data: deployments
  });
});

// Get single deployment
app.get('/api/deployment/:deploymentId', (req, res) => {
  const { deploymentId } = req.params;
  const deployment = getDeployment(deploymentId);
  
  if (!deployment) {
    return res.status(404).json({ success: false, message: 'Deployment not found' });
  }
  
  res.json({
    success: true,
    data: deployment
  });
});

// Update deployment status (simulated progress)
app.post('/api/deployment/:deploymentId/update', (req, res) => {
  const { deploymentId } = req.params;
  const { status, stageId, stageStatus, stageProgress } = req.body;
  
  const deployment = getDeployment(deploymentId);
  if (!deployment) {
    return res.status(404).json({ success: false, message: 'Deployment not found' });
  }
  
  if (status) {
    deployment.status = status;
  }
  
  if (stageId && stageStatus !== undefined) {
    const stage = deployment.stages.find(s => s.id === stageId);
    if (stage) {
      stage.status = stageStatus;
      stage.progress = stageProgress || 0;
      stage.updatedAt = new Date().toISOString();
    }
  }
  
  deployment.updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    data: deployment
  });
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
    const purchase = createPurchase({
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
        purchaseId: purchase.purchaseId
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
    const purchase = updatePurchaseByReference(reference, {
      status: transaction.status,
      paidAt: transaction.paid_at,
      channel: transaction.channel,
      transactionId: transaction.id
    });

    // If payment successful, create deployment
    let deployment = null;
    if (transaction.status === 'success' && purchase) {
      deployment = createDeployment({
        developerId: purchase.developerId,
        purchaseId: purchase.purchaseId,
        domain: purchase.domain,
        hosting: purchase.hosting,
        provider: purchase.provider,
        amount: purchase.amount,
        email: purchase.email,
      });
      
      // Update purchase with deployment ID
      updatePurchase(purchase.purchaseId, { deploymentId: deployment.deploymentId });
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
        purchaseId: purchase?.purchaseId,
        deploymentId: deployment?.deploymentId
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

// Helper function to update purchase by reference
function updatePurchaseByReference(reference, updates) {
  // Find purchase by reference
  for (const [id, purchase] of purchases.entries()) {
    if (purchase.reference === reference) {
      Object.assign(purchase, updates);
      return purchase;
    }
  }
  return null;
}

// Paystack Webhook
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), (req, res) => {
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
      const purchase = updatePurchaseByReference(event.data.reference, {
        status: 'success',
        paidAt: event.data.paid_at,
        channel: event.data.channel,
        transactionId: event.data.id
      });
      
      if (purchase && !purchase.deploymentId) {
        const deployment = createDeployment({
          developerId: purchase.developerId,
          purchaseId: purchase.purchaseId,
          domain: purchase.domain,
          hosting: purchase.hosting,
          provider: purchase.provider,
          amount: purchase.amount,
          email: purchase.email,
        });
        updatePurchase(purchase.purchaseId, { deploymentId: deployment.deploymentId });
      }
      break;
    case 'charge.failed':
      console.log('Payment failed via webhook:', event.data);
      updatePurchaseByReference(event.data.reference, {
        status: 'failed',
        failedAt: new Date().toISOString()
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
