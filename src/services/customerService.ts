import { API_ENDPOINTS } from '../config';

const API_URL = API_ENDPOINTS.CUSTOMERS;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const customerService = {
  getAllCustomers: async () => {
    const res = await fetch(API_URL);
    return await res.json();
  },

  getCustomerById: async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`);
    return await res.json();
  },

  createCustomer: async (data: any) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  updateCustomer: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  deleteCustomer: async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return await res.json();
  },
};
