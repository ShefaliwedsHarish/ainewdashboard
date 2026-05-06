import apiClient from '@/lib/axios';
import type { AxiosResponse } from 'axios';

// Unwrap response — handles both { data: T } and direct T responses
function unwrap<T>(response: AxiosResponse<any>): T {
  return response.data?.data !== undefined ? response.data.data : response.data;
}

// Generic API service class
class ApiService {
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await apiClient.get(url, { params });
    return unwrap<T>(response);
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await apiClient.post(url, data);
    return unwrap<T>(response);
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await apiClient.put(url, data);
    return unwrap<T>(response);
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await apiClient.patch(url, data);
    return unwrap<T>(response);
  }

  async delete<T>(url: string): Promise<T> {
    const response = await apiClient.delete(url);
    return unwrap<T>(response);
  }
}

export const apiService = new ApiService();
