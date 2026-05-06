import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guard";
import { MainLayout } from "@/components/layout";
import { useState } from "react";
import "@/styles/calls.css";

export const Route = createFileRoute("/integrations")({
  beforeLoad: requireAuth,
  component: IntegrationsPage,
});

type IntegrationStatus = "connected" | "available" | "coming_soon";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: IntegrationStatus;
  icon: string; // emoji or initials fallback
  color: string;
}

const INTEGRATIONS: Integration[] = [
  // CRM
  { id: "salesforce", name: "Salesforce", description: "Sync contacts, leads, and call activity to your CRM automatically.", category: "CRM", status: "coming_soon", icon: "SF", color: "#00A1E0" },
  { id: "hubspot", name: "HubSpot", description: "Push call summaries and new contacts directly into HubSpot.", category: "CRM", status: "coming_soon", icon: "HS", color: "#FF7A59" },
  { id: "zoho", name: "Zoho CRM", description: "Log every Lyraa call as an activity in Zoho CRM.", category: "CRM", status: "coming_soon", icon: "ZO", color: "#E42527" },

  // Calendar
  { id: "google-calendar", name: "Google Calendar", description: "Let Lyraa book appointments directly into your Google Calendar.", category: "Calendar", status: "coming_soon", icon: "GC", color: "#4285F4" },
  { id: "calendly", name: "Calendly", description: "Integrate Lyraa with Calendly to schedule meetings on the fly.", category: "Calendar", status: "coming_soon", icon: "CL", color: "#006BFF" },

  // Communication
  { id: "twilio", name: "Twilio", description: "Power your phone numbers and call routing through Twilio.", category: "Communication", status: "connected", icon: "TW", color: "#F22F46" },
  { id: "slack", name: "Slack", description: "Get real-time call notifications and summaries in your Slack channels.", category: "Communication", status: "coming_soon", icon: "SL", color: "#4A154B" },

  // Payments
  { id: "stripe", name: "Stripe", description: "Manage your Lyraa subscription and billing through Stripe.", category: "Payments", status: "connected", icon: "ST", color: "#635BFF" },

  // Helpdesk
  { id: "zendesk", name: "Zendesk", description: "Automatically create support tickets from Lyraa call summaries.", category: "Helpdesk", status: "coming_soon", icon: "ZD", color: "#03363D" },
  { id: "intercom", name: "Intercom", description: "Sync customer conversations and call data with Intercom.", category: "Helpdesk", status: "coming_soon", icon: "IC", color: "#1F8DED" },

  // Automation
  { id: "zapier", name: "Zapier", description: "Connect Lyraa to 5,000+ apps with no-code Zapier workflows.", category: "Automation", status: "available", icon: "ZP", color: "#FF4A00" },
  { id: "make", name: "Make", description: "Build powerful automation scenarios with Make (formerly Integromat).", category: "Automation", status: "coming_soon", icon: "MK", color: "#6D00CC" },
];

const CATEGORIES = ["All", ...Array.from(new Set(INTEGRATIONS.map((i) => i.category)))];

const STATUS_LABEL: Record<IntegrationStatus, string> = {
  connected: "Connected",
  available: "Available",
  coming_soon: "Coming soon",
};

const STATUS_STYLE: Record<IntegrationStatus, { background: string; color: string }> = {
  connected: { background: "var(--lyraa-live-bg)", color: "var(--lyraa-live)" },
  available: { background: "var(--lyraa-whisper)", color: "var(--lyraa-signal)" },
  coming_soon: { background: "#F3F3F3", color: "var(--lyraa-fog)" },
};

function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = INTEGRATIONS.filter((i) => {
    const matchCat = activeCategory === "All" || i.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const connected = INTEGRATIONS.filter((i) => i.status === "connected").length;

  return (
    <MainLayout title="Integrations" subtitle="Connect your tools and services">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-block">
          <div className="page-eyebrow">Marketplace</div>
          <div className="page-title">Integrations</div>
          <div className="page-subtitle">Connect Lyraa to the tools your team already uses.</div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="summary-strip" style={{ marginBottom: 24 }}>
        <div className="summary-card">
          <div className="summary-label">Total integrations</div>
          <div className="summary-value">{INTEGRATIONS.length}</div>
          <div className="summary-trend neutral">In marketplace</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Connected</div>
          <div className="summary-value" style={{ color: "var(--lyraa-live)" }}>{connected}</div>
          <div className="summary-trend">Active now</div>
        </div>
        <div className="summary-card feature">
          <div className="summary-label">Coming soon</div>
          <div className="summary-value">{INTEGRATIONS.filter((i) => i.status === "coming_soon").length}</div>
          <div className="summary-trend">In development</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Categories</div>
          <div className="summary-value">{CATEGORIES.length - 1}</div>
          <div className="summary-trend neutral">Tool types</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar" style={{ marginBottom: 24 }}>
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search integrations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className={"filter-chip" + (activeCategory === cat ? " active" : "")}
              onClick={() => setActiveCategory(cat)}
              style={{ cursor: "pointer" }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>
          No integrations match your search.
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {filtered.map((integration) => (
            <div
              key={integration.id}
              style={{
                background: "white",
                border: "var(--border)",
                borderRadius: 14,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
            >
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Icon */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: integration.color + "18",
                    border: `1px solid ${integration.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: integration.color,
                    letterSpacing: 0.5,
                    flexShrink: 0,
                  }}>
                    {integration.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--lyraa-ink)" }}>{integration.name}</div>
                    <div style={{ fontSize: 11, color: "var(--lyraa-fog)", marginTop: 1 }}>{integration.category}</div>
                  </div>
                </div>
                {/* Status badge */}
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: 20,
                  whiteSpace: "nowrap",
                  ...STATUS_STYLE[integration.status],
                }}>
                  {integration.status === "connected" && (
                    <span style={{ marginRight: 4 }}>●</span>
                  )}
                  {STATUS_LABEL[integration.status]}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: 13, color: "var(--lyraa-slate)", lineHeight: 1.6, flex: 1 }}>
                {integration.description}
              </p>

              {/* Action */}
              <div>
                {integration.status === "connected" && (
                  <button
                    className="btn-secondary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Manage
                  </button>
                )}
                {integration.status === "available" && (
                  <button
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Connect
                  </button>
                )}
                {integration.status === "coming_soon" && (
                  <button
                    disabled
                    style={{
                      width: "100%",
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "var(--border)",
                      background: "#F7F7F7",
                      color: "var(--lyraa-fog)",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "not-allowed",
                    }}
                  >
                    Notify me
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
