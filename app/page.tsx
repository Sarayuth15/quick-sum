"use client";
import Header from "@/components/Header";
import InputPanel from "@/components/InputPanel";
import ResultPanel from "@/components/ResultPanel";
import HistoryPanel from "@/components/HistoryPanel";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />

      {/* Background grid */}
      <div className="grid-bg" style={{
        position: "fixed", inset: 0,
        opacity: 0.5,
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <main style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "32px max(1.5rem, env(safe-area-inset-left))",
      }}>
        {/* Hero */}
        <div className="animate-fade-up" style={{ marginBottom: "40px" }}>
          <h1 style={{
            fontFamily: "var(--font-khmer)",
            fontWeight: 700,
            fontSize: "clamp(1.9rem, 4.6vw, 3.2rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
            marginBottom: "6px",
          }}>
            Past លេខ
            <br />
            <span style={{ color: "var(--accent)" }}>ដើម្បីគណនាចំនួនសរុប</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            color: "var(--text-secondary)",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            margin: "8px 0 14px",
          }}>
            Paste numbers. <span style={{ color: "var(--accent)" }}>Get the total.</span>
          </p>
          <p style={{
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            lineHeight: 1.8,
          }}>
            គាំទ្រចំនួនធម្មតា តម្លៃដែលមានខណ្ឌដោយក្បៀស និងចំនួនទសភាគ
            <br />
            Supports plain numbers, comma-formatted values, and decimals.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "24px",
          alignItems: "start",
        }}>
          {/* Left: Input */}
          <div>
            <InputPanel />
          </div>

          {/* Right: Result + History */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <ResultPanel />
            <HistoryPanel />
          </div>
        </div>

        {/* Footer */}
        <div className="animate-fade-up stagger-5" style={{
          marginTop: "60px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
            បូករហ័ស · NumSum — PWA ដំណើរការក្រៅបណ្តាញ / offline-ready
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
            បង្កើតដោយ Next.js + TypeScript
          </span>
        </div>
      </main>
    </div>
  );
}
