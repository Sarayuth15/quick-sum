export interface ParseResult {
  value: number;
  raw: string;
  lineIndex: number;
  valid: boolean;
  error?: string;
}

export interface CalculationResult {
  total: number;
  count: number;
  parsed: ParseResult[];
  errors: ParseResult[];
  formatted: string;
}

export function parseNumber(raw: string, lineIndex: number): ParseResult {
  const trimmed = raw.trim();
  if (!trimmed) return { value: 0, raw, lineIndex, valid: false, error: "Empty line" };

  let cleaned = trimmed.replace(/[$,]/g, "");
  const lastEquals = cleaned.lastIndexOf("=");
  if (lastEquals >= 0) {
    cleaned = cleaned.slice(lastEquals + 1);
  }
  cleaned = cleaned.trim();

  // Check for invalid characters
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) {
    return {
      value: 0,
      raw,
      lineIndex,
      valid: false,
      error: `"${trimmed}" is not a valid number`,
    };
  }

  const value = parseFloat(cleaned);
  if (isNaN(value)) {
    return { value: 0, raw, lineIndex, valid: false, error: `Cannot parse "${trimmed}"` };
  }

  return { value, raw: trimmed, lineIndex, valid: true };
}

export function calculate(input: string): CalculationResult {
  const lines = input.split(/[\n,;\t]/).map((l) => l.trim()).filter((l) => l.length > 0);

  const parsed = lines.map((line, i) => parseNumber(line, i));
  const valid = parsed.filter((p) => p.valid);
  const errors = parsed.filter((p) => !p.valid);

  const total = valid.reduce((sum, p) => sum + p.value, 0);

  return {
    total,
    count: valid.length,
    parsed,
    errors,
    formatted: formatNumber(total),
  };
}

export function formatNumber(n: number): string {
  if (Number.isInteger(n)) {
    return n.toLocaleString("en-US");
  }
  return n.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export function exportTXT(input: string, result: CalculationResult): void {
  const lines = [
    "NumSum Calculation Export",
    "=".repeat(30),
    "",
    "Input Values:",
    ...result.parsed.filter((p) => p.valid).map((p) => `  ${p.raw}  →  ${formatNumber(p.value)}`),
    "",
    "─".repeat(30),
    `Count: ${result.count} numbers`,
    `Total: ${result.formatted}`,
    "",
    `Exported: ${new Date().toLocaleString()}`,
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `numsum-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCSV(result: CalculationResult): void {
  const rows = [
    ["Line", "Raw Input", "Parsed Value"],
    ...result.parsed
      .filter((p) => p.valid)
      .map((p, i) => [String(i + 1), p.raw, String(p.value)]),
    ["", "TOTAL", String(result.total)],
  ];

  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `numsum-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
