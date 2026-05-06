import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/config/api-routes';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_in?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<{ data: AuthResponse }>(
      API_ROUTES.auth.login,
      credentials
    );
    
    // Store token in localStorage
    if (response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<{ data: AuthResponse }>(
      API_ROUTES.auth.register,
      data
    );
    
    // Store token in localStorage
    if (response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ROUTES.auth.logout);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ data: User }>(API_ROUTES.auth.user);
    return response.data.data;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ data: { message: string } }>(
      API_ROUTES.auth.forgotPassword,
      { email }
    );
    return response.data.data;
  }

  async resetPassword(data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<{ message: string }> {
    const response = await apiClient.post<{ data: { message: string } }>(
      API_ROUTES.auth.resetPassword,
      data
    );
    return response.data.data;
  }

  async socialLogin(provider: 'google'): Promise<{ url: string }> {
    const response = await apiClient.get<{ data: { url: string } }>(
      API_ROUTES.auth.googleRedirect
    );
    return response.data.data;
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
