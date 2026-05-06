import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guard";
import { MainLayout } from "@/components/layout";
import { useState, useEffect, useRef, useMemo } from "react";
import "@/styles/calls.css";
import "@/styles/customers.css";
import { customersService, type Customer, type CustomerCall } from "@/services/customersService";

export const Route = createFileRoute("/customers")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [
      { title: "Customers — Lyraa" },
      { name: "description", content: "Browse, search, and manage every customer Lyraa has captured." },
    ],
  }),
  component: CustomersPage,
});

function initials(name: string | null, phone: string | undefined) {
  if (name && name !== "—") return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  if (phone) return phone.slice(-2);
  return "?";
}

function formatDuration(seconds: number | string | undefined): string {
  if (!seconds) return "0:00";
  // Already formatted like "4 min 40 sec"
  if (typeof seconds === "string" && seconds.includes("min")) return seconds;
  const s = typeof seconds === "string" ? parseInt(seconds, 10) : seconds;
  if (isNaN(s)) return String(seconds);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return dateStr; }
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

function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerCalls, setCustomerCalls] = useState<CustomerCall[]>([]);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [selectedCall, setSelectedCall] = useState<CustomerCall | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value);
      setPage(1);
    }, 400);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await customersService.getAll(page, {
          search: debouncedQuery || undefined,
          per_page: 10,
        });
        const rows = Array.isArray(res.data) ? res.data : [];
        setCustomers(rows);
        setTotalPages(res.last_page ?? 1);
        setTotal(res.total ?? rows.length);
        setPerPage(res.per_page ?? 10);
        setError(null);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page, debouncedQuery]);

  const openDrawer = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setSelectedCall(null);
    setCustomerCalls([]);
    setDrawerOpen(true);
    setDrawerLoading(true);
    try {
      const calls = await customersService.getCallsByPhone(customer.phone);
      setCustomerCalls(calls);
    } catch (err) {
      console.error("Error fetching customer calls:", err);
    } finally {
      setDrawerLoading(false);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedCustomer(null);
    setSelectedCall(null);
    setCustomerCalls([]);
  };

  const pageNumbers = useMemo(() => buildPageNumbers(page, totalPages), [page, totalPages]);
  const start = (page - 1) * perPage;

  return (
    <>
      <MainLayout title="Customers" subtitle={`${total} contacts captured by Lyraa`}>
        <div className="cust-toolbar">
          <div className="cust-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, phone…"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button className="btn-secondary">Export CSV</button>
          {/* Add customer — coming soon */}
          {/* <button className="btn-primary">+ Add customer</button> */}
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

          {loading && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>
              Loading customers...
            </div>
          )}
          {error && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>{error}</div>
          )}
          {!loading && !error && customers.length === 0 && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>
              No customers match your search.
            </div>
          )}

          {!loading && !error && customers.map((c, i) => (
            <div
              className="table-row"
              key={(c.phone || "") + i}
              onClick={() => openDrawer(c)}
              style={{ cursor: "pointer" }}
            >
              <div className="cust-name">
                <span className="cust-avatar">{initials(c.name, c.phone)}</span>
                <div className="cust-name-meta">
                  <div className="n">{c.name && c.name !== "—" ? c.name : "Unknown caller"}</div>
                  <div className="cust-cell cust-muted" style={{ fontSize: "12px" }}>{c.phone}</div>
                </div>
              </div>
              <div className="cust-cell">{c.email || "—"}</div>
              <div className="cust-cell cust-muted">{c.phone}</div>
              <div className="cust-cell cust-muted">{c.last_contact || "—"}</div>
              <div className="cust-cell cust-muted">{c.source || "—"}</div>
              <div className="cust-cell" style={{ fontWeight: 600 }}>{c.total_calls ?? "—"}</div>
              <button className="row-action" aria-label="Row actions" onClick={(e) => e.stopPropagation()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
            </div>
          ))}

          {!loading && !error && total > 0 && (
            <div className="pagination">
              <div className="pagination-info">
                Showing <b>{total === 0 ? 0 : start + 1}</b>–<b>{Math.min(start + perPage, total)}</b> of <b>{total}</b>
              </div>
              <div className="pagination-controls">
                <button className="page-btn" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← Prev</button>
                {pageNumbers.map((p, i) =>
                  p === "…" ? (
                    <span key={`e-${i}`} className="page-ellipsis">…</span>
                  ) : (
                    <button key={p} className={"page-btn" + (p === page ? " active" : "")} onClick={() => setPage(p as number)}>{p}</button>
                  )
                )}
                <button className="page-btn" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next →</button>
              </div>
            </div>
          )}
        </div>
      </MainLayout>

      {/* DRAWER OVERLAY */}
      <div className={"drawer-overlay" + (drawerOpen ? " open" : "")} onClick={closeDrawer} />

      {/* CUSTOMER DRAWER */}
      <div className={"drawer" + (drawerOpen ? " open" : "")}>
        <div className="drawer-header">
          <div className="drawer-title-block">
            <div className="drawer-eyebrow">Customer detail</div>
            <div className="drawer-title">
              {selectedCustomer?.name && selectedCustomer.name !== "—" ? selectedCustomer.name : "Unknown caller"}
              <span style={{ marginLeft: 8, fontSize: 13, color: "var(--lyraa-fog)", fontWeight: 400 }}>
                {selectedCustomer?.phone}
              </span>
            </div>
          </div>
          <div className="drawer-actions">
            <button className="action-btn" title="Close" onClick={closeDrawer}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="drawer-body">
          {/* Customer info */}
          <div className="meta-section">
            <div className="meta-section-title">Contact info</div>
            <div className="meta-grid">
              <div className="meta-item">
                <div className="meta-label">Name</div>
                <div className="meta-value">{selectedCustomer?.name && selectedCustomer.name !== "—" ? selectedCustomer.name : "Unknown"}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Phone</div>
                <div className="meta-value mono">{selectedCustomer?.phone}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Email</div>
                <div className="meta-value">{selectedCustomer?.email || "—"}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Total calls</div>
                <div className="meta-value">{selectedCustomer?.total_calls ?? "—"}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Last contact</div>
                <div className="meta-value">{selectedCustomer?.last_contact || "—"}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Source</div>
                <div className="meta-value">{selectedCustomer?.source || "—"}</div>
              </div>
            </div>
          </div>

          {/* Call history */}
          <div className="meta-section">
            <div className="meta-section-title">Call history</div>

            {drawerLoading && (
              <div style={{ padding: "24px 0", textAlign: "center", color: "var(--lyraa-fog)", fontSize: 13 }}>
                Loading calls...
              </div>
            )}

            {!drawerLoading && customerCalls.length === 0 && (
              <div style={{ padding: "24px 0", textAlign: "center", color: "var(--lyraa-fog)", fontSize: 13 }}>
                No calls found for this customer.
              </div>
            )}

            {!drawerLoading && customerCalls.map((call, i) => (
              <div
                key={call.id || i}
                onClick={() => setSelectedCall(selectedCall?.id === call.id ? null : call)}
                style={{
                  padding: "12px 0",
                  borderBottom: "var(--border)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span className="call-tag">{call.status || "—"}</span>
                    <span style={{ fontSize: 13, color: "var(--lyraa-ink)" }}>
                      {call.intent || call.call_type || "General"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--lyraa-fog)", fontFamily: "monospace" }}>
                      {formatDuration(call.duration)}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--lyraa-fog)" }}>
                      {formatDate(call.created_at)}
                    </span>
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: selectedCall?.id === call.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                {call.summary && (
                  <div style={{ fontSize: 12, color: "var(--lyraa-fog)", marginTop: 4 }}>
                    {call.summary}
                  </div>
                )}

                {/* Expanded transcript */}
                {selectedCall?.id === call.id && call.transcript && call.transcript.length > 0 && (
                  <div className="transcript" style={{ marginTop: 12 }}>
                    {call.transcript.map((msg, j) => {
                      const isAgent = msg.role === "agent";
                      return (
                        <div key={j} className={"turn" + (isAgent ? "" : " caller")}>
                          <div className={"turn-avatar" + (isAgent ? " lyraa" : " caller")}>
                            {isAgent ? "L" : initials(selectedCustomer?.name ?? null, selectedCustomer?.phone)}
                          </div>
                          <div className="turn-content">
                            <div className="turn-meta">
                              <span className={"turn-name" + (isAgent ? "" : " caller")}>
                              {isAgent ? "LYRAA" : (selectedCustomer?.name && selectedCustomer.name !== "—" ? selectedCustomer.name : "CALLER").toUpperCase()}
                              </span>
                              {msg.time !== undefined && (
                                <span className="turn-time">{formatDuration(msg.time)}</span>
                              )}
                            </div>
                            <div className="turn-text">{msg.message || msg.text}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="drawer-footer">
          <button className="footer-btn primary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call back
          </button>
        </div>
      </div>
    </>
  );
}
