import { createFileRoute, Link } from "@tanstack/react-router";
import "@/styles/dashboard.css";

export const Route = createFileRoute("/")({
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

function DashboardPage() {
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
      <Link to="/" className="nav-item active" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Dashboard</Link>
      <Link to="/calls" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Calls
        <span className="badge">3</span></Link>
      <Link to="/customers" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Customers</Link>
    </div>

    <div className="nav-group">
      <div className="nav-group-label">Configure</div>
      <Link to="/train" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
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
        <h1>Dashboard</h1>
        <div className="greeting">Good afternoon, Ramsy 👋</div>
      </div>
      <div className="topbar-right">
        <div className="date-picker">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Last 7 days
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div className="topbar-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          <span className="dot"></span>
        </div>
        <div className="topbar-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
      </div>
    </div>

    {/* CONTENT */}
    <div className="content">

      {/* AGENT BANNER */}
      <div className="agent-banner">
        <div className="banner-left">
          <div className="banner-orb"></div>
          <div className="banner-info">
            <div className="banner-eyebrow">Your AI Receptionist</div>
            <div className="banner-title">Lyraa for Hyperion Tech</div>
            <div className="banner-meta">+61 1300 360 148 · Australian voice · Active</div>
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
          <div className="metric-value">147</div>
          <div className="metric-trend">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            +23% vs last week
          </div>
          <div className="metric-split">
            <div className="split-item">
              <div className="split-label">Hours</div>
              <div className="split-value">82</div>
            </div>
            <div className="split-item">
              <div className="split-label">After hours</div>
              <div className="split-value">65</div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-label">Leads captured</div>
            <div className="metric-icon green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
          </div>
          <div className="metric-value">38</div>
          <div className="metric-trend">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            +12 this week
          </div>
          <div className="metric-split">
            <div className="split-item">
              <div className="split-label">Conv. rate</div>
              <div className="split-value">26%</div>
            </div>
            <div className="split-item">
              <div className="split-label">Booked</div>
              <div className="split-value">22</div>
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
              <div className="chart-tab active">7 days</div>
              <div className="chart-tab">30 days</div>
              <div className="chart-tab">90 days</div>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{background: '#534AB7'}}></div>
              Working hours
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{background: '#AFA9EC'}}></div>
              After hours
            </div>
          </div>
          <div className="chart-body">
            <svg className="chart-svg" viewBox="0 0 560 240" preserveAspectRatio="none">
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

              {/* grid lines */}
              <line x1="40" y1="40" x2="540" y2="40" stroke="#EEEDFE" strokeWidth="0.5"/>
              <line x1="40" y1="100" x2="540" y2="100" stroke="#EEEDFE" strokeWidth="0.5"/>
              <line x1="40" y1="160" x2="540" y2="160" stroke="#EEEDFE" strokeWidth="0.5"/>
              <line x1="40" y1="200" x2="540" y2="200" stroke="#CECBF6" strokeWidth="0.5"/>

              <text x="32" y="44" fontSize="9" fill="#888780" textAnchor="end" fontFamily="JetBrains Mono">30</text>
              <text x="32" y="104" fontSize="9" fill="#888780" textAnchor="end" fontFamily="JetBrains Mono">20</text>
              <text x="32" y="164" fontSize="9" fill="#888780" textAnchor="end" fontFamily="JetBrains Mono">10</text>
              <text x="32" y="204" fontSize="9" fill="#888780" textAnchor="end" fontFamily="JetBrains Mono">0</text>

              {/* After hours area */}
              <path d="M 70 180 L 140 170 L 210 155 L 280 165 L 350 145 L 420 130 L 490 110 L 490 200 L 70 200 Z" fill="url(#g2)"/>
              <path d="M 70 180 L 140 170 L 210 155 L 280 165 L 350 145 L 420 130 L 490 110" stroke="#AFA9EC" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

              {/* Working hours area */}
              <path d="M 70 150 L 140 130 L 210 110 L 280 125 L 350 95 L 420 75 L 490 60 L 490 200 L 70 200 Z" fill="url(#g1)"/>
              <path d="M 70 150 L 140 130 L 210 110 L 280 125 L 350 95 L 420 75 L 490 60" stroke="#534AB7" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

              {/* Working hours dots */}
              <circle cx="70" cy="150" r="4" fill="#534AB7"/>
              <circle cx="140" cy="130" r="4" fill="#534AB7"/>
              <circle cx="210" cy="110" r="4" fill="#534AB7"/>
              <circle cx="280" cy="125" r="4" fill="#534AB7"/>
              <circle cx="350" cy="95" r="4" fill="#534AB7"/>
              <circle cx="420" cy="75" r="4" fill="#534AB7"/>
              <circle cx="490" cy="60" r="5" fill="white" stroke="#534AB7" strokeWidth="2.5"/>

              {/* After hours dots */}
              <circle cx="70" cy="180" r="3" fill="#AFA9EC"/>
              <circle cx="140" cy="170" r="3" fill="#AFA9EC"/>
              <circle cx="210" cy="155" r="3" fill="#AFA9EC"/>
              <circle cx="280" cy="165" r="3" fill="#AFA9EC"/>
              <circle cx="350" cy="145" r="3" fill="#AFA9EC"/>
              <circle cx="420" cy="130" r="3" fill="#AFA9EC"/>
              <circle cx="490" cy="110" r="3" fill="#AFA9EC"/>

              {/* X axis labels */}
              <text x="70" y="220" fontSize="9" fill="#888780" textAnchor="middle" fontFamily="JetBrains Mono">Sat</text>
              <text x="140" y="220" fontSize="9" fill="#888780" textAnchor="middle" fontFamily="JetBrains Mono">Sun</text>
              <text x="210" y="220" fontSize="9" fill="#888780" textAnchor="middle" fontFamily="JetBrains Mono">Mon</text>
              <text x="280" y="220" fontSize="9" fill="#888780" textAnchor="middle" fontFamily="JetBrains Mono">Tue</text>
              <text x="350" y="220" fontSize="9" fill="#888780" textAnchor="middle" fontFamily="JetBrains Mono">Wed</text>
              <text x="420" y="220" fontSize="9" fill="#888780" textAnchor="middle" fontFamily="JetBrains Mono">Thu</text>
              <text x="490" y="220" fontSize="9" fill="#888780" textAnchor="middle" fontFamily="JetBrains Mono">Fri</text>
            </svg>
          </div>
        </div>

        {/* RECENT CALLS */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Recent calls</div>
            <a className="panel-action">View all
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
          <div className="calls-list">
            <div className="call-row">
              <div className="call-icon live">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="call-info">
                <div className="call-name">
                  Tom Bradley
                  <span className="call-tag tag-live">LIVE</span>
                </div>
                <div className="call-meta">+61 422 891 220 · 0:34 elapsed</div>
              </div>
              <div className="call-duration">now</div>
            </div>
            <div className="call-row">
              <div className="call-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="call-info">
                <div className="call-name">
                  Sarah Mitchell
                  <span className="call-tag tag-lead">LEAD</span>
                </div>
                <div className="call-meta">+61 401 442 819 · Booked Friday 2pm</div>
              </div>
              <div className="call-duration">12m ago</div>
            </div>
            <div className="call-row">
              <div className="call-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="call-info">
                <div className="call-name">
                  Parash Sharma
                  <span className="call-tag tag-service">SERVICE</span>
                </div>
                <div className="call-meta">+61 8950 990 009 · Reschedule confirmed</div>
              </div>
              <div className="call-duration">1h ago</div>
            </div>
            <div className="call-row">
              <div className="call-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="call-info">
                <div className="call-name">
                  Mark Davies
                  <span className="call-tag tag-lead">LEAD</span>
                </div>
                <div className="call-meta">+61 419 304 556 · Quote requested</div>
              </div>
              <div className="call-duration">2h ago</div>
            </div>
            <div className="call-row">
              <div className="call-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="call-info">
                <div className="call-name">
                  Jenny Watkins
                  <span className="call-tag tag-complaint">COMPLAINT</span>
                </div>
                <div className="call-meta">+61 488 102 442 · Escalated to manager</div>
              </div>
              <div className="call-duration">3h ago</div>
            </div>
          </div>
        </div>

      </div>

      {/* SECONDARY GRID */}
      <div className="secondary-grid">

        {/* USAGE */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">This month's usage</div>
            <a className="panel-action">Manage plan
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
          <div className="usage-body">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
              <div style={{fontSize: '13px', color: 'var(--lyraa-slate)'}}>Minutes used</div>
              <div style={{fontSize: '13px', color: 'var(--lyraa-deep)', fontWeight: '700', fontFamily: '\'JetBrains Mono\', monospace'}}>127 / 600</div>
            </div>
            <div className="usage-bar">
              <div className="usage-fill"></div>
            </div>
            <div className="usage-stats">
              <div>21% used · <strong>473 min remaining</strong></div>
              <div>Resets in 12 days</div>
            </div>
            <div className="usage-meta">
              <div>Plan</div>
              <div className="usage-meta-value">Growth · $279/mo</div>
            </div>
            <div className="usage-meta">
              <div>Overage rate</div>
              <div className="usage-meta-value">Auto-upgrade at 110%</div>
            </div>
          </div>
        </div>

        {/* TIME OF DAY */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">When calls come in</div>
            <a className="panel-action">Last 30 days</a>
          </div>
          <div className="heatmap-body">
            <div className="heatmap-grid" id="heatmap"></div>
            <div className="heatmap-legend">
              <div>After hours bias: <strong style={{color: 'var(--lyraa-deep)'}}>44%</strong></div>
              <div className="heatmap-scale">
                <span>Less</span>
                <div className="heatmap-scale-cell" style={{background: '#F7F6FD'}}></div>
                <div className="heatmap-scale-cell" style={{background: '#CECBF6'}}></div>
                <div className="heatmap-scale-cell" style={{background: '#7F77DD'}}></div>
                <div className="heatmap-scale-cell" style={{background: '#534AB7'}}></div>
                <div className="heatmap-scale-cell" style={{background: '#2B2458'}}></div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTENTS */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Call types</div>
            <a className="panel-action">Last 7 days</a>
          </div>
          <div className="intents-body">
            <div className="intent-row">
              <div className="intent-label">Lead</div>
              <div className="intent-bar"><div className="intent-fill lead" style={{width: '68%'}}></div></div>
              <div className="intent-value">38</div>
            </div>
            <div className="intent-row">
              <div className="intent-label">Service</div>
              <div className="intent-bar"><div className="intent-fill service" style={{width: '54%'}}></div></div>
              <div className="intent-value">31</div>
            </div>
            <div className="intent-row">
              <div className="intent-label">Quote</div>
              <div className="intent-bar"><div className="intent-fill service" style={{width: '42%'}}></div></div>
              <div className="intent-value">24</div>
            </div>
            <div className="intent-row">
              <div className="intent-label">Reschedule</div>
              <div className="intent-bar"><div className="intent-fill service" style={{width: '32%'}}></div></div>
              <div className="intent-value">18</div>
            </div>
            <div className="intent-row">
              <div className="intent-label">Complaint</div>
              <div className="intent-bar"><div className="intent-fill complaint" style={{width: '18%'}}></div></div>
              <div className="intent-value">10</div>
            </div>
            <div className="intent-row">
              <div className="intent-label">Other</div>
              <div className="intent-bar"><div className="intent-fill other" style={{width: '14%'}}></div></div>
              <div className="intent-value">8</div>
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
