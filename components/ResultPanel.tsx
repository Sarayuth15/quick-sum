"use client";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { exportTXT, exportCSV } from "@/lib/calculator";
import { useState, useRef, useEffect } from "react";

export default function ResultPanel() {
  const { input, result } = useCalculatorStore();
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const prevTotal = useRef<number | null>(null);

  useEffect(() => {
    if (result && result.total !== prevTotal.current) {
      setKey(k => k + 1);
      prevTotal.current = result.total;
    }
  }, [result?.total]);

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasResult = result && result.count > 0;
  const hasErrors = result && result.errors.length > 0;

  return (
    <div className="animate-fade-up stagger-2" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Result Card */}
      <div className="card-soft" style={{
        borderColor: hasResult ? "var(--accent)" : "var(--border)",
        padding: "24px",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hasResult
          ? "0 0 0 4px var(--accent-dim), 0 8px 24px rgba(5, 150, 105, 0.08)"
          : "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.04)",
      }}>
        <div style={{ marginBottom: "12px" }}>
          <div style={{
            fontFamily: "var(--font-khmer)",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            fontWeight: 600,
          }}>
            ចំនួនសរុប
          </div>
          <div style={{
            fontSize: "0.62rem",
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginTop: "2px",
          }}>
            Total
          </div>
        </div>

        <div
          key={key}
          className={hasResult ? "animate-count-up" : ""}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 700,
            color: hasResult ? "var(--accent)" : "var(--text-muted)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            wordBreak: "break-all",
          }}
        >
          {hasResult ? result.formatted : "—"}
        </div>

        {hasResult && (
          <div style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px dashed var(--border)",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}>
            <Stat km="ចំនួន" en="Numbers" value={String(result.count)} />
            {result.count > 0 && (
              <Stat
                km="មធ្យម"
                en="Average"
                value={(result.total / result.count).toLocaleString("en-US", { maximumFractionDigits: 2 })}
              />
            )}
            {result.errors.length > 0 && (
              <Stat km="រំលង" en="Skipped" value={String(result.errors.length)} error />
            )}
          </div>
        )}
      </div>

      {/* Error Messages */}
      {hasErrors && (
        <div style={{
          background: "var(--error-dim)",
          border: "1px solid var(--error)",
          borderRadius: "10px",
          padding: "12px 16px",
          display: "flex", flexDirection: "column", gap: "6px",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-khmer)", fontSize: "0.85rem", color: "var(--error)", fontWeight: 600 }}>
              បន្ទាត់មិនត្រឹមត្រូវត្រូវបានរំលង
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--error)", letterSpacing: "0.14em", opacity: 0.8 }}>
              INVALID LINES SKIPPED
            </span>
          </div>
          {result.errors.map((e, i) => (
            <div key={i} style={{ fontSize: "0.8rem", color: "var(--error)", fontFamily: "var(--font-mono)", opacity: 0.85 }}>
              បន្ទាត់ / Line {e.lineIndex + 1}: {e.error}
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {hasResult && (
        <div className="animate-fade-in" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <ActionBtn
            onClick={copyResult}
            icon={copied ? "✓" : "⎘"}
            km={copied ? "ចម្លងហើយ" : "ចម្លង"}
            en={copied ? "Copied" : "Copy"}
            accent={copied}
          />
          <ActionBtn onClick={() => exportTXT(input, result)} icon="↓" km="នាំចេញ" en="TXT" />
          <ActionBtn onClick={() => exportCSV(result)} icon="↓" km="នាំចេញ" en="CSV" />
        </div>
      )}

      {/* Empty State */}
      {!result && (
        <div style={{
          padding: "32px 16px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          lineHeight: 1.9,
        }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "10px", opacity: 0.35, fontFamily: "var(--font-display)" }}>Σ</div>
          <div style={{ fontFamily: "var(--font-khmer)", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            បញ្ចូលលេខនៅខាងឆ្វេង
            <br />
            ដើម្បីមើលចំនួនសរុបនៅទីនេះ
          </div>
          <div style={{ marginTop: "8px", letterSpacing: "0.08em", opacity: 0.7 }}>
            Paste numbers on the left
            <br />
            to see your total here
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ km, en, value, error }: { km: string; en: string; value: string; error?: boolean }) {
  const color = error ? "var(--error)" : "var(--text-muted)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontFamily: "var(--font-khmer)", fontSize: "0.78rem", color }}>{km}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.8 }}>
          {en}
        </span>
      </div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "1.05rem",
        fontWeight: 700,
        color: error ? "var(--error)" : "var(--text-primary)",
      }}>
        {value}
      </div>
    </div>
  );
}

function ActionBtn({
  onClick,
  icon,
  km,
  en,
  accent,
}: {
  onClick: () => void | Promise<void>;
  icon: string;
  km: string;
  en: string;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        height: "44px",
        padding: "0 14px",
        borderRadius: "8px",
        border: `1px solid ${accent ? "var(--accent)" : "var(--border)"}`,
        background: accent ? "var(--accent-dim)" : "var(--bg-card)",
        color: accent ? "var(--accent)" : "var(--text-secondary)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = accent ? "var(--accent)" : "var(--border)";
        (e.currentTarget as HTMLButtonElement).style.color = accent ? "var(--accent)" : "var(--text-secondary)";
      }}
    >
      <span style={{ fontSize: "1rem", lineHeight: 1 }}>{icon}</span>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.05 }}>
        <span style={{ fontFamily: "var(--font-khmer)", fontSize: "0.78rem" }}>{km}</span>
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7 }}>{en}</span>
      </span>
    </button>
  );
}
