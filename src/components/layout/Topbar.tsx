import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/config/api-routes";

interface SubscriptionData {
  valid: boolean;
  access_type: string;
  data: {
    status: string;
    plan?: string;
    plan_name?: string;
    amount?: string;
    currency?: string;
    starts_at?: string;
    ends_at?: string;
    days_remaining?: number;
    trial_ends_at?: string;
    trial_days_left?: number;
  } | null;
}

function useStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw) as { name?: string; email?: string };
  } catch {
    return null;
  }
}

function getInitials(name?: string) {
  if (!name) return "?";
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const user = useStoredUser();
  const navigate = useNavigate();
  const [sub, setSub] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    apiClient
      .get(API_ROUTES.subscription.validate)
      .then((res) => {
        // Handle: { success, data: { valid, access_type, data } } OR direct { valid, access_type, data }
        const raw = res.data;
        const payload: SubscriptionData =
          raw?.valid !== undefined ? raw :        // direct shape
          raw?.data?.valid !== undefined ? raw.data : // wrapped shape
          raw?.data ?? raw;
        setSub(payload);
        if (payload?.valid === false && payload?.data === null) {
          navigate({ to: "/subscribe-plan", replace: true });
        }
      })
      .catch(() => {});
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const today = mounted ? (() => {
    const d = new Date();
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  })() : "";
  const isTrial = sub?.access_type === "trial";
  const planName = sub?.data?.plan_name ?? (isTrial ? "Free Trial" : null);
  const expiryDate = formatDate(sub?.data?.ends_at ?? sub?.data?.trial_ends_at);
  const daysLeft = sub?.data?.days_remaining ?? sub?.data?.trial_days_left ?? null;

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1>{title}</h1>
        {subtitle && <div className="greeting">{subtitle}</div>}
      </div>
      <div className="topbar-right">

        {/* Plan pill */}
        {sub && planName && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: isTrial ? "var(--lyraa-alert-bg)" : "var(--lyraa-whisper)", border: `1px solid ${isTrial ? "rgba(239,159,39,0.4)" : "rgba(83,74,183,0.25)"}`, borderRadius: "10px", fontSize: "12.5px" }}>
            <span style={{ fontWeight: "700", color: isTrial ? "#854F0B" : "var(--lyraa-signal)" }}>
              {planName}
            </span>
            {daysLeft !== null && (
              <span style={{ color: isTrial ? "#854F0B" : "var(--lyraa-slate)", fontWeight: "600" }}>
                · {daysLeft}d left
              </span>
            )}
            {expiryDate && (
              <span style={{ color: "var(--lyraa-fog)" }}>
                · Expires {expiryDate}
              </span>
            )}
          </div>
        )}

        {/* Today's date */}
        {/* <div style={{ fontSize: "13px", fontWeight: "500", color: "var(--lyraa-slate)", padding: "5px 12px", background: "var(--lyraa-canvas)", border: "var(--border)", borderRadius: "10px" }}>
          {today}
        </div> */}

        <div className="topbar-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="dot"></span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 10px", background: "var(--lyraa-canvas)", border: "var(--border)", borderRadius: "10px" }}>
          <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg, var(--lyraa-warm), var(--lyraa-alert))", color: "white", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {getInitials(user?.name)}
          </div>
          <span style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--lyraa-deep)" }}>
            {user?.name ?? "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
