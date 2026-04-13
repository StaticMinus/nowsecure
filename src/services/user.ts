// User service - handles authentication and user data

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface User {
  developerId: string;
  email?: string;
  domain?: string;
  createdAt: string;
  lastLogin: string;
}

export interface Purchase {
  purchaseId: string;
  developerId: string;
  email: string;
  amount: number;
  amountUsd: number;
  currency: string;
  reference: string;
  domain: string;
  hosting: string;
  provider: string;
  status: string;
  createdAt: string;
  paidAt?: string;
  deploymentId?: string;
}

export interface DeploymentStage {
  id: string;
  name: string;
  status: 'pending' | 'deploying' | 'completed' | 'failed';
  progress: number;
  updatedAt?: string;
}

export interface Deployment {
  deploymentId: string;
  developerId: string;
  purchaseId: string;
  domain: string;
  hosting: string;
  provider: string;
  amount: number;
  email: string;
  status: 'pending' | 'deploying' | 'active' | 'failed' | 'completed' | 'running';
  stages: DeploymentStage[];
  apiKey: string;
  dnsRecords: Array<{ type: string; name: string; value: string }>;
  createdAt: string;
  updatedAt?: string;
}

export interface UserData {
  user: User;
  purchases: Purchase[];
  deployments: Deployment[];
}

// Login user with developer ID
export const loginUser = async (developerId: string): Promise<{ success: boolean; message?: string; data?: User }> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ developerId }),
  });

  return response.json();
};

// Get user data (purchases + deployments)
export const getUserData = async (developerId: string): Promise<{ success: boolean; data?: UserData; message?: string }> => {
  const response = await fetch(`${API_URL}/api/user/${developerId}`);
  return response.json();
};

// Get user purchases
export const getUserPurchases = async (developerId: string): Promise<{ success: boolean; data?: Purchase[] }> => {
  const response = await fetch(`${API_URL}/api/user/${developerId}/purchases`);
  return response.json();
};

// Get user deployments
export const getUserDeployments = async (developerId: string): Promise<{ success: boolean; data?: Deployment[] }> => {
  const response = await fetch(`${API_URL}/api/user/${developerId}/deployments`);
  return response.json();
};

// Get single deployment
export const getDeployment = async (deploymentId: string): Promise<{ success: boolean; data?: Deployment; message?: string }> => {
  const response = await fetch(`${API_URL}/api/deployment/${deploymentId}`);
  return response.json();
};

// Update deployment status (for simulating progress)
export const updateDeployment = async (
  deploymentId: string, 
  updates: { status?: string; stageId?: string; stageStatus?: string; stageProgress?: number }
): Promise<{ success: boolean; data?: Deployment }> => {
  const response = await fetch(`${API_URL}/api/deployment/${deploymentId}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  return response.json();
};
