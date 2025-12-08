// API configuration - uses VITE_API_URL env var or defaults to localhost for dev
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
