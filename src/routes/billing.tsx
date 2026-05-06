import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guard";
import { MainLayout } from "@/components/layout";
import "@/styles/billing.css";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { billingService, type BillingPlan, type MyPlan, type Invoice } from "@/services/billingService";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "");

export const Route = createFileRoute("/billing")({
  beforeLoad: requireAuth,
  component: BillingPage,
});

const DOWNLOAD_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function formatDate(dateStr?: string | number) {
  if (!dateStr) return "-";
  const d = typeof dateStr === "number" ? new Date(dateStr * 1000) : new Date(dateStr);
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

function formatAmount(amount?: number | string) {
  if (amount === undefined || amount === null) return "-";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  const dollars = num > 1000 ? num / 100 : num;
  return `${dollars.toFixed(2)}`;
}

const VIEW_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

function printInvoice(invoice: Invoice) {
  const win = window.open("", "_blank");
  if (!win) return;
  const num = invoice.invoice_number ?? invoice.number ?? String(invoice.id);
  const date = formatDate(invoice.created_at ?? invoice.date ?? invoice.created);
  const plan = invoice.plan_name ?? invoice.description ?? "Subscription";
  const amount = formatAmount(invoice.amount_due ?? invoice.amount);
  const status = invoice.status ?? "paid";

  win.document.write(`<!DOCTYPE html><html><head><title>${num}</title>
  <style>
    body{font-family:Inter,-apple-system,sans-serif;color:#2B2458;padding:48px;max-width:640px;margin:0 auto}
    .logo{font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#534AB7;margin-bottom:40px}
    h1{font-size:28px;font-weight:700;letter-spacing:-0.75px;margin:0 0 4px}
    .meta{font-size:13px;color:#888780;margin-bottom:32px}
    table{width:100%;border-collapse:collapse;margin-bottom:24px}
    th{text-align:left;font-size:10px;font-weight:700;color:#888780;letter-spacing:1.2px;text-transform:uppercase;padding:10px 0;border-bottom:1px solid #EEEDFE}
    td{padding:14px 0;font-size:13px;border-bottom:1px solid #F7F6FD}
    .total td{font-weight:700;font-size:15px;border-bottom:none;padding-top:20px}
    .badge{display:inline-block;padding:3px 10px;border-radius:10px;font-size:10px;font-weight:700;text-transform:uppercase;background:#E1F5EE;color:#1D9E75}
    @media print{body{padding:24px}}
  </style></head><body>
  <div class="logo">Lyraa</div>
  <h1>Invoice</h1>
  <div class="meta">${num} &nbsp;·&nbsp; ${date} &nbsp;·&nbsp; <span class="badge">${status}</span></div>
  <table>
    <tr><th>Description</th><th>Amount</th></tr>
    <tr><td>${plan}</td><td>$${amount}</td></tr>
    <tr class="total"><td>Total</td><td>$${amount}</td></tr>
  </table>
  <script>window.onload=()=>{window.print()}<\/script>
  </body></html>`);
  win.document.close();
}

function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const statusVal = invoice.status ?? "paid";
  const statusClass =
    statusVal === "paid" ? "status-paid" :
    statusVal === "open" ? "status-pending" : "status-failed";

  const viewUrl = invoice.hosted_invoice_url ?? invoice.invoice_pdf ?? null;

  return (
    <div className="invoice-row">
      <div className="invoice-id">{invoice.invoice_number ?? invoice.number ?? String(invoice.id)}</div>
      <div>
        <div className="invoice-desc">{invoice.plan_name ?? invoice.description ?? "Subscription"}</div>
      </div>
      <div className="invoice-amount">{formatAmount(invoice.amount_due ?? invoice.amount)}</div>
      <div className={`invoice-status ${statusClass}`}>{statusVal}</div>
      <div className="invoice-date">{formatDate(invoice.created_at ?? invoice.date ?? invoice.created)}</div>
      <div style={{ display: "flex", gap: "6px" }}>
        {viewUrl ? (
          <a href={viewUrl} target="_blank" rel="noreferrer" title="View invoice">
            <button className="invoice-action-btn">{VIEW_ICON}</button>
          </a>
        ) : (
          <button className="invoice-action-btn" title="View invoice" onClick={() => printInvoice(invoice)}>
            {VIEW_ICON}
          </button>
        )}
        <button className="invoice-action-btn" title="Download / Print invoice" onClick={() => printInvoice(invoice)}>
          {DOWNLOAD_ICON}
        </button>
      </div>
    </div>
  );
}

