import apiClient from "@/lib/axios";
import { API_ROUTES } from "./apiRoutes";

export interface Customer {
  id?: string | number;
  phone: string;
  name: string | null;
  total_calls: number;
  last_contact?: string;
  email?: string;
  source?: string;
  status?: string;
}

export interface CustomerCall {
  id?: string | number;
  uuid?: string;
  phone?: string;
  from?: string;
  intent?: string;
  call_type?: string;
  status?: string;
  duration?: number | string;
  summary?: string;
  created_at?: string;
  transcript?: { role: string; message?: string; text?: string; time?: number }[];
}

export interface PaginatedCustomers {
  data: Customer[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const { base, byId } = API_ROUTES.customers;

export const customersService = {
  getAll: (page = 1, params?: { search?: string; per_page?: number }) =>
    apiClient
      .get<PaginatedCustomers>(base, {
        params: {
          page,
          per_page: params?.per_page ?? 10,
          ...(params?.search ? { search: params.search } : {}),
        },
      })
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<Customer>(byId(id)).then((r) => r.data),

  getCallsByPhone: (phone: string) =>
    apiClient
      .get<{ phone: string; name: string; total_calls: number; calls: CustomerCall[] }>(
        `/customers/${encodeURIComponent(phone)}/calls`
      )
      .then((r) => r.data?.calls ?? []),
  create: (data: Partial<Customer>) =>
    apiClient.post<Customer>(base, data).then((r) => r.data),

  update: (id: string, data: Partial<Customer>) =>
    apiClient.put<Customer>(byId(id), data).then((r) => r.data),

  delete: (id: string) =>
    apiClient.delete(byId(id)).then((r) => r.data),
};
