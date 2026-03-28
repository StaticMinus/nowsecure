const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

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

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'NowSecure Payment API',
    status: 'running',
    environment: process.env.NODE_ENV || 'development'
  });
});

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
      // Amount is already in NGN, convert to kobo
      amountInKobo = Math.round(amount * 100);
    }

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amountInKobo,
        currency: 'NGN', // Paystack processes in NGN
        callback_url: process.env.FRONTEND_URL || 'http://localhost:5173/payment/callback',
        metadata: {
          ...metadata,
          original_currency: currency,
          original_amount: amount
        }
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      data: response.data.data
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
    
    res.json({
      success: true,
      data: {
        status: transaction.status,
        reference: transaction.reference,
        amount: transaction.amount / 100, // Convert from kobo
        currency: transaction.currency,
        paid_at: transaction.paid_at,
        channel: transaction.channel,
        customer: transaction.customer
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
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(400).json({ success: false, message: 'Invalid signature' });
  }

  const event = JSON.parse(req.body);
  
  // Handle different event types
  switch (event.event) {
    case 'charge.success':
      console.log('Payment successful:', event.data);
      // TODO: Update your database, send confirmation email, etc.
      break;
    case 'charge.failed':
      console.log('Payment failed:', event.data);
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
