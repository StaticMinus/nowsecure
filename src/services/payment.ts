// Payment service - calls backend API

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface PaymentData {
  email: string;
  amount: number;
  currency?: 'USD' | 'NGN';
  metadata?: Record<string, any>;
}

export interface InitializeResponse {
  success: boolean;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
  message?: string;
}

export interface VerifyResponse {
  success: boolean;
  data?: {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at: string;
    channel: string;
    customer: {
      email: string;
    };
    purchaseId?: string;
    deploymentId?: string;
  };
  message?: string;
}

// Initialize payment (redirects to Paystack)
export const initializePayment = async (paymentData: PaymentData): Promise<InitializeResponse> => {
  const response = await fetch(`${API_URL}/api/payment/initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  return response.json();
};

// Verify payment after callback
export const verifyPayment = async (reference: string): Promise<VerifyResponse> => {
  const response = await fetch(`${API_URL}/api/payment/verify/${reference}`);
  return response.json();
};

// Get current exchange rate
export const getExchangeRate = async () => {
  const response = await fetch(`${API_URL}/api/exchange-rate`);
  return response.json();
};
