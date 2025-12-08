// API configuration - prefer a runtime override `window.__API_BASE_URL` when available,
// otherwise use the Vite build-time env var `VITE_API_URL`, and finally fall back to localhost.
const runtimeBase = typeof window !== 'undefined' && (window as any).__API_BASE_URL;
const envBase = import.meta.env?.VITE_API_URL;
const defaultBase = 'http://localhost:5000';

// Normalize: remove trailing slash if present
const normalize = (u?: string) => (u ? u.replace(/\/+$/, '') : undefined);

export const API_BASE_URL = normalize(runtimeBase) || normalize(envBase) || defaultBase;

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  USERS: `${API_BASE_URL}/api/users`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  CUSTOMERS: `${API_BASE_URL}/api/customers`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  WAREHOUSES: `${API_BASE_URL}/api/warehouses`,
  STOCK: `${API_BASE_URL}/api/stock`,
  ATTENDANCE: `${API_BASE_URL}/api/attendance`,
  SHIFTS: `${API_BASE_URL}/api/shifts`,
};
