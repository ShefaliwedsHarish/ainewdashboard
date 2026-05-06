import { apiService } from "./api";
import apiClient from "@/lib/axios";
import { API_ROUTES } from "./apiRoutes";

export interface BillingPlan {
  id: number;
  plan_key: string;
  name: string;
  billing: "monthly" | "annual";
  price: string;
  currency?: string;
  description?: string;
  features?: string[];
  is_active?: boolean;
  most_popular?: boolean;
}

export interface MyPlan {
  has_plan: boolean;
  is_active: boolean;
  access_type: "trial" | "subscription" | "free";
  plan: string;
  plan_name: string;
  status: string;
  // trial fields
  trial_days_left?: number;
  trial_days_used?: number;
  trial_total_days?: number;
  trial_ends_at?: string;
  trial_started_at?: string;
  trial_expired?: boolean;
  // subscription fields
  amount?: string;
  billing?: string;
  currency?: string;
  days_remaining?: number;
  days_used?: number;
  total_days?: number;
  starts_at?: string;
  ends_at?: string;
  features?: string[];
  most_popular?: boolean;
}

export interface SubscriptionValidation {
  valid: boolean;
  access_type: string;
  data: {
    status: string;
    trial_started_at?: string;
    trial_ends_at?: string;
    trial_days_left?: number;
    plan?: string;
    plan_name?: string;
    amount?: string;
    currency?: string;
    starts_at?: string;
    ends_at?: string;
    days_remaining?: number;
  };
}

export interface Invoice {
  id: number;
  invoice_number: string;
  user_id: number;
  subscription_id: number | null;
  plan_id?: number;
  plan_name?: string;
  amount?: number | string;
  amount_due?: number;
  currency?: string;
  status?: string;
  description?: string;
  invoice_pdf?: string;
  hosted_invoice_url?: string;
  created_at?: string;
  updated_at?: string;
  // legacy stripe fields
  number?: string;
  date?: string;
  created?: number;
}

export interface PaymentIntentResponse {
  client_secret: string;
  payment_intent_id: string;
}

const s = API_ROUTES.stripe;

export const billingService = {
  getBillingPlans: () =>
    apiClient.get<{ success: boolean; data: BillingPlan[] }>(API_ROUTES.plans.base, { timeout: 30000 })
      .then((r) => r.data.data ?? r.data),

  getMyPlan: () =>
    apiClient.get<{ has_plan: boolean; data?: MyPlan } & MyPlan>(s.myPlan, { timeout: 30000 })
      .then((r) => (r.data.has_plan !== undefined ? r.data : r.data) as unknown as MyPlan),

  getInvoices: () =>
    apiClient.get<{ success: boolean; data: Invoice[] } | Invoice[]>(s.invoices, { timeout: 30000 })
      .then((r) => {
        const d = r.data as any;
        return Array.isArray(d) ? d : (d.data ?? []);
      }),

  getInvoiceById: (id: string) =>
    apiService.get<Invoice>(s.invoiceById(id)),

  createPaymentIntent: (data: { plan: string; billing_cycle?: string }) =>
    apiClient.post<{ data: PaymentIntentResponse } | PaymentIntentResponse>(s.createPaymentIntent, data)
      .then((r) => {
        const d = r.data as any;
        return (d.data ?? d) as PaymentIntentResponse;
      }),

  confirmPayment: (payment_intent_id: string) =>
    apiService.post(s.confirmPayment, { payment_intent_id }),

  cancelSubscription: () =>
    apiService.post(s.cancel),
};
