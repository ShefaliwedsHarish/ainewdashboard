import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { requireAuth } from "@/lib/auth-guard";
import "@/styles/calls.css";
import { MainLayout } from "@/components/layout";
import { callsService, type Call, type CallMessage } from "@/services/callsService";
export const Route = createFileRoute("/calls")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [
      { title: "Calls — Lyraa" },
      { name: "description", content: "Browse, search, and review every call your AI receptionist has handled." },
    ],
  }),
  component: CallsPage,
});

const PAGE_SIZE = 10;

function formatDuration(seconds: number | string | undefined): string {
  if (!seconds) return "0:00";
  const s = typeof seconds === "string" ? parseInt(seconds, 10) : seconds;
  if (isNaN(s)) return String(seconds);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, "0")}`;
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "N/A";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return dateStr;
  }
}

function getInitials(name: string | null | undefined): string {
  if (!name || name === "—") return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(5);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [messages, setMessages] = useState<CallMessage[]>([]);

  // Cache intents seen across pages for filter tabs
  const [allCalls, setAllCalls] = useState<Call[]>([]);

  // Debounce search input — wait 400ms before sending to backend
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 400);
  };

  // Reset page when filter changes
  const handleFilterChange = (tab: string) => {
    setActiveFilter(tab);
    setPage(1);
  };

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const res = await callsService.getAll(page, {
          search: debouncedSearch || undefined,
          intent: activeFilter !== "All" ? activeFilter : undefined,
        });
        const rows = Array.isArray(res.data) ? res.data : [];
        setCalls(rows);
        setTotalPages(res.last_page ?? 1);
        setTotal(res.total ?? rows.length);
        setPerPage(res.per_page ?? rows.length);
        // Accumulate unique calls for intent tab counts
        setAllCalls((prev) => {
          const ids = new Set(prev.map((c) => c.id));
          return [...prev, ...rows.filter((c) => !ids.has(c.id))];
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching calls:", err);
        setError("Failed to load calls");
      } finally {
        setLoading(false);
      }
    };
    fetchCalls();
  }, [page, debouncedSearch, activeFilter]);

  const openDrawer = async (call: Call) => {
    setSelectedCall(call);
    setDrawerOpen(true);
    setDrawerLoading(true);

    // Use transcript already in list data immediately
    const listTranscript = call.transcript || call.messages || [];
    setMessages(listTranscript);

    try {
      const id = String(call.id || call.uuid || "");
      const detail = await callsService.getById(id);
      setSelectedCall(detail);

      // Prefer detail transcript, fall back to list transcript
      const detailTranscript = detail.transcript || detail.messages || [];
      if (detailTranscript.length > 0) {
        setMessages(detailTranscript);
      } else if (listTranscript.length === 0) {
        // Last resort: fetch messages endpoint
        try {
          const msgs = await callsService.getMessages(id);
          setMessages(Array.isArray(msgs) ? msgs : []);
        } catch {
          setMessages([]);
        }
      }
    } catch {
      // Keep list data and transcript already set
    } finally {
      setDrawerLoading(false);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedCall(null);
    setMessages([]);
  };

  // Intent-based filter tabs (from all cached calls)
  const intentCounts = useMemo(() => {
    const counts: Record<string, number> = { All: total };
    allCalls.forEach((c) => {
      const key = c.intent || c.call_type || "Other";
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [allCalls, total]);

  const filterTabs = useMemo(() => {
    const intents = Array.from(new Set(allCalls.map((c) => c.intent || c.call_type || "Other")));
    return ["All", ...intents];
  }, [allCalls]);

  // No client-side filtering — backend handles it
  const filtered = calls;

  // Stats from cached calls
  const stats = useMemo(() => {
    const totalDuration = allCalls.reduce((sum, c) => {
      const s = typeof c.duration === "string" ? parseInt(c.duration, 10) : (c.duration || 0);
      return sum + (isNaN(s) ? 0 : s);
    }, 0);
    const avgDuration = allCalls.length > 0 ? Math.round(totalDuration / allCalls.length) : 0;
    const successful = allCalls.filter((c) => c.status === "success" || c.status === "completed").length;
    return { avgDuration, successful };
  }, [allCalls]);

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages]);

  return (
    <>
      <MainLayout title="All calls" subtitle="">
        {loading && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.8)", zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid var(--lyraa-whisper)", borderTopColor: "var(--lyraa-signal)", borderRadius: "50%", animation: "spin 0.75s linear infinite" }} />
            <div style={{ fontSize: "13px", color: "var(--lyraa-fog)" }}>Loading calls…</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        {/* PAGE HEADER */}
        <div className="page-header">
              <div className="page-title-block">
                <div className="page-eyebrow">All time</div>
                <div className="page-title">Calls</div>
                <div className="page-subtitle">Every conversation Lyraa handled, with full transcripts and recordings.</div>
              </div>
              <div className="page-actions">
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
            <div className="summary-value">{loading ? "—" : total}</div>
            <div className="summary-trend neutral">All time</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Successful</div>
            <div className="summary-value">{loading ? "—" : stats.successful}</div>
            <div className="summary-trend">
              {total > 0 ? `${Math.round((stats.successful / total) * 100)}% success rate` : "—"}
            </div>
          </div>
          <div className="summary-card feature">
            <div className="summary-label">This page</div>
            <div className="summary-value">{loading ? "—" : filtered.length}</div>
            <div className="summary-trend">{activeFilter !== "All" ? `Intent: ${activeFilter}` : `Page ${page} of ${totalPages}`}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Avg duration</div>
            <div className="summary-value">{loading ? "—" : formatDuration(stats.avgDuration)}</div>
            <div className="summary-trend neutral">Per call</div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <div className="search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search by caller, number, or summary..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            {filterTabs.map((tab) => (
              <div
                key={tab}
                className={"filter-chip" + (activeFilter === tab ? " active" : "")}
                onClick={() => handleFilterChange(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab} <span className="count">{intentCounts[tab] || 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="table-panel">
          <div className="table-head">
            <div className="th">Caller</div>
            <div className="th">Summary</div>
            <div className="th">Duration</div>
            <div className="th">Status</div>
            <div className="th">Date</div>
            <div className="th"></div>
          </div>

          {loading && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>Loading calls...</div>
          )}
          {error && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>{error}</div>
          )}
          {!loading && !error && filtered.length === 0 && (            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>No calls found</div>
          )}

          {!loading && !error && filtered.map((call) => (
            <div className="table-row" key={call.id || call.uuid} onClick={() => openDrawer(call)} style={{ cursor: "pointer" }}>
              <div className="caller-cell">
                <div className="caller-avatar">{getInitials(call.customer_name)}</div>
                <div className="caller-info">
                  <div className="caller-name">{call.customer_name && call.customer_name !== "—" ? call.customer_name : "Unknown caller"}</div>
                  <div className="caller-phone">{call.phone || call.from || "N/A"}</div>
                </div>
              </div>
              <div className="summary-cell">
                {(call.intent || call.call_type) && (
                  <span className="topic-tag">[{call.intent || call.call_type}]</span>
                )}{" "}
                {call.summary || "No summary available"}
              </div>
              <div className="audio-cell">
                <div className="audio-play">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <div className="audio-meta"><span className="duration">{formatDuration(call.duration)}</span></div>
              </div>
              <div className="tag-cell">
                {call.status && <span className="call-tag">{call.status}</span>}
              </div>
              <div className="date-cell">
                <div className="relative">{formatDate(call.created_at || call.date)}</div>
              </div>
              <div className="actions-cell">
                <button className="action-btn" onClick={(e) => e.stopPropagation()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>
            </div>
          ))}

          {!loading && !error && total > 0 && (
            <div className="pagination">
              <div className="pag-info">
                Showing <strong>{(page - 1) * perPage + 1}–{Math.min(page * perPage, total)}</strong> of <strong>{total}</strong> calls
              </div>
              <div className="pag-controls">
                <button className="pag-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                {pageNumbers.map((p, i) =>
                  p === "..." ? (
                    <span key={`e-${i}`} style={{ fontSize: "12px", color: "var(--lyraa-fog)", padding: "0 4px" }}>...</span>
                  ) : (
                    <button key={p} className={"pag-btn" + (page === p ? " active" : "")} onClick={() => setPage(p as number)}>{p}</button>
                  )
                )}
                <button className="pag-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          )}
          </div>
      </MainLayout>

      {/* DRAWER */}
      <div className={"drawer-overlay" + (drawerOpen ? " open" : "")} onClick={closeDrawer} />
      <div className={"drawer" + (drawerOpen ? " open" : "")}>
        <div className="drawer-header">
          <div className="drawer-title-block">
            <div className="drawer-eyebrow">Call detail</div>
            <div className="drawer-title">
              {selectedCall?.customer_name && selectedCall.customer_name !== "—"
                ? selectedCall.customer_name
                : "Unknown caller"}
              {selectedCall?.status && (
                <span className="call-tag tag-lead" style={{ marginLeft: 8 }}>{selectedCall.status}</span>
              )}
            </div>
          </div>
          <div className="drawer-actions">
            <button className="action-btn" title="Close" onClick={closeDrawer}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div className="drawer-body">
          {drawerLoading ? (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--lyraa-fog)" }}>Loading...</div>
          ) : (
            <>
              {/* META */}
              <div className="meta-section">
                <div className="meta-section-title">Call metadata</div>
                <div className="meta-grid">
                  <div className="meta-item">
                    <div className="meta-label">Caller</div>
                    <div className="meta-value">
                      {selectedCall?.customer_name && selectedCall.customer_name !== "—"
                        ? selectedCall.customer_name : "Unknown"}
                    </div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Phone</div>
                    <div className="meta-value mono">{selectedCall?.phone || selectedCall?.from || "N/A"}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Date & time</div>
                    <div className="meta-value mono">{formatDate(selectedCall?.created_at || selectedCall?.date)}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Duration</div>
                    <div className="meta-value mono">{formatDuration(selectedCall?.duration)}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Intent</div>
                    <div className="meta-value">{selectedCall?.intent || selectedCall?.call_type || "N/A"}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Status</div>
                    <div className="meta-value" style={{ color: "var(--lyraa-live)", fontWeight: 600 }}>
                      {selectedCall?.status || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* SUMMARY */}
              {selectedCall?.summary && (
                <div className="summary-block">
                  <div className="meta-section-title">Summary</div>
                  <p>{selectedCall.summary}</p>
                </div>
              )}

              {/* TRANSCRIPT */}
              {messages.length > 0 && (
                <div className="transcript">
                  <div className="meta-section-title">Transcript</div>
                  {messages.map((msg, i) => {
                    const isAgent = msg.role === "agent" || msg.speaker === "ai" || msg.author === "agent";
                    const text = msg.message || msg.text || "";
                    const initials = isAgent ? "L" : getInitials(selectedCall?.customer_name);
                    return (
                      // agent = no extra class (right), caller/user = "caller" class (left)
                      <div key={msg.id || i} className={"turn" + (isAgent ? "" : " caller")}>
                        <div className={"turn-avatar" + (isAgent ? " lyraa" : " caller")}>{initials}</div>
                        <div className="turn-content">
                          <div className="turn-meta">
                            <span className={"turn-name" + (isAgent ? "" : " caller")}>
                              {isAgent ? "LYRAA" : (selectedCall?.customer_name && selectedCall.customer_name !== "—" ? selectedCall.customer_name.toUpperCase() : "CALLER")}
                            </span>
                            {msg.time !== undefined && (
                              <span className="turn-time">{formatDuration(msg.time)}</span>
                            )}
                          </div>
                          <div className="turn-text">{text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {messages.length === 0 && !drawerLoading && (
                <div style={{ padding: "24px 0", textAlign: "center", color: "var(--lyraa-fog)", fontSize: "13px" }}>
                  No transcript available for this call.
                </div>
              )}
            </>
          )}
        </div>

        <div className="drawer-footer">
          <button className="footer-btn ghost">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Delete
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
