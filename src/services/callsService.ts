import { apiService } from "./api";
import apiClient from "@/lib/axios";
import { API_ROUTES } from "./apiRoutes";

export interface CallMessage {
  id?: string | number;
  call_id?: number;
  role?: "agent" | "user";
  speaker?: "ai" | "user";
  author?: string;
  message?: string;
  text?: string;
  time?: number;
  created_at?: string;
}

export interface Call {
  id?: string | number;
  uuid?: string;
  conversation_id?: string;
  user_id?: number;
  agent_id?: number;
  customer_id?: number;
  customer_name?: string | null;
  phone?: string;
  date?: string;
  type?: string;
  call_type?: string;
  intent?: string;
  status?: string;
  duration?: number | string;
  summary?: string;
  language?: string;
  cost?: string;
  from?: string;
  to?: string;
  recording_url?: string | null;
  recording_path?: string | null;
  twilio_sid?: string | null;
  metadata?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
  transcript?: CallMessage[];
  customer?: { id: number; name: string; email: string; phone: string; total_calls?: number };
  agent?: { id: number; name: string; goal?: string; tone?: string; status?: string };
  messages?: CallMessage[];
}

export interface PaginatedCalls {
  data: Call[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const { base, byId, messages } = API_ROUTES.calls;

export const callsService = {
  getAll: (page = 1, params?: { search?: string; intent?: string }) =>
    apiClient
      .get<PaginatedCalls>(base, {
        params: {
          page,
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.intent && params.intent !== "All" ? { intent: params.intent } : {}),
        },
      })
      .then((r) => r.data),
  getById: (id: string) => apiService.get<Call>(byId(id)),
  create: (data: Partial<Call>) => apiService.post<Call>(base, data),
  update: (id: string, data: Partial<Call>) => apiService.put<Call>(byId(id), data),
  delete: (id: string) => apiService.delete(byId(id)),
  getMessages: (id: string) => apiService.get<CallMessage[]>(messages(id)),
  addMessage: (id: string, data: { role: string; message: string }) =>
    apiService.post<CallMessage>(messages(id), data),
};
