import { apiService } from "./api";
import { API_ROUTES } from "./apiRoutes";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const { login, register, logout, forgotPassword, resetPassword } = API_ROUTES.auth;

export const authService = {
  login: (data: LoginPayload) =>
    apiService.post<AuthResponse>(login, data),

  signup: (data: SignupPayload) =>
    apiService.post<AuthResponse>(register, data),

  logout: () =>
    apiService.post(logout),

  forgotPassword: (email: string) =>
    apiService.post(forgotPassword, { email }),

  resetPassword: (token: string, email: string, password: string, password_confirmation: string) =>
    apiService.post(resetPassword, { token, email, password, password_confirmation }),
};
