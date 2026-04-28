import { createFileRoute, Link } from "@tanstack/react-router";
import "@/styles/dashboard.css";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Lyraa" },
      { name: "description", content: "Your customer directory captured by Lyraa." },
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <svg viewBox="0 0 100 32">
            <g transform="translate(4, 16)">
              <rect x="0" y="-3" width="2.5" height="6" rx="1.25" fill="#534AB7" />
              <rect x="5" y="-7" width="2.5" height="14" rx="1.25" fill="#6B5FCF" />
              <rect x="10" y="-10" width="2.5" height="20" rx="1.25" fill="#7F77DD" />
              <rect x="15" y="-5" width="2.5" height="10" rx="1.25" fill="#6B5FCF" />
              <rect x="20" y="-8" width="2.5" height="16" rx="1.25" fill="#8B7FD9" />
            </g>
            <text x="32" y="21" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="#2B2458" letterSpacing="-0.5">lyraa</text>
          </svg>
        </div>
        <Link to="/" className="nav-item" style={{ marginBottom: 4 }}>← Back to Dashboard</Link>
      </aside>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <h1>Customers</h1>
            <div className="greeting">Coming soon</div>
          </div>
        </div>
        <div className="content">
          <div style={{ background: "white", border: "0.5px solid rgba(83, 74, 183, 0.15)", borderRadius: 14, padding: 48, textAlign: "center", color: "#5F5E5A" }}>
            Customer directory is on its way.
          </div>
        </div>
      </div>
    </div>
  );
}
