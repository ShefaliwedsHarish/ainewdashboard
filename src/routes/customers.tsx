import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import "@/styles/calls.css";
import "@/styles/customers.css";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Lyraa" },
      { name: "description", content: "Browse, search, and manage every customer Lyraa has captured." },
      { property: "og:title", content: "Customers — Lyraa" },
      { property: "og:description", content: "Browse, search, and manage every customer Lyraa has captured." },
    ],
  }),
  component: CustomersPage,
});

type Customer = {
  id: string;
  name: string;
  source: string;
  email: string;
  phone: string;
  lastContact: string;
  calls: number;
  status: "Active" | "Lead" | "VIP" | "Churned";
};

const FIRST = ["Olivia","Liam","Emma","Noah","Ava","Ethan","Sophia","Mason","Isabella","Logan","Mia","Lucas","Amelia","Jack","Harper","Levi","Evelyn","Asher","Charlotte","James","Aria","Henry","Layla","Owen","Scarlett","Daniel","Penelope","Wyatt","Chloe","Leo"];
const LAST = ["Bennett","Carter","Hughes","Reed","Sullivan","Patel","Nguyen","Kim","Wright","Foster","Brooks","Hayes","Murphy","Cole","Russo","Walsh","Spencer","Coleman","Burke","Stone","Morgan","Greer","Holt","Lane","Pierce","Quinn","Ramsey","Shaw","Tate","Vega"];
const SOURCES = ["Inbound call","Website form","Referral","Google ads","Repeat customer","Walk-in"];
const STATUSES: Customer["status"][] = ["Active","Lead","VIP","Active","Active","Lead","Churned","VIP","Active","Lead"];

function seed(n: number): Customer[] {
  const out: Customer[] = [];
  for (let i = 0; i < n; i++) {
    const f = FIRST[i % FIRST.length];
    const l = LAST[(i * 7) % LAST.length];
    const days = (i * 3) % 60;
    const calls = ((i * 13) % 9) + 1;
    out.push({
      id: `C-${1000 + i}`,
      name: `${f} ${l}`,
      source: SOURCES[i % SOURCES.length],
      email: `${f.toLowerCase()}.${l.toLowerCase()}@example.com`,
      phone: `+61 4${String(10000000 + i * 7919).slice(0, 8)}`,
      lastContact: days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`,
      calls,
      status: STATUSES[i % STATUSES.length],
    });
  }
  return out;
}

const ALL = seed(127);
const PAGE_SIZE = 10;

function initials(name: string) {
  return name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
}

function statusClass(s: Customer["status"]) {
  if (s === "Active") return "cust-tag active";
  if (s === "Lead") return "cust-tag lead";
  if (s === "VIP") return "cust-tag vip";
  return "cust-tag churn";
}

function CustomersPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);
  const closeDrawer = () => setSelected(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL;
    return ALL.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.source.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  return (
    <div className="app">
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
          <Link to="/" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </Link>
          <Link to="/calls" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Calls
          </Link>
          <Link to="/customers" className="nav-item active" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Customers
          </Link>
        </div>

        <div className="nav-group">
          <div className="nav-group-label">Configure</div>
          <Link to="/train" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            Train Lyraa
          </Link>
          <Link to="/integrations" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Integrations
          </Link>
        </div>

        <div className="nav-group">
          <div className="nav-group-label">Account</div>
          <Link to="/billing" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Billing
          </Link>
          <Link to="/settings" className="nav-item" activeOptions={{ exact: true }} activeProps={{ className: "nav-item active" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Settings
          </Link>
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
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <h1>Customers</h1>
            <div className="breadcrumb">{filtered.length} contacts captured by Lyraa</div>
          </div>
          <div className="topbar-right">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-primary">+ Add customer</button>
          </div>
        </div>

        <div className="content">
          <div className="cust-toolbar">
            <div className="cust-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Search by name, email, phone…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              />
            </div>
          </div>

          <div className="table-panel customers-table">
            <div className="table-head">
              <div>Customer</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Last contact</div>
              <div>Source</div>
              <div>Calls</div>
              <div></div>
            </div>

            {rows.length === 0 ? (
              <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>
                No customers match your search.
              </div>
            ) : (
              rows.map((c) => (
                <div className="table-row" key={c.id} onClick={() => setSelected(c)}>
                  <div className="cust-name">
                    <span className="cust-avatar">{initials(c.name)}</span>
                    <div className="cust-name-meta">
                      <div className="n">{c.name}</div>
                      <div className="s"><span className={statusClass(c.status)}>{c.status}</span></div>
                    </div>
                  </div>
                  <div className="cust-cell">{c.email}</div>
                  <div className="cust-cell cust-muted">{c.phone}</div>
                  <div className="cust-cell cust-muted">{c.lastContact}</div>
                  <div className="cust-cell cust-muted">{c.source}</div>
                  <div className="cust-cell" style={{ fontWeight: 600 }}>{c.calls}</div>
                  <button className="row-action" aria-label="Row actions" onClick={(e) => e.stopPropagation()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </button>
                </div>
              ))
            )}

            <div className="pagination">
              <div className="pagination-info">
                Showing <b>{filtered.length === 0 ? 0 : start + 1}</b>–<b>{Math.min(start + PAGE_SIZE, filtered.length)}</b> of <b>{filtered.length}</b>
              </div>
              <div className="pagination-controls">
                <button className="page-btn" disabled={currentPage === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
                  ← Prev
                </button>
                {pageNumbers.map((p, i) =>
                  p === "…" ? (
                    <span key={`e-${i}`} className="page-ellipsis">…</span>
                  ) : (
                    <button
                      key={p}
                      className={"page-btn" + (p === currentPage ? " active" : "")}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}
                <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push("…");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}