function CheckoutForm({ plan, onSuccess, onClose }: { plan: BillingPlan; onSuccess: () => void; onClose: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPaying(true);
    setError(null);
    const { error: submitErr } = await elements.submit();
    if (submitErr) { setError(submitErr.message ?? "Validation failed"); setPaying(false); return; }
    const { error: confirmErr } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/billing` },
      redirect: "if_required",
    });
    if (confirmErr) {
      setError(confirmErr.message ?? "Payment failed");
      setPaying(false);
    } else {
      setSucceeded(true);
      setTimeout(() => onSuccess(), 1800);
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(43,36,88,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "white", borderRadius: "18px", padding: "32px", width: "100%", maxWidth: "460px", boxShadow: "0 20px 60px rgba(43,36,88,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "var(--lyraa-signal)", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>Upgrade plan</div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--lyraa-deep)", letterSpacing: "-0.5px" }}>
              {plan.name} - ${parseFloat(plan.price).toFixed(2)}
              <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--lyraa-fog)" }}>/mo</span>
            </div>
          </div>
          <button onClick={onClose} disabled={paying} style={{ background: "var(--lyraa-canvas)", border: "var(--border)", borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lyraa-slate)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {succeeded ? (
          <div style={{ padding: "32px 0", textAlign: "center" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "var(--lyraa-live-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lyraa-live)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--lyraa-deep)", marginBottom: "6px" }}>Payment successful!</div>
            <div style={{ fontSize: "13px", color: "var(--lyraa-fog)" }}>Your plan has been upgraded to <strong>{plan.name}</strong>. Refreshing...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <PaymentElement onReady={() => setReady(true)} />
            {error && (
              <div style={{ marginTop: "14px", padding: "10px 14px", background: "var(--lyraa-danger-bg)", borderRadius: "8px", fontSize: "12.5px", color: "var(--lyraa-danger)" }}>{error}</div>
            )}
            <button
              type="submit"
              disabled={!stripe || !ready || paying}
              style={{ marginTop: "20px", width: "100%", padding: "13px", background: ready ? "var(--lyraa-signal)" : "var(--lyraa-chalk)", color: "white", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: (!ready || paying) ? "not-allowed" : "pointer", opacity: paying ? 0.7 : 1, fontFamily: "inherit", transition: "background 0.2s" }}
            >
              {paying ? "Processing..." : ready ? `Pay $${parseFloat(plan.price).toFixed(2)}` : "Loading..."}
            </button>
          </form>
        )}

        <div style={{ marginTop: "16px", textAlign: "center", fontSize: "11.5px", color: "var(--lyraa-fog)" }}>
          Secured by <strong style={{ color: "var(--lyraa-deep)" }}>Stripe</strong> - PCI DSS compliant
        </div>
      </div>
    </div>
  );
}

function refreshAll(
  setMyPlan: (v: MyPlan) => void,
  setPlans: (v: BillingPlan[]) => void,
  setInvoices: (v: Invoice[]) => void,
) {
  Promise.allSettled([
    billingService.getMyPlan(),
    billingService.getBillingPlans(),
    billingService.getInvoices(),
  ]).then(([planResult, plansResult, invoicesResult]) => {
    if (planResult.status === "fulfilled") setMyPlan(planResult.value);
    if (plansResult.status === "fulfilled") setPlans(Array.isArray(plansResult.value) ? plansResult.value : []);
    if (invoicesResult.status === "fulfilled") setInvoices(Array.isArray(invoicesResult.value) ? invoicesResult.value : []);
  });
}

function BillingPage() {
  const [myPlan, setMyPlan] = useState<MyPlan | null>(null);
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<BillingPlan | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  async function handleUpgrade(plan: BillingPlan) {
    setUpgrading(plan.plan_key);
    setUpgradeError(null);
    try {
      const { client_secret } = await billingService.createPaymentIntent({
        plan: plan.plan_key,
        billing_cycle: plan.billing,
      });
      setClientSecret(client_secret);
      setCheckoutPlan(plan);
    } catch (err: unknown) {
      setUpgradeError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setUpgrading(null);
    }
  }

  function handlePaymentSuccess() {
    setCheckoutPlan(null);
    setClientSecret(null);
    refreshAll(
      (v) => setMyPlan(v),
      (v) => setPlans(v),
      (v) => setInvoices(v),
    );
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.allSettled([
      billingService.getMyPlan(),
      billingService.getBillingPlans(),
      billingService.getInvoices(),
    ]).then(([planResult, plansResult, invoicesResult]) => {
      const errors: string[] = [];
      if (planResult.status === "fulfilled") {
        setMyPlan(planResult.value);
      } else {
        const msg = (planResult.reason as any)?.response?.data?.message ?? planResult.reason?.message ?? String(planResult.reason);
        errors.push(`my-plan: ${msg}`);
      }
      if (plansResult.status === "fulfilled") {
        setPlans(Array.isArray(plansResult.value) ? plansResult.value : []);
      } else {
        const msg = (plansResult.reason as any)?.response?.data?.message ?? plansResult.reason?.message ?? String(plansResult.reason);
        errors.push(`plans: ${msg}`);
      }
      if (invoicesResult.status === "fulfilled") {
        setInvoices(Array.isArray(invoicesResult.value) ? invoicesResult.value : []);
      } else {
        const msg = (invoicesResult.reason as any)?.response?.data?.message ?? invoicesResult.reason?.message ?? String(invoicesResult.reason);
        errors.push(`invoices: ${msg}`);
      }
      if (errors.length > 0) setError(errors.join(" | "));
    }).finally(() => setLoading(false));
  }, []);

  const isTrial = myPlan?.access_type === "trial";
  const statusLabel = isTrial ? "Free Trial" : myPlan?.status === "active" ? "Active" : (myPlan?.status ?? "");
  const filteredPlans = plans.filter((p) => p.billing === billingCycle);

  return (
    <MainLayout title="Billing" subtitle="Manage your plan, payment method, and tax invoices.">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Subscription</div>
          <div className="page-title">Billing</div>
          <div className="page-subtitle">Manage your plan, payment method, and tax invoices.</div>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "var(--lyraa-danger-bg)", border: "0.5px solid rgba(226,75,74,0.3)", borderRadius: "10px", fontSize: "12px", color: "var(--lyraa-danger)", fontFamily: "monospace" }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--lyraa-fog)" }}>Loading billing info...</div>
      ) : (
        <>
          <div className="plan-banner">
            <div className="pb-content">
              <div className="pb-left">
                <div className="pb-eyebrow">Current Plan</div>
                <div className="pb-name">
                  {myPlan?.plan_name ?? "-"}
                  <span className="pb-status">{statusLabel}</span>
                </div>
                {isTrial ? (
                  <div className="pb-detail">
                    Free trial - <strong>{myPlan?.trial_days_left} days left</strong> - Ends <strong>{formatDate(myPlan?.trial_ends_at)}</strong>
                  </div>
                ) : (
                  <div className="pb-detail">Subscription active - <strong>${myPlan?.amount}</strong>/mo - Ends <strong>{formatDate(myPlan?.ends_at)}</strong></div>
                )}
                <div className="pb-meta-grid">
                  {isTrial ? (
                    <>
                      <div>
                        <div className="pb-meta-label">Trial started</div>
                        <div className="pb-meta-value">{formatDate(myPlan?.trial_started_at)}</div>
                      </div>
                      <div>
                        <div className="pb-meta-label">Trial ends</div>
                        <div className="pb-meta-value">{formatDate(myPlan?.trial_ends_at)}</div>
                      </div>
                      <div>
                        <div className="pb-meta-label">Days remaining</div>
                        <div className="pb-meta-value">{myPlan?.trial_days_left ?? "-"}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="pb-meta-label">Started</div>
                        <div className="pb-meta-value">{formatDate(myPlan?.starts_at)}</div>
                      </div>
                      <div>
                        <div className="pb-meta-label">Renews</div>
                        <div className="pb-meta-value">{formatDate(myPlan?.ends_at)}</div>
                      </div>
                      <div>
                        <div className="pb-meta-label">Days remaining</div>
                        <div className="pb-meta-value">{myPlan?.days_remaining ?? "-"}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="pb-right">
                <button className="pb-btn-primary">
                  Upgrade plan
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <button className="pb-btn-ghost">View tax invoice</button>
              </div>
            </div>
          </div>

          {upgradeError && (
            <div style={{ marginBottom: "16px", padding: "12px 16px", background: "var(--lyraa-danger-bg)", border: "0.5px solid rgba(226,75,74,0.3)", borderRadius: "10px", fontSize: "13px", color: "var(--lyraa-danger)" }}>
              {upgradeError}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--lyraa-deep)", letterSpacing: "-0.4px", marginBottom: "4px" }}>Change plan</h2>
              <div style={{ fontSize: "12.5px", color: "var(--lyraa-fog)" }}>All prices in AUD, exclusive of GST.</div>
            </div>
            <div className="billing-toggle">
              <button className={`billing-toggle-btn${billingCycle === "monthly" ? " active" : ""}`} onClick={() => setBillingCycle("monthly")}>Monthly</button>
              <button className={`billing-toggle-btn${billingCycle === "annual" ? " active" : ""}`} onClick={() => setBillingCycle("annual")}>
                Annual<span className="save-pill">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="plans-grid">
            {filteredPlans.map((plan) => {
              const price = parseFloat(plan.price);
              const isCurrent = plan.plan_key === myPlan?.plan;
              const isPopular = plan.most_popular;
              return (
                <div key={plan.id} className={`plan-card${isCurrent ? " current" : ""}${isPopular ? " recommended" : ""}`}>
                  <div className="plan-name">
                    {plan.name}
                    {isCurrent && <span className="current-pill">Current</span>}
                  </div>
                  <div className="plan-tagline">{plan.description ?? ""}</div>
                  <div className="plan-price-row">
                    <div className="plan-price">${Math.round(price)}</div>
                    <div className="plan-period">/mo</div>
                  </div>
                  <div className="plan-gst">+ GST - $0 setup</div>
                  <div className="plan-cta">
                    {isCurrent ? (
                      <button className="plan-btn ghost">Current plan</button>
                    ) : (
                      <button
                        className="plan-btn primary"
                        onClick={() => handleUpgrade(plan)}
                        disabled={upgrading === plan.plan_key}
                      >
                        {upgrading === plan.plan_key ? "Processing..." : `Upgrade to ${plan.name}`}
                      </button>
                    )}
                  </div>
                  {plan.features && plan.features.length > 0 && (
                    <div className="plan-features">
                      {plan.features.map((f) => (
                        <div className="plan-feature" key={f}>{CHECK_ICON}<span>{f}</span></div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="panel" style={{ marginBottom: "22px" }}>
            <div className="panel-header">
              <div className="panel-title">Invoices &amp; receipts</div>
              <button className="btn-secondary">{DOWNLOAD_ICON}Download all (CSV)</button>
            </div>
            <div className="invoices-table">
              <div className="invoices-head">
                <div className="invoices-th">Invoice</div>
                <div className="invoices-th">Description</div>
                <div className="invoices-th right">Amount</div>
                <div className="invoices-th">Status</div>
                <div className="invoices-th">Date</div>
                <div className="invoices-th"></div>
              </div>
              {invoices.length > 0 ? (
                invoices.map((inv) => <InvoiceRow key={inv.id} invoice={inv} />)
              ) : (
                <div style={{ padding: "24px 22px", color: "var(--lyraa-fog)", fontSize: "13px" }}>No invoices yet.</div>
              )}
            </div>
          </div>
{/* 
          <div className="panel" style={{ marginBottom: "22px" }}>
            <div className="panel-header">
              <div className="panel-title">Billing details</div>
              <button className="btn-secondary">Edit</button>
            </div>
            <div className="panel-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--lyraa-fog)", marginBottom: "4px" }}>Billed to</div>
                  <div style={{ fontSize: "13px", color: "var(--lyraa-deep)", fontWeight: "600", marginBottom: "2px" }}>-</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--lyraa-fog)", marginBottom: "4px" }}>Billing email</div>
                  <div style={{ fontSize: "13px", color: "var(--lyraa-deep)", fontWeight: "600" }}>-</div>
                </div>
              </div>
            </div>
          </div>

          <div className="danger-row">
            <div>
              <div className="danger-title">Cancel subscription</div>
              <div className="danger-desc">
                Cancel your Lyraa subscription at the end of the current billing period. Lyraa will stop answering calls after that date.{" "}
                <a href="#" style={{ color: "var(--lyraa-signal)", fontWeight: "600" }}>Read cancellation policy</a>.
              </div>
            </div>
            <button className="btn-danger">Cancel subscription</button>
          </div> */}
        </>
      )}

      {checkoutPlan && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
          <CheckoutForm
            plan={checkoutPlan}
            onSuccess={handlePaymentSuccess}
            onClose={() => { setCheckoutPlan(null); setClientSecret(null); }}
          />
        </Elements>
      )}
    </MainLayout>
  );
}