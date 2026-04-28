import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import "@/styles/calls.css";

export const Route = createFileRoute("/calls")({
  head: () => ({
    meta: [
      { title: 'Calls — Lyraa' },
      { name: "description", content: 'Browse, search, and review every call your AI receptionist has handled.' },
      { property: "og:title", content: 'Calls — Lyraa' },
      { property: "og:description", content: 'Browse, search, and review every call your AI receptionist has handled.' },
    ],
  }),
  component: CallsPage,
});

function CallsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  return (
    <>
      <div className="app">

  {/* SIDEBAR (same as dashboard) */}
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
      <Link to="/calls" className="nav-item active" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Calls
        <span className="badge">1</span></Link>
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
        <div className="breadcrumb">Operate <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg> Calls</div>
        <h1>All calls</h1>
      </div>
      <div className="topbar-right">
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

      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="page-title-block">
          <div className="page-eyebrow">Last 7 days</div>
          <div className="page-title">Calls</div>
          <div className="page-subtitle">Every conversation Lyraa handled, with full transcripts and recordings.</div>
        </div>
        <div className="page-actions">
          <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Last 7 days
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export CSV
          </button>
          <button className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Test Call
          </button>
        </div>
      </div>

      {/* SUMMARY STRIP */}
      <div className="summary-strip">
        <div className="summary-card">
          <div className="summary-label">Total calls</div>
          <div className="summary-value">147</div>
          <div className="summary-trend">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            +23% vs last week
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Booked</div>
          <div className="summary-value">38</div>
          <div className="summary-trend">26% conversion rate</div>
        </div>
        <div className="summary-card feature">
          <div className="summary-label">Revenue secured</div>
          <div className="summary-value">$12,840</div>
          <div className="summary-trend">+$3,210 this week</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Avg duration</div>
          <div className="summary-value">2:14</div>
          <div className="summary-trend neutral">0 missed · 0 abandoned</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search by caller, number, or summary..."/>
        </div>
        <div className="filter-tabs">
          <div className="filter-chip active">All <span className="count">147</span></div>
          <div className="filter-chip">Lead <span className="count">38</span></div>
          <div className="filter-chip">Service <span className="count">52</span></div>
          <div className="filter-chip">Quote <span className="count">24</span></div>
          <div className="filter-chip">Reschedule <span className="count">18</span></div>
          <div className="filter-chip">Complaint <span className="count">10</span></div>
          <div className="filter-chip">Other <span className="count">5</span></div>
        </div>
        <button className="btn-secondary" style={{marginLeft: 'auto'}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Filters
        </button>
      </div>

      {/* TABLE */}
      <div className="table-panel">
        <div className="table-head">
          <div className="th">Caller</div>
          <div className="th">Topic & summary</div>
          <div className="th">Recording</div>
          <div className="th">Tags</div>
          <div className="th right">Value</div>
          <div className="th">Date</div>
          <div className="th"></div>
        </div>

        {/* LIVE row */}
        <div className="table-row live" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar live">TB</div>
            <div className="caller-info">
              <div className="caller-name">Tom Bradley <span className="call-tag tag-live">LIVE</span></div>
              <div className="caller-phone">+61 422 891 220</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Booking] Hot water repair</span> — Caller reports banging noise from hot water system, pressure drop. Lyraa identifying urgency and offering emergency or regular booking.
          </div>
          <div className="audio-cell live">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">0:34</span> · live</div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-emergency">URGENT</span>
          </div>
          <div className="value-cell zero">—</div>
          <div className="date-cell">
            <div className="relative">Now</div>
            <div className="absolute">25 Apr · 14:23</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar">SM</div>
            <div className="caller-info">
              <div className="caller-name">Sarah Mitchell</div>
              <div className="caller-phone">+61 401 442 819</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Lead] New participant intake</span> — Mother of NDIS participant calling about personal care and community access supports. Plan-managed, looking to onboard. Booked intake call Friday 2pm.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">3:12</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-lead">LEAD</span>
            <span className="call-tag tag-opportunity">OPPORTUNITY</span>
          </div>
          <div className="value-cell high">$1,200</div>
          <div className="date-cell">
            <div className="relative">12m ago</div>
            <div className="absolute">25 Apr · 14:11</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar">PS</div>
            <div className="caller-info">
              <div className="caller-name">Parash Sharma</div>
              <div className="caller-phone">+61 8950 990 009</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Reschedule] Wednesday support to Friday</span> — Existing participant requesting schedule change. Lyraa flagged with coordinator team for callback confirmation.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">1:41</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-reschedule">SERVICE</span>
          </div>
          <div className="value-cell zero">—</div>
          <div className="date-cell">
            <div className="relative">1h ago</div>
            <div className="absolute">25 Apr · 13:24</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar">MD</div>
            <div className="caller-info">
              <div className="caller-name">Mark Davies</div>
              <div className="caller-phone">+61 419 304 556</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Quote] Bathroom renovation enquiry</span> — Caller asking about quote for full bathroom reno, 8m². Lyraa captured scope and routed to estimator. Callback scheduled for tomorrow morning.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">4:08</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-quote">QUOTE</span>
            <span className="call-tag tag-lead">LEAD</span>
          </div>
          <div className="value-cell high">$8,500</div>
          <div className="date-cell">
            <div className="relative">2h ago</div>
            <div className="absolute">25 Apr · 12:18</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar">JW</div>
            <div className="caller-info">
              <div className="caller-name">Jenny Watkins</div>
              <div className="caller-phone">+61 488 102 442</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Complaint] Worker conduct concern</span> — Family member raising concern about worker behaviour with mother. Escalated immediately to management as urgent safeguarding matter.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">2:54</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-complaint">URGENT</span>
          </div>
          <div className="value-cell zero">—</div>
          <div className="date-cell">
            <div className="relative">3h ago</div>
            <div className="absolute">25 Apr · 11:40</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar">PD</div>
            <div className="caller-info">
              <div className="caller-name">Priya Desai</div>
              <div className="caller-phone">+61 411 928 644</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Service] Worker calling in sick</span> — Worker unable to make 9am shift, requested cover for support visit. Routed to rostering immediately.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">0:48</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-service">SERVICE</span>
          </div>
          <div className="value-cell zero">—</div>
          <div className="date-cell">
            <div className="relative">4h ago</div>
            <div className="absolute">25 Apr · 10:22</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar unknown">?</div>
            <div className="caller-info">
              <div className="caller-name unknown">Unknown caller</div>
              <div className="caller-phone">+61 477 222 891</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Lead] Quote enquiry — kitchen splashback</span> — First-time caller asking about glass splashback installation. Lyraa captured contact and scope, callback booked.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">2:22</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-lead">LEAD</span>
          </div>
          <div className="value-cell high">$1,800</div>
          <div className="date-cell">
            <div className="relative">5h ago</div>
            <div className="absolute">25 Apr · 09:16</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar">DC</div>
            <div className="caller-info">
              <div className="caller-name">Dave Carter</div>
              <div className="caller-phone">+61 401 567 882</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Service] Site update from job</span> — Worker on-site reporting completion of HVAC service, requested next-day callback for additional quote on ducting work.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">1:59</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-service">SERVICE</span>
          </div>
          <div className="value-cell zero">—</div>
          <div className="date-cell">
            <div className="relative">Yesterday</div>
            <div className="absolute">24 Apr · 16:48</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar">RK</div>
            <div className="caller-info">
              <div className="caller-name">Rachel Kim</div>
              <div className="caller-phone">+61 422 198 553</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Lead] After-hours emergency callout</span> — Burst pipe enquiry after hours. Lyraa captured details, escalated to on-call tradie, follow-up booked first thing.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">3:02</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-lead">LEAD</span>
            <span className="call-tag tag-emergency">EMERGENCY</span>
          </div>
          <div className="value-cell high">$2,400</div>
          <div className="date-cell">
            <div className="relative">Yesterday</div>
            <div className="absolute">24 Apr · 23:14</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <div className="table-row" onClick={openDrawer}>
          <div className="caller-cell">
            <div className="caller-avatar">LD</div>
            <div className="caller-info">
              <div className="caller-name">Dr Lisa Donnelly</div>
              <div className="caller-phone">+61 408 100 234</div>
            </div>
          </div>
          <div className="summary-cell">
            <span className="topic-tag">[Service] Clinician update</span> — Speech pathologist updating mealtime management plan for participant. Lyraa flagged as URGENT to coordinator team for same-day callback.
          </div>
          <div className="audio-cell">
            <div className="audio-play">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div className="audio-meta"><span className="duration">2:11</span></div>
          </div>
          <div className="tag-cell">
            <span className="call-tag tag-service">SERVICE</span>
          </div>
          <div className="value-cell zero">—</div>
          <div className="date-cell">
            <div className="relative">Yesterday</div>
            <div className="absolute">24 Apr · 15:08</div>
          </div>
          <div className="actions-cell">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <div className="pag-info">Showing <strong>1–10</strong> of <strong>147</strong> calls</div>
          <div className="pag-controls">
            <button className="pag-btn" disabled>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="pag-btn active">1</button>
            <button className="pag-btn">2</button>
            <button className="pag-btn">3</button>
            <span style={{fontSize: '12px', color: 'var(--lyraa-fog)', padding: '0 4px'}}>...</span>
            <button className="pag-btn">15</button>
            <button className="pag-btn">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>

