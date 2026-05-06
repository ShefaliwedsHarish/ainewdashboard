import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { billingService, type BillingPlan } from "@/services/billingService";
import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/config/api-routes";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "");

export const Route = createFileRoute("/subscribe-plan")({
  component: SubscribePlan,
});

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function PaymentForm({ plan, onSuccess, onBack }: { plan: BillingPlan; onSuccess: () => void; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [ready, setReady] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    try {
      const { error: submitErr } = await elements.submit();
      if (submitErr) { toast.error(submitErr.message ?? "Validation failed"); return; }
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/dashboard` },
        redirect: "if_required",
      });
      if (error) {
        toast.error(error.message ?? "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        await billingService.confirmPayment(paymentIntent.id);
        toast.success("Payment successful! Welcome to Lyraa.");
        onSuccess();
      }
    } catch {
      toast.error("Payment failed");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div style={{ maxWidth: "440px", margin: "0 auto", width: "100%" }}>
      <div style={{ background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#4f46e5", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px" }}>
            Completing payment
          </div>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "#111" }}>
            {plan.name} — ${parseFloat(plan.price).toFixed(2)}<span style={{ fontSize: "13px", fontWeight: "400", color: "#888" }}>/mo</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ minHeight: "260px" }}>
            <PaymentElement onReady={() => setReady(true)} />
          </div>
          <button
            type="submit"
            disabled={!stripe || !ready || processing}
            style={{ width: "100%", padding: "13px", background: ready ? "#4f46e5" : "#ccc", color: "white", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "600", cursor: (!ready || processing) ? "not-allowed" : "pointer", fontFamily: "inherit" }}
          >
            {processing ? "Processing…" : ready ? `Pay $${parseFloat(plan.price).toFixed(2)}` : "Loading…"}
          </button>
        </form>
        <div style={{ marginTop: "12px", textAlign: "center", fontSize: "11.5px", color: "#aaa" }}>
          Secured by <strong style={{ color: "#333" }}>Stripe</strong> · PCI DSS compliant
        </div>
      </div>
      <button onClick={onBack} style={{ marginTop: "16px", width: "100%", background: "none", border: "none", color: "#888", fontSize: "13px", cursor: "pointer", textDecoration: "underline" }}>
        ← Back to plans
      </button>
    </div>
  );
}

function SubscribePlan() {
  const navigate = useNavigate();
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly");
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<BillingPlan | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Only redirect if subscription is valid — allows direct navigation for testing
    apiClient.get(API_ROUTES.subscription.validate)
      .then((res) => {
        const payload = res.data?.data ?? res.data;
        // If already has active subscription, go to dashboard
        if ( payload?.data !== null) {
          navigate({ to: "/dashboard", replace: true });
          return;
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));

    billingService.getBillingPlans()
      .then((data) => {
        const active = (Array.isArray(data) ? data : []).filter((p) => p.is_active !== false);
        setPlans(active);
        const first = active.find((p) => p.billing === "monthly") ?? active[0];
        if (first) setSelectedKey(first.plan_key);
      })
      .catch(console.error);
  }, []);

  async function handleSubscribe(plan: BillingPlan) {
    setSubmitting(plan.plan_key);
    try {
      const { client_secret } = await billingService.createPaymentIntent({
        plan: plan.plan_key,
        billing_cycle: plan.billing,
      });
      setClientSecret(client_secret);
      setCheckoutPlan(plan);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Failed to initiate payment";
      toast.error(msg);
    } finally {
      setSubmitting(null);
    }
  }

  const visiblePlans = plans.filter((p) => p.billing === cycle);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "3px solid #e5e7eb", borderTopColor: "#4f46e5", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "Inter, sans-serif" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <g transform="translate(2, 12)">
              <rect x="0" y="-2.5" width="2" height="5" rx="1" fill="white" opacity="0.85"/>
              <rect x="4" y="-5" width="2" height="10" rx="1" fill="white" opacity="0.92"/>
              <rect x="8" y="-7.5" width="2" height="15" rx="1" fill="white"/>
              <rect x="12" y="-4" width="2" height="8" rx="1" fill="white" opacity="0.92"/>
              <rect x="16" y="-6" width="2" height="12" rx="1" fill="white" opacity="0.85"/>
            </g>
          </svg>
        </div>
        <span style={{ fontSize: "20px", fontWeight: "700", color: "#111", letterSpacing: "-0.5px" }}>lyraa</span>
      </div>

      <div style={{ width: "100%", maxWidth: "960px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#111", letterSpacing: "-0.75px", marginBottom: "8px" }}>Choose your plan</h1>
          <p style={{ fontSize: "14px", color: "#888" }}>Select a plan and complete payment to get started</p>
        </div>

        {!clientSecret ? (
          <>
            {/* Billing toggle */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
              <div style={{ display: "inline-flex", background: "white", borderRadius: "999px", padding: "4px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                {(["monthly", "annual"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setCycle(tab);
                      const first = plans.find((p) => p.billing === tab);
                      if (first) setSelectedKey(first.plan_key);
                    }}
                    style={{ padding: "8px 24px", borderRadius: "999px", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", background: cycle === tab ? "#4f46e5" : "transparent", color: cycle === tab ? "white" : "#666", transition: "all 0.15s" }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {tab === "annual" && <span style={{ marginLeft: "6px", fontSize: "10px", background: "#dcfce7", color: "#166534", padding: "1px 6px", borderRadius: "8px", fontWeight: "700" }}>Save 20%</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan cards */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(visiblePlans.length, 3)}, 1fr)`, gap: "16px", marginBottom: "24px" }}>
              {visiblePlans.map((plan) => {
                const price = parseFloat(plan.price);
                const isSelected = selectedKey === plan.plan_key;
                const isPopular = plan.most_popular;
                return (
                  <div key={plan.plan_key} style={{ position: "relative", paddingTop: isPopular ? "20px" : "0" }}>
                    {isPopular && (
                      <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", background: "#4f46e5", color: "white", fontSize: "10px", fontWeight: "700", padding: "3px 12px", borderRadius: "999px", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                        Most Popular
                      </div>
                    )}
                    <div
                      onClick={() => setSelectedKey(plan.plan_key)}
                      style={{ background: "white", borderRadius: "18px", padding: "24px", cursor: "pointer", border: isPopular ? "2px solid #4f46e5" : isSelected ? "2px solid rgba(79,70,229,0.5)" : "1px solid #e5e7eb", boxShadow: isPopular ? "0 8px 24px rgba(79,70,229,0.12)" : "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "16px" }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#4f46e5", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px" }}>{plan.name}</div>
                        <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>{plan.description ?? ""}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                          <span style={{ fontSize: "36px", fontWeight: "800", color: "#111", letterSpacing: "-1px" }}>${Math.round(price)}</span>
                          <span style={{ fontSize: "13px", color: "#aaa" }}>/mo</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); handleSubscribe(plan); }}
                        disabled={submitting === plan.plan_key}
                        style={{ width: "100%", padding: "11px", borderRadius: "10px", border: isPopular ? "none" : "1px solid #e5e7eb", background: isPopular ? "#4f46e5" : "white", color: isPopular ? "white" : "#333", fontSize: "13px", fontWeight: "600", cursor: submitting === plan.plan_key ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                      >
                        {submitting === plan.plan_key ? "Loading…" : `Subscribe${isPopular ? " →" : ""}`}
                      </button>

                      {plan.features && plan.features.length > 0 && (
                        <ul style={{ display: "flex", flexDirection: "column", gap: "8px", margin: 0, padding: 0, listStyle: "none" }}>
                          {plan.features.map((f) => (
                            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#555" }}>
                              {CHECK_ICON}<span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {visiblePlans.length === 0 && (
              <div style={{ textAlign: "center", color: "#aaa", padding: "40px" }}>Loading plans…</div>
            )}
          </>
        ) : (
          checkoutPlan && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
              <PaymentForm
                plan={checkoutPlan}
                onSuccess={() => navigate({ to: "/dashboard", replace: true })}
                onBack={() => { setClientSecret(null); setCheckoutPlan(null); }}
              />
            </Elements>
          )
        )}
      </div>
    </div>
  );
}
