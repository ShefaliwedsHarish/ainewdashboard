import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import "@/styles/train.css";

export const Route = createFileRoute("/train")({
  head: () => ({
    meta: [
      { title: 'Train Lyraa — Lyraa' },
      { name: "description", content: 'Teach Lyraa about your business, services, and how to handle calls.' },
      { property: "og:title", content: 'Train Lyraa — Lyraa' },
      { property: "og:description", content: 'Teach Lyraa about your business, services, and how to handle calls.' },
    ],
  }),
  component: TrainPage,
});

type StepStatus = "done" | "active" | "pending";

const STEPS: { title: string; desc: string; initial: StepStatus }[] = [
  { title: "Business profile", desc: "Name, address, contact", initial: "done" },
  { title: "Services & offers", desc: "What you sell", initial: "active" },
  { title: "Trading hours", desc: "When you're open", initial: "done" },
  { title: "Team & routing", desc: "Who handles what", initial: "done" },
  { title: "Voice & tone", desc: "How Lyraa sounds", initial: "done" },
  { title: "Greeting & disclosure", desc: "Opening script", initial: "done" },
  { title: "Knowledge documents", desc: "Upload PDFs, docs", initial: "pending" },
  { title: "Common questions", desc: "FAQs & answers", initial: "pending" },
  { title: "Escalation rules", desc: "When to hand off", initial: "done" },
];

