"use client";
import { useCalculatorStore } from "@/store/useCalculatorStore";
// Dark mode removed — useEffect no longer needed
// import { useEffect } from "react";

export default function Header() {
  // Dark mode removed — theme/toggleTheme no longer used
  // const { theme, toggleTheme, autoCalculate, toggleAutoCalculate } = useCalculatorStore();
  const { autoCalculate, toggleAutoCalculate } = useCalculatorStore();

  // Dark mode removed — theme sync no longer needed
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  return (
    <header className="animate-fade-up" style={{
      borderBottom: "1px solid var(--border)",
      padding: "0 max(1.5rem, env(safe-area-inset-left))",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "var(--bg)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 32, height: 32,
          background: "var(--accent)",
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "16px",
          color: "var(--bg)",
        }}>Σ</div>
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span style={{
            fontFamily: "var(--font-khmer)",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
          }}>
            បូករហ័ស
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginTop: "2px",
          }}>
            Quick Sum
          </span>
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={toggleAutoCalculate}
          title={autoCalculate ? "Auto-calc ON" : "Auto-calc OFF"}
          style={{
            padding: "5px 12px",
            borderRadius: 6,
            border: `1px solid ${autoCalculate ? "var(--accent)" : "var(--border)"}`,
            background: autoCalculate ? "var(--accent-dim)" : "transparent",
            color: autoCalculate ? "var(--accent)" : "var(--text-secondary)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span>AUTO</span>
            <span style={{
              fontWeight: 700,
              color: autoCalculate ? "var(--accent)" : "var(--text-muted)",
            }}>
              {autoCalculate ? "ON" : "OFF"}
            </span>
          </span>
        </button>

        {/* Dark mode removed — theme toggle button hidden
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            width: 36, height: 36,
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            color: "var(--text-secondary)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem",
            transition: "all 0.2s",
          }}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        */}
      </div>
    </header>
  );
}
