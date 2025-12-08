// Frontend/src/services/categoryService.ts
import { API_ENDPOINTS } from '../config';

const API_URL = API_ENDPOINTS.CATEGORIES;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const categoryService = {
  getAllCategories: async () => {
    const response = await fetch(API_URL);
    return await response.json();
  },

  createCategory: async (categoryData: any) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  },

  updateCategory: async (id: string, categoryData: any) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  },

  deleteCategory: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return await response.json();
  },
};
