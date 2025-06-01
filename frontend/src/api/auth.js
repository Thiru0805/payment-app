import { BACKEND_BASE_URL } from '../config/env';

export const signup = async (data) => {
  const response = await fetch(`${BACKEND_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Signup failed' }));
    throw new Error(error.message || 'Signup failed');
  }

  return await response.json(); 
};

export const login = async (data) => {
  const res = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Login failed');
  }

  return result;
};

export const initiatePayment = async (amount) => {
  const res = await fetch(`${BACKEND_BASE_URL}/payment/initiate`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Payment initiation failed');
  }

  return result; 
};

export const checkPaymentStatus = async (orderId) => {
  const res = await fetch(`${BACKEND_BASE_URL}/payment/status/${orderId}`);
  const data = await res.json();
  return data;
};

export const refundPayment = async (orderId) => {
  const res = await fetch(`${BACKEND_BASE_URL}/payment/refund/${orderId}`, {
    method: 'POST',
    credentials: 'include',
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Refund failed');
  }

  return result;
};

