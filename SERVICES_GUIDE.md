import { createFileRoute, Link } from "@tanstack/react-router";
import "@/styles/billing.css";

export const Route = createFileRoute("/billing")({
  head: () => ({
    meta: [
      { title: 'Billing — Lyraa' },
      { name: "description", content: 'Manage your plan, usage, and invoices.' },
      { property: "og:title", content: 'Billing — Lyraa' },
      { property: "og:description", content: 'Manage your plan, usage, and invoices.' },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  return (
    <>
      <div className="app">


  {/* MAIN */}
  <div className="main">


    {/* CONTENT */}
    <div className="content">

      <div className="page-header">
        <div>
          <div className="page-eyebrow">Subscription</div>
          <div className="page-title">Billing</div>
          <div className="page-subtitle">Manage your plan, payment method, and tax invoices.</div>
        </div>
      </div>

      {/* CURRENT PLAN BANNER */}
      <div className="plan-banner">
        <div className="pb-content">
          <div className="pb-left">
            <div className="pb-eyebrow">Current Plan</div>
            <div className="pb-name">
              Growth Plan
              <span className="pb-status">Active</span>
            </div>
            <div className="pb-detail"><strong>$279</strong> + GST per month · Next charge <strong>30 May 2026</strong> ($306.90 incl. GST)</div>
            <div className="pb-meta-grid">
              <div>
                <div className="pb-meta-label">Plan minutes</div>
                <div className="pb-meta-value">600 / mo</div>
              </div>
              <div>
                <div className="pb-meta-label">Phone numbers</div>
                <div className="pb-meta-value">5 included</div>
              </div>
              <div>
                <div className="pb-meta-label">Team seats</div>
                <div className="pb-meta-value">3 of 5 used</div>
              </div>
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

      {/* USAGE + PAYMENT METHOD */}
      <div className="usage-row">

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">This month's usage</div>
            <a className="panel-action">May 2026</a>
          </div>
          <div className="panel-body">
            <div className="usage-stat">
              <span className="usage-stat-label">Minutes used</span>
              <span className="usage-stat-value">127 / 600</span>
            </div>
            <div className="usage-bar">
              <div className="usage-fill" style={{width: '21%'}}></div>
            </div>
            <div className="usage-meta">
              <span><strong>21%</strong> used · 473 min remaining</span>
              <span>Resets in 12 days</span>
            </div>

            <hr className="usage-divider"/>

            <div className="usage-line">
              <span className="usage-line-label">Plan price (Growth)</span>
              <span className="usage-line-value">$279.00</span>
            </div>
            <div className="usage-line">
              <span className="usage-line-label">Overage minutes (0)</span>
              <span className="usage-line-value">$0.00</span>
            </div>
            <div className="usage-line">
              <span className="usage-line-label">GST (10%)</span>
              <span className="usage-line-value">$27.90</span>
            </div>
            <div className="usage-line" style={{borderTop: 'var(--border)', marginTop: '8px', paddingTop: '14px'}}>
              <span className="usage-line-label" style={{fontWeight: '600', color: 'var(--lyraa-deep)'}}>Estimated total (incl. GST)</span>
              <span className="usage-line-value" style={{fontSize: '15px', color: 'var(--lyraa-deep)'}}>$306.90</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Payment method</div>
            <a className="panel-action">+ Add new</a>
          </div>
          <div className="panel-body">

            <div className="payment-card">
              <div className="payment-card-row">
                <span className="card-brand">Visa</span>
                <span className="card-default">Default</span>
              </div>
              <div className="card-number">•••• •••• •••• 4218</div>
              <div className="card-meta">
                <div>
                  <div className="card-meta-label">Cardholder</div>
                  <div className="card-meta-value">A. Ramsy</div>
                </div>
                <div>
                  <div className="card-meta-label">Expires</div>
                  <div className="card-meta-value">04/28</div>
                </div>
              </div>
            </div>

            <div className="payment-actions">
              <button className="btn-secondary" style={{flex: '1'}}>Update card</button>
              <button className="btn-secondary" style={{flex: '1'}}>Remove</button>
            </div>

            <div style={{marginTop: '18px', padding: '12px 14px', background: 'var(--lyraa-canvas)', borderRadius: '10px', fontSize: '11.5px', color: 'var(--lyraa-slate)', display: 'flex', alignItems: 'center', gap: '10px'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: '0'}}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Payments processed securely by <strong style={{color: 'var(--lyraa-deep)', fontWeight: '600'}}>Stripe</strong> · PCI DSS compliant
            </div>
          </div>
        </div>

      </div>

      {/* PLAN COMPARISON */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
        <div>
          <h2 style={{fontSize: '18px', fontWeight: '700', color: 'var(--lyraa-deep)', letterSpacing: '-0.4px', marginBottom: '4px'}}>Change plan</h2>
          <div style={{fontSize: '12.5px', color: 'var(--lyraa-fog)'}}>All prices in AUD, exclusive of GST. Auto-upgrade kicks in at 110% of plan minutes.</div>
        </div>
        <div className="billing-toggle">
          <button className="billing-toggle-btn active">Monthly</button>
          <button className="billing-toggle-btn">
            Annual
            <span className="save-pill">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="plans-grid">

        {/* STARTER */}
        <div className="plan-card">
          <div className="plan-name">Starter</div>
          <div className="plan-tagline">For small businesses just getting started.</div>
          <div className="plan-price-row">
            <div className="plan-price">$129</div>
            <div className="plan-period">/mo</div>
          </div>
          <div className="plan-gst">+ GST · $0 setup</div>
          <div className="plan-cta">
            <button className="plan-btn outline">Downgrade</button>
          </div>
          <div className="plan-features">
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>150 minutes</strong> per month</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>1 phone number</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>1 team seat</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Email support</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Standard analytics</span>
            </div>
          </div>
        </div>

        {/* GROWTH (CURRENT) */}
        <div className="plan-card current">
          <div className="plan-name">
            Growth
            <span className="current-pill">Current</span>
          </div>
          <div className="plan-tagline">For growing businesses with regular call volume.</div>
          <div className="plan-price-row">
            <div className="plan-price">$279</div>
            <div className="plan-period">/mo</div>
          </div>
          <div className="plan-gst">+ GST · $0 setup</div>
          <div className="plan-cta">
            <button className="plan-btn ghost">Current plan</button>
          </div>
          <div className="plan-features">
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>600 minutes</strong> per month</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>5 phone numbers</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Up to 5 team seats</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Priority email support</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Advanced analytics</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Calendar & CRM integrations</span>
            </div>
          </div>
        </div>

        {/* SCALE */}
        <div className="plan-card recommended">
          <div className="plan-name">Scale</div>
          <div className="plan-tagline">For high-volume businesses needing unlimited capacity.</div>
          <div className="plan-price-row">
            <div className="plan-price">$599</div>
            <div className="plan-period">/mo</div>
          </div>
          <div className="plan-gst">+ GST · $0 setup</div>
          <div className="plan-cta">
            <button className="plan-btn primary">Upgrade to Scale</button>
          </div>
          <div className="plan-features">
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Unlimited minutes</strong></span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Unlimited phone numbers</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Unlimited team seats</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Phone + email support</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>API & webhooks access</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Custom training data</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Dedicated success manager</span>
            </div>
          </div>
        </div>

        {/* ENTERPRISE */}
        <div className="plan-card">
          <div className="plan-name">Enterprise</div>
          <div className="plan-tagline">For multi-location and regulated industries.</div>
          <div className="plan-price-row">
            <div className="plan-price">Custom</div>
          </div>
          <div className="plan-gst">Tailored to your scale</div>
          <div className="plan-cta">
            <button className="plan-btn outline">Contact sales</button>
          </div>
          <div className="plan-features">
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Everything in Scale</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Custom SLA & uptime</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Custom DPA & data residency</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>White-label options</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Multi-location support</span>
            </div>
            <div className="plan-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>NDIS / aged care compliance pack</span>
            </div>
          </div>
        </div>

      </div>

      {/* INVOICES */}
      <div className="panel" style={{marginBottom: '22px'}}>
        <div className="panel-header">
          <div className="panel-title">Invoices & receipts</div>
          <button className="btn-secondary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download all (CSV)
          </button>
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

          <div className="invoice-row">
            <div className="invoice-id">INV-LYR-0142</div>
            <div>
              <div className="invoice-desc">Growth Plan · April 2026</div>
              <div className="invoice-desc-meta">600 min plan · 0 overage · GST included</div>
            </div>
            <div className="invoice-amount">$306.90</div>
            <div className="invoice-status status-paid">Paid</div>
            <div className="invoice-date">30 Apr 2026</div>
            <div>
              <button className="invoice-action-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </div>

          <div className="invoice-row">
            <div className="invoice-id">INV-LYR-0128</div>
            <div>
              <div className="invoice-desc">Growth Plan · March 2026</div>
              <div className="invoice-desc-meta">600 min plan · 24 overage · GST included</div>
            </div>
            <div className="invoice-amount">$359.04</div>
            <div className="invoice-status status-paid">Paid</div>
            <div className="invoice-date">31 Mar 2026</div>
            <div>
              <button className="invoice-action-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </div>

          <div className="invoice-row">
            <div className="invoice-id">INV-LYR-0114</div>
            <div>
              <div className="invoice-desc">Growth Plan · February 2026</div>
              <div className="invoice-desc-meta">600 min plan · 0 overage · GST included</div>
            </div>
            <div className="invoice-amount">$306.90</div>
            <div className="invoice-status status-paid">Paid</div>
            <div className="invoice-date">28 Feb 2026</div>
            <div>
              <button className="invoice-action-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </div>

          <div className="invoice-row">
            <div className="invoice-id">INV-LYR-0098</div>
            <div>
              <div className="invoice-desc">Starter Plan · January 2026</div>
              <div className="invoice-desc-meta">150 min plan · 0 overage · GST included</div>
            </div>
            <div className="invoice-amount">$141.90</div>
            <div className="invoice-status status-paid">Paid</div>
            <div className="invoice-date">31 Jan 2026</div>
            <div>
              <button className="invoice-action-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </div>

          <div className="invoice-row">
            <div className="invoice-id">INV-LYR-0084</div>
            <div>
              <div className="invoice-desc">Starter Plan · December 2025</div>
              <div className="invoice-desc-meta">First billed period · setup waived · GST included</div>
            </div>
            <div className="invoice-amount">$141.90</div>
            <div className="invoice-status status-paid">Paid</div>
            <div className="invoice-date">31 Dec 2025</div>
            <div>
              <button className="invoice-action-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* BILLING DETAILS */}
      <div className="panel" style={{marginBottom: '22px'}}>
        <div className="panel-header">
          <div className="panel-title">Billing details</div>
          <button className="btn-secondary">Edit</button>
        </div>
        <div className="panel-body">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--lyraa-fog)', marginBottom: '4px'}}>Billed to</div>
              <div style={{fontSize: '13px', color: 'var(--lyraa-deep)', fontWeight: '600', marginBottom: '2px'}}>Hyperion Tech Pty Ltd</div>
              <div style={{fontSize: '12px', color: 'var(--lyraa-slate)', lineHeight: '1.6'}}>Ground Floor, 470 St Kilda Road<br/>Melbourne VIC 3004<br/>Australia</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--lyraa-fog)', marginBottom: '4px'}}>ABN</div>
              <div style={{fontSize: '13px', color: 'var(--lyraa-deep)', fontWeight: '600', fontFamily: '\'JetBrains Mono\', monospace', marginBottom: '14px'}}>20 646 814 048</div>
              <div style={{fontSize: '11px', color: 'var(--lyraa-fog)', marginBottom: '4px'}}>Billing email</div>
              <div style={{fontSize: '13px', color: 'var(--lyraa-deep)', fontWeight: '600', fontFamily: '\'JetBrains Mono\', monospace'}}>info@hyperiontech.com.au</div>
            </div>
          </div>
        </div>
      </div>

      {/* CANCEL */}
      <div className="danger-row">
        <div>
          <div className="danger-title">Cancel subscription</div>
          <div className="danger-desc">Cancel your Lyraa subscription effective the end of the current billing period (30 May 2026). Lyraa will stop answering calls after that date. Your data will be retained per our DPA. <a href="#" style={{color: 'var(--lyraa-signal)', fontWeight: '600'}}>Read cancellation policy</a>.</div>
        </div>
        <button className="btn-danger">Cancel subscription</button>
      </div>

    </div>
  </div>
</div>
    </>
  );
}
