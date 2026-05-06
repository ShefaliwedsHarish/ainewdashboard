import { createFileRoute } from "@tanstack/react-router";
import { billingService, type MyPlan } from "@/services/billingService";
import { requireAuth } from "@/lib/auth-guard";
import "@/styles/dashboard.css";
import { MainLayout } from "@/components/layout";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { API_ROUTES } from "@/config/api-routes";

interface DashboardStats {
  total_calls: number;
  missed_calls: number;
  total_leads: number;
  avg_duration: string;
}

interface RecentCall {
  id: number;
  uuid?: string | null;
  customer_name?: string | null;
  phone?: string;
  caller_name?: string;
  caller_number?: string;
  from?: string;
  status?: string;
  duration?: string;
  created_at?: string;
  intent?: string;
}

interface HeatmapData {
  period: number;
  total_calls: number;
  after_hours_bias: number;
  hour_labels: string[];
  heatmap: { day: string; slots: { hour: string; count: number }[] }[];
}

interface CallTypesData {
  total: number;
  by_status: { type: string; count: number }[];
  by_intent: { type: string; count: number }[];
}

interface DashboardData {
  stats: DashboardStats;
  recent_calls: RecentCall[];
  phone_numbers: string[];
}

interface ChartPoint {  date: string;
  label: string;
  working_hours: number;
  after_hours: number;
  total: number;
}

interface ChartData {
  period: number;
  start_date: string;
  end_date: string;
  data: ChartPoint[];
}


  
export const Route = createFileRoute("/dashboard")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [
      { title: 'Dashboard — Lyraa' },
      { name: "description", content: 'Overview of your AI receptionist activity, calls, and revenue.' },
      { property: "og:title", content: 'Dashboard — Lyraa' },
      { property: "og:description", content: 'Overview of your AI receptionist activity, calls, and revenue.' },
    ],
  }),
  component: DashboardPage,
});

