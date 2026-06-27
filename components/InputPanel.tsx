"use client";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { useRef, useCallback } from "react";

export default function InputPanel() {
  const { input, setInput, calculate, clear, autoCalculate } = useCalculatorStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sanitizeLine = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return "";

    let cleaned = trimmed.replace(/[$,]/g, "");
    const lastEquals = cleaned.lastIndexOf("=");
    if (lastEquals >= 0) {
      cleaned = cleaned.slice(lastEquals + 1);
    }

    return cleaned;
  };

  const normalize = (v: string) =>
    v
      .split(/[\n\r]+|[ \t]+/)
      .map(sanitizeLine)
      .filter(Boolean)
      .join("\n");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(normalize(e.target.value));
  }, [setInput]);

  const handlePaste = useCallback(() => {
    setTimeout(() => {
      const val = textareaRef.current?.value ?? "";
      setInput(normalize(val));
    }, 0);
  }, [setInput]);

  return (
    <div className="animate-fade-up stagger-1" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px" }}>
        <label className="bi-label">
          <span className="km" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
            បញ្ចូល — មួយលេខក្នុងមួយបន្ទាត់
          </span>
          <span className="en">Input — one number per line</span>
        </label>
        <span style={{
          fontSize: "0.72rem",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
        }}>
          {input.split("\n").filter(l => l.trim()).length} បន្ទាត់ / lines
        </span>
      </div>

      <div style={{ position: "relative" }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onPaste={handlePaste}
          // placeholder={"វាយបញ្ចូល ឬpastលេខនៅទីនេះ…\nType or paste numbers here…"}
          placeholder={"វាយបញ្ចូល ឬpastលេខនៅទីនេះ…"}
          spellCheck={false}
          rows={12}
          style={{
            width: "100%",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "16px",
            color: "var(--text-primary)",
            fontSize: "1rem",
            lineHeight: "1.8",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            caretColor: "var(--accent)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent)";
            e.target.style.boxShadow = "0 0 0 3px var(--accent-dim)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
          aria-label="Number input area"
        />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {!autoCalculate && (
          <button
            onClick={calculate}
            disabled={!input.trim()}
            style={{
              flex: 1,
              height: "48px",
              borderRadius: "10px",
              border: "none",
              background: input.trim() ? "var(--accent)" : "var(--bg-card)",
              color: input.trim() ? "var(--bg)" : "var(--text-muted)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: input.trim() ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>+</span>
            <span style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.05 }}>
              <span style={{ fontFamily: "var(--font-khmer)" }}>គណនា</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", opacity: 0.85 }}>CALCULATE</span>
            </span>
          </button>
        )}
        <button
          onClick={clear}
          disabled={!input.trim()}
          style={{
            height: "48px",
            padding: "0 20px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: input.trim() ? "var(--text-secondary)" : "var(--text-muted)",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: input.trim() ? "pointer" : "not-allowed",
            transition: "all 0.2s",
            flex: autoCalculate ? 1 : undefined,
          }}
          onMouseEnter={(e) => input.trim() && ((e.currentTarget as HTMLButtonElement).style.borderColor = "var(--error)", (e.currentTarget as HTMLButtonElement).style.color = "var(--error)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)", (e.currentTarget as HTMLButtonElement).style.color = input.trim() ? "var(--text-secondary)" : "var(--text-muted)")}
        >
          <span style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.05 }}>
            <span style={{ fontFamily: "var(--font-khmer)" }}>សម្អាត</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", opacity: 0.7 }}>CLEAR</span>
          </span>
        </button>
      </div>
    </div>
  );
}
