import { createFileRoute, Link } from "@tanstack/react-router";
import "@/styles/settings.css";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: 'Settings — Lyraa' },
      { name: "description", content: 'Configure your account, business, and Lyraa preferences.' },
      { property: "og:title", content: 'Settings — Lyraa' },
      { property: "og:description", content: 'Configure your account, business, and Lyraa preferences.' },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
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
      <Link to="/train" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
        Train Lyraa</Link>
      <Link to="/integrations" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        Integrations</Link>
    </div>

    <div className="nav-group">
      <div className="nav-group-label">Account</div>
      <Link to="/billing" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        Billing</Link>
      <Link to="/settings" className="nav-item active" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
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
        <div className="breadcrumb">Account <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg> Settings</div>
        <h1>Settings</h1>
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

      <div className="page-header">
        <div>
          <div className="page-eyebrow">Account</div>
          <div className="page-title">Settings</div>
          <div className="page-subtitle">Manage your profile, team, integrations, and account preferences.</div>
        </div>
      </div>

      <div className="settings-grid">

        {/* SETTINGS NAV */}
        <aside className="settings-nav">
          <div className="settings-nav-section">
            <div className="nav-section-label">Account</div>
            <div className="settings-nav-item active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profile
            </div>
            <div className="settings-nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Security
            </div>
            <div className="settings-nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              Notifications
            </div>
          </div>

          <div className="settings-nav-section">
            <div className="nav-section-label">Workspace</div>
            <div className="settings-nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>
              Business
            </div>
            <div className="settings-nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Team
            </div>
            <div className="settings-nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Integrations
            </div>
            <div className="settings-nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              API & Webhooks
            </div>
          </div>

          <div className="settings-nav-section">
            <div className="nav-section-label">Data</div>
            <div className="settings-nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export & privacy
            </div>
            <div className="settings-nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Danger zone
            </div>
          </div>
        </aside>

        {/* SETTINGS CONTENT */}
        <div className="settings-content">

          {/* PROFILE PANEL */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">Profile</div>
                <div className="panel-subtitle">Your personal account details. Visible to your team only.</div>
              </div>
            </div>
            <div className="panel-body">

              <div className="profile-row">
                <div className="profile-avatar">AR</div>
                <div className="profile-actions">
                  <button className="btn-secondary">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    Upload photo
                  </button>
                  <button className="btn-secondary">Remove</button>
                  <span className="hint">JPG or PNG · 256×256 min · 2MB max</span>
                </div>
              </div>

              <div className="form-row two">
                <div className="form-field">
                  <label className="form-label">Full name <span className="req">*</span></label>
                  <input type="text" className="form-input" defaultValue="Arthua Ramsy"/>
                </div>
                <div className="form-field">
                  <label className="form-label">Display name</label>
                  <input type="text" className="form-input" defaultValue="Ramsy"/>
                  <div className="form-hint">How Lyraa addresses you in chat and notifications.</div>
                </div>
              </div>

              <div className="form-row two">
                <div className="form-field">
                  <label className="form-label">Email <span className="req">*</span></label>
                  <input type="email" className="form-input" defaultValue="arthuaramsy@gmail.com"/>
                </div>
                <div className="form-field">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" defaultValue="+61 422 400 373" placeholder="+61 4XX XXX XXX"/>
                  <div className="form-hint">Used for test calls and 2FA. Australian numbers only.</div>
                </div>
              </div>

              <div className="form-row two">
                <div className="form-field">
                  <label className="form-label">Time zone</label>
                  <select className="form-select">
                    <option>Australia/Melbourne (AEDT)</option>
                    <option>Australia/Sydney</option>
                    <option>Australia/Brisbane</option>
                    <option>Australia/Perth</option>
                    <option>Australia/Adelaide</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Language</label>
                  <select className="form-select">
                    <option>English (AU)</option>
                    <option>English (US)</option>
                    <option>English (UK)</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* SECURITY PANEL */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">Security</div>
                <div className="panel-subtitle">Protect your account with a strong password and two-factor authentication.</div>
              </div>
            </div>
            <div className="panel-body">

              <div className="form-row three">
                <div className="form-field">
                  <label className="form-label">Current password</label>
                  <input type="password" className="form-input" defaultValue="••••••••••••"/>
                </div>
                <div className="form-field">
                  <label className="form-label">New password</label>
                  <input type="password" className="form-input" placeholder="Min 12 characters"/>
                </div>
                <div className="form-field">
                  <label className="form-label">Confirm new password</label>
                  <input type="password" className="form-input" placeholder="Re-enter new password"/>
                </div>
              </div>
              <div className="form-hint" style={{marginBottom: '22px'}}>Use 12+ characters including upper, lower, number, and symbol.</div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">
                    Two-factor authentication
                    <span className="role-pill team-role-pill role-admin">RECOMMENDED</span>
                  </div>
                  <div className="toggle-row-desc">Add an extra layer of security with an authenticator app.</div>
                </div>
                <div className="toggle"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Email notifications for sign-ins</div>
                  <div className="toggle-row-desc">Get notified when your account is accessed from a new device.</div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Active sessions</div>
                  <div className="toggle-row-desc">2 active sessions · Chrome on macOS · Mobile Safari on iPhone.</div>
                </div>
                <button className="btn-secondary">Manage</button>
              </div>

            </div>
          </div>

          {/* NOTIFICATIONS PANEL */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">Notifications</div>
                <div className="panel-subtitle">Choose how Lyraa keeps you informed about activity, alerts, and billing.</div>
              </div>
            </div>
            <div className="panel-body">

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Urgent escalations</div>
                  <div className="toggle-row-desc">When Lyraa flags a complaint, emergency, or red-flag call.</div>
                  <div className="channel-pills">
                    <span className="channel-pill active">Email</span>
                    <span className="channel-pill active">SMS</span>
                    <span className="channel-pill active">Push</span>
                  </div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">New leads captured</div>
                  <div className="toggle-row-desc">Real-time alert when Lyraa books or qualifies a new lead.</div>
                  <div className="channel-pills">
                    <span className="channel-pill active">Email</span>
                    <span className="channel-pill active">Push</span>
                    <span className="channel-pill">SMS</span>
                  </div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Daily summary</div>
                  <div className="toggle-row-desc">Email each morning with the previous day's calls, leads, and revenue.</div>
                  <div className="channel-pills">
                    <span className="channel-pill active">Email</span>
                  </div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Missed call alerts</div>
                  <div className="toggle-row-desc">When a call drops, fails, or Lyraa cannot reach a human handoff.</div>
                  <div className="channel-pills">
                    <span className="channel-pill active">Email</span>
                    <span className="channel-pill active">SMS</span>
                  </div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Usage alerts</div>
                  <div className="toggle-row-desc">When you reach 80%, 100%, and 110% of your monthly minutes.</div>
                  <div className="channel-pills">
                    <span className="channel-pill active">Email</span>
                  </div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Billing & invoices</div>
                  <div className="toggle-row-desc">Receipts, payment failures, and invoice reminders.</div>
                  <div className="channel-pills">
                    <span className="channel-pill active">Email</span>
                  </div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Product updates & tips</div>
                  <div className="toggle-row-desc">Occasional emails about new features and best practices.</div>
                </div>
                <div className="toggle"></div>
              </div>

            </div>
          </div>

          {/* TEAM PANEL */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">Team</div>
                <div className="panel-subtitle">3 members · Pro plan allows up to 5 seats.</div>
              </div>
              <button className="btn-primary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Invite member
              </button>
            </div>
            <div className="panel-body">

              <div className="team-row">
                <div className="team-avatar warm">AR</div>
                <div>
                  <div className="team-info-name">
                    Arthua Ramsy
                    <span className="you-pill">YOU</span>
                  </div>
                  <div className="team-info-email">arthuaramsy@gmail.com</div>
                </div>
                <span className="team-role-pill role-owner">OWNER</span>
                <span className="team-status">Online now</span>
                <button className="team-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>

              <div className="team-row">
                <div className="team-avatar purple">FM</div>
                <div>
                  <div className="team-info-name">Francis Mendes</div>
                  <div className="team-info-email">francis@hyperiontech.com.au</div>
                </div>
                <span className="team-role-pill role-admin">ADMIN</span>
                <span className="team-status">Active 2h ago</span>
                <button className="team-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>

              <div className="team-row">
                <div className="team-avatar teal">PD</div>
                <div>
                  <div className="team-info-name">Priya Desai</div>
                  <div className="team-info-email">priya@hyperiontech.com.au</div>
                </div>
                <span className="team-role-pill role-member">MEMBER</span>
                <span className="team-status">Active yesterday</span>
                <button className="team-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>

            </div>
          </div>

          {/* INTEGRATIONS PANEL */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">Integrations</div>
                <div className="panel-subtitle">Connect Lyraa to the tools you already use.</div>
              </div>
              <button className="btn-secondary">View all</button>
            </div>
            <div className="panel-body">
              <div className="integrations-grid">

                <div className="integration-card">
                  <div className="integration-icon" style={{background: 'linear-gradient(135deg, #F22F46, #E11D48)', color: 'white'}}>T</div>
                  <div className="integration-info">
                    <div className="integration-name">Twilio <span className="integration-status active">Connected</span></div>
                    <div className="integration-desc">Telephony · +61 1300 360 148</div>
                  </div>
                  <button className="btn-secondary">Manage</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon" style={{background: 'linear-gradient(135deg, #34A853, #4285F4)', color: 'white'}}>G</div>
                  <div className="integration-info">
                    <div className="integration-name">Google Calendar <span className="integration-status active">Connected</span></div>
                    <div className="integration-desc">Bookings sync · 3 calendars</div>
                  </div>
                  <button className="btn-secondary">Manage</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon" style={{background: 'linear-gradient(135deg, #635BFF, #5147E5)', color: 'white'}}>S</div>
                  <div className="integration-info">
                    <div className="integration-name">Stripe <span className="integration-status active">Connected</span></div>
                    <div className="integration-desc">Subscriptions & payments</div>
                  </div>
                  <button className="btn-secondary">Manage</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon" style={{background: 'linear-gradient(135deg, #00B4D8, #0077B6)', color: 'white'}}>Z</div>
                  <div className="integration-info">
                    <div className="integration-name">Zoho CRM</div>
                    <div className="integration-desc">Push leads to your CRM</div>
                  </div>
                  <button className="btn-secondary">Connect</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon" style={{background: 'linear-gradient(135deg, #13B5EA, #0E7490)', color: 'white'}}>X</div>
                  <div className="integration-info">
                    <div className="integration-name">Xero</div>
                    <div className="integration-desc">Send call data to accounting</div>
                  </div>
                  <button className="btn-secondary">Connect</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon" style={{background: 'linear-gradient(135deg, #4A154B, #611f69)', color: 'white'}}>#</div>
                  <div className="integration-info">
                    <div className="integration-name">Slack</div>
                    <div className="integration-desc">Real-time notifications to channels</div>
                  </div>
                  <button className="btn-secondary">Connect</button>
                </div>

              </div>
            </div>
          </div>

          {/* API PANEL */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">API & Webhooks</div>
                <div className="panel-subtitle">Build custom integrations with Lyraa's API. <a href="#" style={{color: 'var(--lyraa-signal)'}}>View docs</a></div>
              </div>
              <button className="btn-primary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New API key
              </button>
            </div>
            <div className="panel-body">

              <div className="key-row">
                <div className="key-info">
                  <div className="key-name">Production key</div>
                  <div className="key-value">lyr_live_••••••••••••••••••••rJ4K</div>
                </div>
                <span className="key-meta">Created 2 weeks ago · Last used 4h ago</span>
                <div className="key-actions">
                  <button className="team-action-btn" title="Copy">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                  <button className="team-action-btn" title="Reveal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button className="team-action-btn" title="More">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                </div>
              </div>

              <div className="key-row">
                <div className="key-info">
                  <div className="key-name">Test key</div>
                  <div className="key-value">lyr_test_••••••••••••••••••••sB7Q</div>
                </div>
                <span className="key-meta">Created 2 weeks ago · Last used 1d ago</span>
                <div className="key-actions">
                  <button className="team-action-btn" title="Copy">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                  <button className="team-action-btn" title="Reveal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button className="team-action-btn" title="More">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* DATA & PRIVACY */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">Data & privacy</div>
                <div className="panel-subtitle">Manage your data per the Australian Privacy Act.</div>
              </div>
            </div>
            <div className="panel-body">

              <div className="data-banner">
                <div className="icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="data-banner-content">
                  Your data is stored in <strong>AWS Sydney (ap-southeast-2)</strong> and never leaves Australia. Default retention is 6 months for call recordings and 24 months for transcripts. <a href="#" style={{color: 'var(--lyraa-signal)', fontWeight: '600'}}>Read our DPA</a>.
                </div>
              </div>

              <div className="form-row two">
                <div className="form-field">
                  <label className="form-label">Call recording retention</label>
                  <select className="form-select">
                    <option>6 months (default)</option>
                    <option>12 months</option>
                    <option>24 months</option>
                    <option>30 days only</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Transcript retention</label>
                  <select className="form-select">
                    <option>24 months (default)</option>
                    <option>12 months</option>
                    <option>6 months</option>
                    <option>Indefinite</option>
                  </select>
                </div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Allow Lyraa training on anonymised data</div>
                  <div className="toggle-row-desc">Help improve Australian voice accuracy. Customer-identifying data is always excluded.</div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Auto-redact PII in transcripts</div>
                  <div className="toggle-row-desc">Mask credit cards, Medicare numbers, and TFNs in stored transcripts.</div>
                </div>
                <div className="toggle on"></div>
              </div>

              <div className="toggle-row">
                <div className="toggle-row-info">
                  <div className="toggle-row-title">Export my data</div>
                  <div className="toggle-row-desc">Download all your account data including calls, customers, and transcripts (CSV + JSON).</div>
                </div>
                <button className="btn-secondary">Request export</button>
              </div>

            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title" style={{color: 'var(--lyraa-danger)'}}>Danger zone</div>
                <div className="panel-subtitle">Irreversible actions. Take care.</div>
              </div>
            </div>
            <div className="panel-body">

              <div className="danger-row">
                <div>
                  <div className="danger-title">Pause Lyraa</div>
                  <div className="danger-desc">Temporarily stop Lyraa from answering calls. You can resume anytime. Caller will hear your voicemail instead.</div>
                </div>
                <button className="btn-danger">Pause agent</button>
              </div>

              <div className="danger-row">
                <div>
                  <div className="danger-title">Cancel subscription</div>
                  <div className="danger-desc">Cancel your subscription effective end of current billing period. Access continues until 30 May 2026.</div>
                </div>
                <button className="btn-danger">Cancel plan</button>
              </div>

              <div className="danger-row">
                <div>
                  <div className="danger-title">Delete account</div>
                  <div className="danger-desc">Permanently delete your account, all calls, customers, and recordings. This cannot be undone.</div>
                </div>
                <button className="btn-danger">Delete account</button>
              </div>

            </div>
          </div>

          {/* SAVE BAR */}
          <div className="save-bar">
            <div className="save-status">
              <span className="dot"></span>
              All changes saved
            </div>
            <div className="save-actions">
              <button className="btn-secondary">Discard changes</button>
              <button className="btn-primary">Save changes</button>
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