function CallsChart({ data, period, loading }: { data: ChartPoint[]; period: 7 | 30 | 90; loading: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || loading) {
    return (
      <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lyraa-fog)", fontSize: "13px" }}>
        Loading…
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lyraa-fog)", fontSize: "13px" }}>
        No calls recorded for this period.
      </div>
    );
  }

  const W = 560, H = 240, PAD_L = 40, PAD_B = 40, PAD_T = 20, PAD_R = 20;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const n = data.length;
  const maxVal = Math.max(...data.map((d) => Math.max(d.working_hours, d.after_hours, d.total)), 1);
  const yMax = Math.ceil(maxVal / 5) * 5 || 5;
  const xOf = (i: number) => PAD_L + (i / Math.max(n - 1, 1)) * plotW;
  const yOf = (v: number) => PAD_T + plotH - (v / yMax) * plotH;
  const wPts = data.map((d, i) => `${xOf(i)} ${yOf(d.working_hours)}`).join(" L ");
  const aPts = data.map((d, i) => `${xOf(i)} ${yOf(d.after_hours)}`).join(" L ");
  const wArea = `M ${wPts} L ${xOf(n - 1)} ${PAD_T + plotH} L ${xOf(0)} ${PAD_T + plotH} Z`;
  const aArea = `M ${aPts} L ${xOf(n - 1)} ${PAD_T + plotH} L ${xOf(0)} ${PAD_T + plotH} Z`;
  const yTicks = [0, Math.round(yMax * 0.33), Math.round(yMax * 0.66), yMax];

  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#534AB7" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#534AB7" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#AFA9EC" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#AFA9EC" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {yTicks.map((v) => (
        <g key={v}>
          <line x1={PAD_L} y1={yOf(v)} x2={W - PAD_R} y2={yOf(v)} stroke="#EEEDFE" strokeWidth="0.5"/>
          <text x={PAD_L - 6} y={yOf(v) + 3} fontSize="9" fill="#888780" textAnchor="end" fontFamily="JetBrains Mono">{v}</text>
        </g>
      ))}

      <path d={aArea} fill="url(#g2)"/>
      <path d={`M ${aPts}`} stroke="#AFA9EC" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={wArea} fill="url(#g1)"/>
      <path d={`M ${wPts}`} stroke="#534AB7" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {data.map((d, i) => {
        const showLabel = period === 7 || (period === 30 && i % 3 === 0) || (period === 90 && i % 7 === 0);
        return (
          <g key={d.date}>
            <circle cx={xOf(i)} cy={yOf(d.working_hours)} r={i === n - 1 ? 5 : 4} fill={i === n - 1 ? "white" : "#534AB7"} stroke="#534AB7" strokeWidth={i === n - 1 ? 2.5 : 0}/>
            <circle cx={xOf(i)} cy={yOf(d.after_hours)} r="3" fill="#AFA9EC"/>
            {showLabel && (
              <text x={xOf(i)} y={H - 8} fontSize="9" fill="#888780" textAnchor="middle" fontFamily="JetBrains Mono">{d.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [myPlan, setMyPlan] = useState<MyPlan | null>(null);
  const [callTypes, setCallTypes] = useState<CallTypesData | null>(null);
  const [heatmap, setHeatmap] = useState<HeatmapData | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [chartPeriod, setChartPeriod] = useState<7 | 30 | 90>(7);
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    apiService.get<DashboardData>(API_ROUTES.dashboard.base).then(setData).catch(console.error);
    billingService.getMyPlan().then(setMyPlan).catch(console.error);
    apiService.get<CallTypesData>(`${API_ROUTES.dashboard.base}/call-types`).then(setCallTypes).catch(console.error);
    apiService.get<HeatmapData>(`${API_ROUTES.dashboard.base}/calls-heatmap`, { period: 30 }).then(setHeatmap).catch(console.error);
  }, []);

  useEffect(() => {
    setChartLoading(true);
    apiService
      .get<ChartPoint[]>(`${API_ROUTES.dashboard.base}/calls-over-time`, { period: chartPeriod })
      .then((res) => setChartData(Array.isArray(res) ? res : []))
      .catch(console.error)
      .finally(() => setChartLoading(false));
  }, [chartPeriod]);

  const stats = data?.stats;
  const recentCalls = (data?.recent_calls ?? []).slice(0, 5);
  const phoneNumbers = data?.phone_numbers ?? [];
  const primaryNumber = phoneNumbers[0] ?? null;

  return (
    <MainLayout title="Dashboard" subtitle="Good afternoon 👋">

      {/* AGENT BANNER */}
      <div className="agent-banner">
        <div className="banner-left">
          <div className="banner-orb"></div>
          <div className="banner-info">
            <div className="banner-eyebrow">Your AI Receptionist</div>
            <div className="banner-title">Lyraa for Hyperion Tech</div>
            <div className="banner-meta">{primaryNumber ? `${primaryNumber} · ` : ""}Australian voice · Active</div>
          </div>
        </div>
        <div className="banner-right">
          <button className="banner-btn primary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Test Call
          </button>
          <button className="banner-btn ghost">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
            Train Lyraa
          </button>
        </div>
      </div>

      {/* ONBOARDING */}
      <div className="onboarding-card">
        <div className="onboarding-header">
          <div>
            <div className="onboarding-eyebrow">Setup progress</div>
            <div className="onboarding-title">You're 75% set up. Let's finish.</div>
            <div className="onboarding-subtitle">Complete your setup to unlock Lyraa's full potential.</div>
          </div>
          <div className="onboarding-progress">
            <div className="progress-percent">75%</div>
            <div className="progress-label">3 of 4 done</div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <div className="onboarding-steps">
          <div className="onboarding-step done">
            <div className="step-status done">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="step-title">Configure agent</div>
            <div className="step-desc">Voice, tone, and intro set</div>
          </div>
          <div className="onboarding-step done">
            <div className="step-status done">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="step-title">Phone number</div>
            <div className="step-desc">+61 1300 360 148 assigned</div>
          </div>
          <div className="onboarding-step done">
            <div className="step-status done">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="step-title">First test call</div>
            <div className="step-desc">Tested 22 April 2026</div>
          </div>
          <div className="onboarding-step active">
            <div className="step-status active">4</div>
            <div className="step-title">Forward your line</div>
            <div className="step-desc">Route your business number to Lyraa</div>
          </div>
        </div>
      </div>

      {/* METRICS */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-label">Calls handled</div>
            <div className="metric-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
          </div>
          <div className="metric-value">{stats?.total_calls ?? 0}</div>
          <div className="metric-trend">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            Total calls
          </div>
          <div className="metric-split">
            <div className="split-item">
              <div className="split-label">Missed</div>
              <div className="split-value">{stats?.missed_calls ?? 0}</div>
            </div>
            <div className="split-item">
              <div className="split-label">Avg duration</div>
              <div className="split-value">{stats?.avg_duration ?? "—"}</div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-label">Leads captured</div>
            <div className="metric-icon green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
          </div>
          <div className="metric-value">{stats?.total_leads ?? 0}</div>
          <div className="metric-trend">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            Total leads
          </div>
          <div className="metric-split">
            <div className="split-item">
              <div className="split-label">Missed calls</div>
              <div className="split-value">{stats?.missed_calls ?? 0}</div>
            </div>
            <div className="split-item">
              <div className="split-label">Avg duration</div>
              <div className="split-value">{stats?.avg_duration ?? "—"}</div>
            </div>
          </div>
        </div>

        <div className="metric-card feature">
          <div className="metric-header">
            <div className="metric-label">Revenue secured</div>
            <div className="metric-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
          </div>
          <div className="metric-value large">$12,840</div>
          <div className="metric-trend">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            +$3,210 vs last week
          </div>
          <div className="metric-split">
            <div className="split-item">
              <div className="split-label">Hours</div>
              <div className="split-value">$7,420</div>
            </div>
            <div className="split-item">
              <div className="split-label">After hours</div>
              <div className="split-value">$5,420</div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-label">Time saved</div>
            <div className="metric-icon amber"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          </div>
          <div className="metric-value">9.2h</div>
          <div className="metric-trend">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            +1.8h this week
          </div>
          <div className="metric-split">
            <div className="split-item">
              <div className="split-label">Avg duration</div>
              <div className="split-value">2:14</div>
            </div>
            <div className="split-item">
              <div className="split-label">Missed</div>
              <div className="split-value">0</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="dash-grid">

        {/* CHART */}
        <div className="panel chart-panel">
          <div className="panel-header">
            <div className="panel-title">Calls over time</div>
            <div className="chart-controls">
              {([7, 30, 90] as const).map((p) => (
                <div
                  key={p}
                  className={`chart-tab${chartPeriod === p ? " active" : ""}`}
                  onClick={() => setChartPeriod(p)}
                  style={{ cursor: "pointer" }}
                >
                  {p} days
                </div>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ background: "#534AB7" }}></div>
              Working hours
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: "#AFA9EC" }}></div>
              After hours
            </div>
          </div>
          <div className="chart-body">
            <CallsChart data={chartData} period={chartPeriod} loading={chartLoading} />
          </div>
        </div>

        {/* RECENT CALLS */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Recent calls</div>
          </div>
          <div className="calls-list">
            {recentCalls.length === 0 ? (
              <div style={{ padding: "24px 22px", color: "var(--lyraa-fog)", fontSize: "13px" }}>No recent calls yet.</div>
            ) : (
              recentCalls.map((call: RecentCall) => (
                <div className="call-row" key={call.id}>
                  <div className="call-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div className="call-info">
                    <div className="call-name">
                      {call.customer_name ?? call.caller_name ?? call.phone ?? "Unknown"}
                      {call.intent && <span className={`call-tag tag-${call.intent.toLowerCase()}`}>{call.intent.toUpperCase()}</span>}
                    </div>
                    <div className="call-meta">
                      {[call.phone ?? call.caller_number ?? call.from, call.duration].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="call-duration">
                    {call.created_at ? new Date(call.created_at).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }) : ""}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* SECONDARY GRID */}
      <div className="secondary-grid">

        {/* USAGE */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">This month's plan</div>
          </div>
          <div className="usage-body">
            {myPlan ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--lyraa-deep)", letterSpacing: "-0.4px" }}>{myPlan.plan_name}</div>
                  <span style={{ background: myPlan.access_type === "trial" ? "var(--lyraa-alert-bg)" : "var(--lyraa-live-bg)", color: myPlan.access_type === "trial" ? "#854F0B" : "var(--lyraa-live)", fontSize: "10px", fontWeight: "700", padding: "3px 10px", borderRadius: "10px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                    {myPlan.access_type === "trial" ? "Trial" : myPlan.status}
                  </span>
                </div>

                {myPlan.access_type === "trial" ? (
                  <>
                    <div className="usage-bar" style={{ marginBottom: "8px" }}>
                      <div className="usage-fill" style={{ width: `${Math.max(0, 100 - ((myPlan.trial_days_left ?? 0) / 14) * 100)}%` }}></div>
                    </div>
                    <div className="usage-stats" style={{ marginBottom: "14px" }}>
                      <div><strong>{myPlan.trial_days_left}</strong> days remaining</div>
                    </div>
                    <div className="usage-meta">
                      <div>Started</div>
                      <div className="usage-meta-value">{myPlan.trial_started_at ? new Date(myPlan.trial_started_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "—"}</div>
                    </div>
                    <div className="usage-meta">
                      <div>Expires</div>
                      <div className="usage-meta-value">{myPlan.trial_ends_at ? new Date(myPlan.trial_ends_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "—"}</div>
                    </div>
                    <div className="usage-meta">
                      <div>Days left</div>
                      <div className="usage-meta-value">{myPlan.trial_days_left ?? "—"}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="usage-meta">
                      <div>Plan</div>
                      <div className="usage-meta-value">{myPlan.plan_name}</div>
                    </div>
                    <div className="usage-meta">
                      <div>Status</div>
                      <div className="usage-meta-value">{myPlan.status}</div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div style={{ fontSize: "13px", color: "var(--lyraa-fog)" }}>Loading plan…</div>
            )}
          </div>
        </div>

        {/* TIME OF DAY */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">When calls come in</div>
            <a className="panel-action">Last 30 days</a>
          </div>
          <div className="heatmap-body">
            {heatmap ? (() => {
              const colours = ['#F7F6FD','#EEEDFE','#CECBF6','#AFA9EC','#7F77DD','#534AB7'];
              const allCounts = heatmap.heatmap.flatMap(r => r.slots.map(s => s.count));
              const maxCount = Math.max(...allCounts, 1);
              const intensity = (count: number) => Math.min(5, Math.round((count / maxCount) * 5));
              return (
                <>
                  <div className="heatmap-grid">
                    <div />
                    {heatmap.hour_labels.map(h => (
                      <div key={h} className="heatmap-label" style={{ fontSize: '8px', textAlign: 'center' }}>{h}</div>
                    ))}
                    {heatmap.heatmap.flatMap(row => [
                      <div key={`l-${row.day}`} className="heatmap-label">{row.day}</div>,
                      ...heatmap.hour_labels.map((h, hi) => {
                        const slot = row.slots.find(s => s.hour === h);
                        const v = intensity(slot?.count ?? 0);
                        return <div key={`c-${row.day}-${hi}`} className="heatmap-cell" style={{ background: colours[v] }} title={`${row.day} ${h}: ${slot?.count ?? 0}`} />;
                      }),
                    ])}
                  </div>
                  <div className="heatmap-legend">
                    <div>After hours bias: <strong style={{ color: 'var(--lyraa-deep)' }}>{heatmap.after_hours_bias}%</strong></div>
                    <div className="heatmap-scale">
                      <span>Less</span>
                      {colours.map(c => <div key={c} className="heatmap-scale-cell" style={{ background: c }} />)}
                      <span>More</span>
                    </div>
                  </div>
                </>
              );
            })() : (
              <div style={{ padding: "24px", color: "var(--lyraa-fog)", fontSize: "13px" }}>Loading…</div>
            )}
          </div>
        </div>

        {/* INTENTS */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Call types</div>
            {callTypes && <a className="panel-action">Total: {callTypes.total}</a>}
          </div>
          <div className="intents-body">
            {callTypes ? (
              <>
                {callTypes.by_status.map((item) => {
                  const pct = callTypes.total > 0 ? Math.round((item.count / callTypes.total) * 100) : 0;
                  const fillClass = item.type === "answered" ? "lead" : item.type === "missed" ? "complaint" : "other";
                  return (
                    <div className="intent-row" key={item.type}>
                      <div className="intent-label" style={{ textTransform: "capitalize" }}>{item.type}</div>
                      <div className="intent-bar"><div className={`intent-fill ${fillClass}`} style={{ width: `${pct}%` }}></div></div>
                      <div className="intent-value">{item.count}</div>
                    </div>
                  );
                })}
                {callTypes.by_intent.length > 0 && (
                  <div style={{ height: "1px", background: "var(--lyraa-whisper)", margin: "10px 0" }} />
                )}
                {callTypes.by_intent.map((item) => {
                  const pct = callTypes.total > 0 ? Math.round((item.count / callTypes.total) * 100) : 0;
                  const fillClass = item.type === "lead" ? "lead" : item.type === "spam" ? "complaint" : "service";
                  return (
                    <div className="intent-row" key={item.type}>
                      <div className="intent-label" style={{ textTransform: "capitalize" }}>{item.type}</div>
                      <div className="intent-bar"><div className={`intent-fill ${fillClass}`} style={{ width: `${pct}%` }}></div></div>
                      <div className="intent-value">{item.count}</div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div style={{ padding: "16px 0", color: "var(--lyraa-fog)", fontSize: "13px" }}>Loading…</div>
            )}
          </div>
        </div>

      </div>

    </MainLayout>
  );
}