</div>

{/* DRAWER */}
<div className={"drawer-overlay" + (drawerOpen ? " open" : "")} onClick={closeDrawer}></div>
<div className={"drawer" + (drawerOpen ? " open" : "")}>

  <div className="drawer-header">
    <div className="drawer-title-block">
      <div className="drawer-eyebrow">Call detail</div>
      <div className="drawer-title">Sarah Mitchell <span className="call-tag tag-lead">LEAD</span></div>
    </div>
    <div className="drawer-actions">
      <button className="action-btn" title="Download">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </button>
      <button className="action-btn" title="Share">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      </button>
      <button className="action-btn" title="Close" onClick={closeDrawer}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  </div>

  <div className="drawer-body">

    {/* AUDIO PLAYER */}
    <div className="player">
      <div className="player-controls">
        <button className="player-skip" title="Back 10s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
        </button>
        <button className="player-play" title="Play">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>
        </button>
        <button className="player-skip" title="Forward 10s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
        </button>
        <div className="player-time"><strong>1:14</strong> / 3:12</div>
      </div>
      <div className="waveform" id="waveform"></div>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--lyraa-fog)', fontFamily: '\'JetBrains Mono\', monospace'}}>
        <span>0:00</span>
        <span>3:12</span>
      </div>
    </div>

    {/* META */}
    <div className="meta-section">
      <div className="meta-section-title">Call metadata</div>
      <div className="meta-grid">
        <div className="meta-item">
          <div className="meta-label">Caller</div>
          <div className="meta-value">Sarah Mitchell</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Phone</div>
          <div className="meta-value mono">+61 401 442 819</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Date & time</div>
          <div className="meta-value mono">25 Apr 2026 · 14:11</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Duration</div>
          <div className="meta-value mono">3:12</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Topic</div>
          <div className="meta-value">New participant intake</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Outcome</div>
          <div className="meta-value-row">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{color: 'var(--lyraa-live)', fontWeight: '600'}}>Booked</span>
          </div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Sentiment</div>
          <div className="meta-value-row">
            <span className="call-tag" style={{background: 'var(--lyraa-live-bg)', color: 'var(--lyraa-live)'}}>Positive</span>
          </div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Estimated value</div>
          <div className="meta-value" style={{color: 'var(--lyraa-live)'}}>$1,200</div>
        </div>
      </div>
    </div>

    {/* SUMMARY */}
    <div className="summary-block">
      <div className="meta-section-title">Lyraa's summary</div>
      <p>Sarah, mother of NDIS participant Liam, called to enquire about onboarding her son for personal care, community access, and life skills supports. Plan was approved last week, plan-managed. She wants a meet-and-greet before committing. Lyraa captured contact details, plan management type, support categories of interest, and booked a 30-minute intake call with the team for Friday 28 April at 2pm. SMS confirmation sent.</p>
    </div>

    {/* TRANSCRIPT */}
    <div className="transcript">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
        <div className="meta-section-title" style={{marginBottom: '0'}}>Transcript</div>
        <div className="transcript-toggle">
          <button className="toggle-btn active">Conversation</button>
          <button className="toggle-btn">Plain text</button>
        </div>
      </div>

      <div className="turn">
        <div className="turn-avatar lyraa">L</div>
        <div className="turn-content">
          <div className="turn-meta">
            <span className="turn-name">LYRAA</span>
            <span className="turn-time">0:00</span>
          </div>
          <div className="turn-text">Hi, you've reached Hyperion Tech. This is Lyraa, an AI assistant, and this call is being recorded to help us serve you better. How can I help today?</div>
        </div>
      </div>

      <div className="turn caller">
        <div className="turn-avatar caller">S</div>
        <div className="turn-content">
          <div className="turn-meta">
            <span className="turn-name caller">SARAH</span>
            <span className="turn-time">0:09</span>
          </div>
          <div className="turn-text">Hi, my son just got his NDIS plan approved and I'm looking for a provider.</div>
        </div>
      </div>

      <div className="turn">
        <div className="turn-avatar lyraa">L</div>
        <div className="turn-content">
          <div className="turn-meta">
            <span className="turn-name">LYRAA</span>
            <span className="turn-time">0:14</span>
          </div>
          <div className="turn-text">Congratulations on the plan approval — that's a big step. We'd love to learn more about what you're looking for. Could I grab a few details to pass to our intake team?</div>
        </div>
      </div>

      <div className="turn caller">
        <div className="turn-avatar caller">S</div>
        <div className="turn-content">
          <div className="turn-meta">
            <span className="turn-name caller">SARAH</span>
            <span className="turn-time">0:24</span>
          </div>
          <div className="turn-text">Sure, of course.</div>
        </div>
      </div>

      <div className="turn">
        <div className="turn-avatar lyraa">L</div>
        <div className="turn-content">
          <div className="turn-meta">
            <span className="turn-name">LYRAA</span>
            <span className="turn-time">0:27</span>
          </div>
          <div className="turn-text">Lovely. What's your name?</div>
        </div>
      </div>

      <div className="turn caller">
        <div className="turn-avatar caller">S</div>
        <div className="turn-content">
          <div className="turn-meta">
            <span className="turn-name caller">SARAH</span>
            <span className="turn-time">0:30</span>
          </div>
          <div className="turn-text">Sarah Mitchell. My son is Liam.</div>
        </div>
      </div>

      <div style={{textAlign: 'center', margin: '20px 0', fontSize: '11px', color: 'var(--lyraa-fog)'}}>
        — 12 more turns —
      </div>
    </div>

  </div>

  <div className="drawer-footer">
    <button className="footer-btn ghost">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      Delete
    </button>
    <button className="footer-btn ghost">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Notes
    </button>
    <button className="footer-btn primary">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Call back
    </button>
  </div>

</div>
    </>
  );
}
