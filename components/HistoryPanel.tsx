"use client";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { useState } from "react";

export default function HistoryPanel() {
  const { history, removeHistoryEntry, clearHistory, loadFromHistory } = useCalculatorStore();
  const [open, setOpen] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="animate-fade-up stagger-4" style={{ marginTop: "8px" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          padding: "10px 16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.2s",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span style={{ fontFamily: "var(--font-khmer)", fontSize: "0.85rem", color: "var(--text-primary)" }}>
            ប្រវត្តិ
          </span>
          <span style={{ letterSpacing: "0.14em", textTransform: "uppercase", fontSize: "0.65rem", opacity: 0.7 }}>
            History
          </span>
          <span style={{ color: "var(--text-muted)" }}>({history.length})</span>
        </span>
        <span style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </button>

      {open && (
        <div className="animate-fade-in" style={{
          marginTop: "8px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "8px 12px",
            borderBottom: "1px solid var(--border)",
          }}>
            <button
              onClick={clearHistory}
              style={{
                background: "none", border: "none",
                color: "var(--error)",
                fontSize: "0.72rem",
                cursor: "pointer",
                opacity: 0.85,
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
              }}
            >
              <span style={{ fontFamily: "var(--font-khmer)" }}>សម្អាតទាំងអស់</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.8 }}>
                Clear all
              </span>
            </button>
          </div>

          <div style={{ maxHeight: "320px", overflowY: "auto" }}>
            {history.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={() => loadFromHistory(entry)}
              >
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}>
                    {entry.result.formatted}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}>
                    {entry.result.count} លេខ / numbers · {new Date(entry.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeHistoryEntry(entry.id); }}
                  style={{
                    background: "none", border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    fontSize: "1rem",
                    padding: "4px",
                    borderRadius: "4px",
                    lineHeight: 1,
                  }}
                  aria-label="Remove entry"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