function TrainPage() {
  const [activeStep, setActiveStep] = useState(1); // 0-based; default Step 2
  const [completed, setCompleted] = useState<Set<number>>(
    new Set(STEPS.map((s, i) => (s.initial === "done" ? i : -1)).filter((i) => i >= 0))
  );

  const total = STEPS.length;
  const completedCount = completed.size;
  const pct = Math.round((completedCount / total) * 100);

  const goTo = (i: number) => {
    if (i < 0 || i >= total) return;
    setActiveStep(i);
  };

  const saveAndContinue = () => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(activeStep);
      return next;
    });
    if (activeStep < total - 1) setActiveStep(activeStep + 1);
  };

  const statusFor = (i: number): StepStatus => {
    if (i === activeStep) return "active";
    if (completed.has(i)) return "done";
    return "pending";
  };

  return (
    <>
      <div className="app">

  {/* SIDEBAR */}
  <aside className="sidebar">
    <div className="brand">
      <svg viewBox="0 0 100 32">
        <g transform="translate(4, 16)">
          <rect x="0" y="-3" width="2.5" height="6" rx="1.25" fill="#534AB7"/>
          <rect x="5" y="-7" width="2.5" height="14" rx="1.25" fill="#6B5FCF"/>
          <rect x="10" y="-10" width="2.5" height="20" rx="1.25" fill="#7F77DD"/>
          <rect x="15" y="-5" width="2.5" height="10" rx="1.25" fill="#6B5FCF"/>
          <rect x="20" y="-8" width="2.5" height="16" rx="1.25" fill="#8B7FD9"/>
        </g>
        <text x="32" y="21" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="#2B2458" letterSpacing="-0.5">lyraa</text>
      </svg>
    </div>

    <div className="nav-group">
      <div className="nav-group-label">Operate</div>
      <Link to="/" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Dashboard</Link>
      <Link to="/calls" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Calls
        <span className="badge">1</span></Link>
      <Link to="/customers" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Customers</Link>
    </div>

    <div className="nav-group">
      <div className="nav-group-label">Configure</div>
      <Link to="/train" className="nav-item active" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
        Train Lyraa</Link>
      <Link to="/integrations" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        Integrations</Link>
    </div>

    <div className="nav-group">
      <div className="nav-group-label">Account</div>
      <Link to="/billing" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        Billing</Link>
      <Link to="/settings" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        Settings</Link>
    </div>

    <div className="sidebar-footer">
      <div className="agent-card">
        <div className="agent-card-header">
          <div className="agent-orb"></div>
          <div className="agent-meta">
            <div className="agent-name">Lyraa is live</div>
            <div className="agent-status">+61 1300 360 148</div>
          </div>
        </div>
        <button className="test-call-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Test Call Lyraa
        </button>
      </div>
      <div className="user-card">
        <div className="user-avatar">AR</div>
        <div className="user-info">
          <div className="user-name">Arthua Ramsy</div>
          <div className="user-plan">Pro Plan</div>
        </div>
        <div className="user-action">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </div>
      </div>
    </div>
  </aside>

  {/* MAIN */}
  <div className="main">

    {/* TOPBAR */}
    <div className="topbar">
      <div className="topbar-left">
        <div className="breadcrumb">Configure <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg> Train Lyraa</div>
        <h1>Train Lyraa</h1>
      </div>
      <div className="topbar-right">
        <button className="btn-secondary">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Tutorial
        </button>
        <button className="btn-primary">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Test Call
        </button>
      </div>
    </div>

    {/* CONTENT */}
    <div className="content">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="page-title-block">
          <div className="page-eyebrow">Configuration</div>
          <div className="page-title">Train Lyraa</div>
          <div className="page-subtitle">Tell Lyraa about your business so she can answer like a member of your team.</div>
        </div>
      </div>

      {/* PROGRESS BANNER */}
      <div className="progress-banner">
        <div className="pb-left">
          <div className="pb-eyebrow">Setup progress</div>
          <div className="pb-title">You're nearly there.</div>
          <div className="pb-subtitle">Complete the remaining sections to unlock Lyraa's full capability for your business.</div>
          <div className="pb-bar">
            <div className="pb-fill" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="pb-bar-meta">
            <span>{completedCount} of {total} sections complete</span>
            <span>Last saved 2 min ago</span>
          </div>
        </div>
        <div className="pb-right">
          <div className="pb-pct">{pct}%</div>
          <div className="pb-pct-label">complete</div>
        </div>
      </div>

      {/* WIZARD */}
      <div className="wizard-grid">

        {/* WIZARD NAV */}
        <aside className="wizard-nav">
          <div className="wizard-nav-section">
            {STEPS.map((s, i) => {
              const status = statusFor(i);
              const isActive = i === activeStep;
              return (
                <div
                  key={s.title}
                  className={"wizard-step" + (isActive ? " active" : "")}
                  onClick={() => goTo(i)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={"step-status " + status}>
                    {status === "done" && !isActive ? (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* WIZARD CONTENT */}
        <div className="wizard-content">

          <div className="wc-header">
            <div className="wc-title-block">
              <div className="wc-eyebrow">Step {activeStep + 1} of {total}</div>
              <div className="wc-title">
                {STEPS[activeStep].title}
                <span className="wc-title-pill">
                  {completed.has(activeStep) ? "Complete" : "In progress"}
                </span>
              </div>
              <div className="wc-subtitle">{STEPS[activeStep].desc}</div>
            </div>
            <div className="wc-actions">
              <button
                className="btn-secondary"
                onClick={() => goTo(activeStep - 1)}
                disabled={activeStep === 0}
                style={activeStep === 0 ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Previous
              </button>
              <button
                className="btn-primary"
                onClick={() => goTo(activeStep + 1)}
                disabled={activeStep === total - 1}
                style={activeStep === total - 1 ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
              >
                Next
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {activeStep === 1 ? (
            <ServicesAndOffersStep />
          ) : (
            <GenericStep title={STEPS[activeStep].title} desc={STEPS[activeStep].desc} />
          )}

          {/* SAVE BAR */}
          <div className="save-bar">
            <div className="save-status">
              <span className="dot"></span>
              All changes saved
            </div>
            <div className="save-actions">
              <button className="btn-secondary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Test what Lyraa knows
              </button>
              <button
                className="btn-secondary"
                onClick={() => goTo(activeStep - 1)}
                disabled={activeStep === 0}
                style={activeStep === 0 ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Previous
              </button>
              <button className="btn-primary" onClick={saveAndContinue}>
                {activeStep === total - 1 ? "Save & finish" : "Save & continue"}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</div>
    </>
  );
}

function GenericStep({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="form-body">
      <div className="form-section">
        <div className="form-section-header">
          <div className="form-section-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div className="form-section-title">{title}</div>
        </div>
        <p className="form-section-desc">{desc}</p>
        <div className="info-banner">
          <div className="icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <div className="info-banner-content">
            This section is part of Lyraa's training. Fill in the details and click <strong>Save &amp; continue</strong> to mark it complete.
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesAndOffersStep() {
  const [activeSubstep, setActiveSubstep] = useState(1);
  const substeps = ["Categories", "Service list", "Pricing rules", "Service area"];

  return (
    <>
      {/* SUBSTEPPER */}
      <div className="substepper">
        {substeps.map((label, i) => {
          const status = i < activeSubstep ? "done" : i === activeSubstep ? "active" : "";
          return (
            <div key={label} style={{ display: "contents" }}>
              <div
                className={"substep" + (status ? " " + status : "")}
                onClick={() => setActiveSubstep(i)}
                style={{ cursor: "pointer" }}
              >
                <div className="substep-dot">
                  {status === "done" && (
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </div>
                {label}
              </div>
              {i < substeps.length - 1 && <div className="substep-line"></div>}
            </div>
          );
        })}
      </div>

      {/* URL IMPORT BANNER */}
      <div className="url-banner">
        <div className="url-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <div className="url-info">
          <div className="url-title">Auto-imported from your website</div>
          <div className="url-meta">Source: <strong>hyperiontech.com.au</strong> · Last synced 14 hours ago · 7 services found</div>
        </div>
        <div className="url-actions">
          <button className="btn-secondary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            Refresh
          </button>
          <button className="btn-secondary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Upload doc
          </button>
        </div>
      </div>

      <div className="form-body">

        {/* SERVICE CATEGORIES */}
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </div>
            <div className="form-section-title">Service categories</div>
          </div>
          <p className="form-section-desc">Select the categories that match your business. Lyraa uses these to qualify callers and route enquiries.</p>

          <div className="chip-group">
            <button className="chip selected">Web development</button>
            <button className="chip selected">Mobile app development</button>
            <button className="chip selected">SEO</button>
            <button className="chip selected">Digital marketing</button>
            <button className="chip">Branding & design</button>
            <button className="chip">Maintenance & hosting</button>
            <button className="chip">Ecommerce</button>
            <button className="chip">+ Add custom</button>
          </div>
        </div>

        {/* SERVICE DETAILS */}
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div className="form-section-title">Service details</div>
          </div>
          <p className="form-section-desc">Tell Lyraa about each service — what it includes, typical timelines, and who it's for.</p>

          <div className="info-banner">
            <div className="icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <div className="info-banner-content">
              <strong>Why this matters:</strong> Specific service descriptions let Lyraa answer scope and timeline questions confidently. Vague entries lead to vague answers.
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">
                Service name
                <span className="req">*</span>
              </label>
              <input type="text" className="form-input" defaultValue="Custom website development"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">
                Description
                <span className="req">*</span>
                <svg className="form-help" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </label>
              <textarea className="form-input form-textarea" defaultValue="Custom-built websites for small to mid-size businesses. Includes discovery, design, build on WordPress or custom stack, mobile-responsive, SEO setup, and content load. Standard build is 4–6 weeks." />
              <div className="form-hint">Lyraa uses this verbatim when callers ask "what do you do?" Keep it specific and scannable.</div>
            </div>
          </div>

          <div className="form-row three">
            <div className="form-field">
              <label className="form-label">Starting price</label>
              <div className="field-with-prefix">
                <div className="field-prefix">AUD</div>
                <input type="text" defaultValue="2,500"/>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Typical timeline</label>
              <select className="form-select">
                <option>4–6 weeks</option>
                <option>1–2 weeks</option>
                <option>2–4 weeks</option>
                <option>6–8 weeks</option>
                <option>2–3 months</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Quote required</label>
              <select className="form-select">
                <option>Always — never quote on call</option>
                <option>Indicative range okay</option>
                <option>Fixed price published</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">
                What's included
                <svg className="form-help" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </label>
              <textarea className="form-input form-textarea" placeholder="Discovery, wireframes, design, build, content, SEO setup, training..." defaultValue="Discovery session, wireframes, mobile-responsive design, build, basic SEO setup, content upload, 1 round of revisions, training session, 30 days post-launch support." />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">
                What's not included
                <span style={{marginLeft: 'auto', fontSize: '11px', color: 'var(--lyraa-fog)', fontWeight: '500'}}>Optional</span>
              </label>
              <textarea className="form-input form-textarea" placeholder="Hosting fees, domain registration, ongoing maintenance..." defaultValue="Domain registration, hosting fees, paid plugins, custom illustrations, ongoing content updates, monthly maintenance." />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <button className="btn-secondary" style={{alignSelf: 'flex-start'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add another service
              </button>
            </div>
          </div>
        </div>

        {/* SERVICE FLAGS */}
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="form-section-title">Compliance & boundaries</div>
          </div>
          <p className="form-section-desc">Tell Lyraa when she should always defer to a human rather than answer directly.</p>

          <ToggleRow
            title="Never quote firm prices on call"
            desc="Lyraa will collect details and route to estimator."
            initial
          />
          <ToggleRow
            title="Always disclose AI receptionist"
            desc="Required for EU/UK callers. Recommended everywhere."
            initial
          />
          <ToggleRow
            title="Escalate complaints immediately"
            desc="Any complaint triggers same-day callback flag."
            initial
          />
          <ToggleRow
            title="Allow technical scope discussion"
            desc="Lyraa can discuss tech stack at high level if asked."
            initial={false}
            last
          />
        </div>

        {/* VOICE PREVIEW SHORTCUT */}
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-7h3zM3 19a2 2 0 0 0 2 2h1v-7H3z"/></svg>
            </div>
            <div className="form-section-title">Lyraa's voice on this section</div>
          </div>
          <p className="form-section-desc">Quick preview of what Lyraa will say when callers ask about your services.</p>

          <div className="voice-grid">
            <VoiceCard name="Olivia" tag="AU · Warm & professional" orb="amber" defaultSelected />
            <VoiceCard name="James" tag="AU · Confident & clear" orb="purple" />
            <VoiceCard name="Mia" tag="AU · Friendly & casual" orb="teal" />
          </div>
        </div>

      </div>
    </>
  );
}

function ToggleRow({ title, desc, initial, last }: { title: string; desc: string; initial: boolean; last?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div
      className="hours-row"
      style={{
        gridTemplateColumns: '1fr auto',
        padding: '10px 0',
        borderBottom: last ? undefined : '0.5px solid rgba(83, 74, 183, 0.08)',
      }}
    >
      <div>
        <div style={{fontSize: '13px', color: 'var(--lyraa-deep)', fontWeight: '600'}}>{title}</div>
        <div style={{fontSize: '11.5px', color: 'var(--lyraa-fog)', marginTop: '2px'}}>{desc}</div>
      </div>
      <div
        className={"toggle" + (on ? " on" : "")}
        onClick={() => setOn(!on)}
        style={{ cursor: "pointer" }}
      ></div>
    </div>
  );
}

function VoiceCard({ name, tag, orb, defaultSelected }: { name: string; tag: string; orb: string; defaultSelected?: boolean }) {
  const heights = ['30%','60%','80%','50%','70%','90%','55%','40%','65%','75%','45%','60%'];
  return (
    <div className={"voice-card" + (defaultSelected ? " selected" : "")}>
      <div className="voice-card-header">
        <div className={"voice-orb " + orb}></div>
        <div className="voice-info">
          <div className="voice-name">{name}</div>
          <div className="voice-tag">{tag}</div>
        </div>
        <div className="voice-play">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
      <div className="voice-bars">
        {heights.map((h, i) => <div key={i} style={{height: h}}></div>)}
      </div>
    </div>
  );
}
