import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculate, CalculationResult } from "@/lib/calculator";

export interface HistoryEntry {
  id: string;
  input: string;
  result: CalculationResult;
  timestamp: number;
}

interface CalculatorState {
  input: string;
  result: CalculationResult | null;
  history: HistoryEntry[];
  // Dark mode removed — theme state retained as comment for reference
  // theme: "dark" | "light";
  autoCalculate: boolean;
  setInput: (v: string) => void;
  calculate: () => void;
  clear: () => void;
  removeHistoryEntry: (id: string) => void;
  clearHistory: () => void;
  // toggleTheme: () => void;
  toggleAutoCalculate: () => void;
  loadFromHistory: (entry: HistoryEntry) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      input: "",
      result: null,
      history: [],
      // Dark mode removed
      // theme: "dark",
      autoCalculate: true,

      setInput: (v) => {
        set({ input: v });
        if (get().autoCalculate && v.trim()) {
          const result = calculate(v);
          set({ result });
        } else if (!v.trim()) {
          set({ result: null });
        }
      },

      calculate: () => {
        const { input, history } = get();
        if (!input.trim()) return;
        const result = calculate(input);
        const entry: HistoryEntry = {
          id: crypto.randomUUID(),
          input,
          result,
          timestamp: Date.now(),
        };
        set({
          result,
          history: [entry, ...history].slice(0, 20),
        });
      },

      clear: () => set({ input: "", result: null }),

      removeHistoryEntry: (id) =>
        set((s) => ({ history: s.history.filter((h) => h.id !== id) })),

      clearHistory: () => set({ history: [] }),

      // Dark mode removed — toggleTheme retained as comment for reference
      // toggleTheme: () => {
      //   const next = get().theme === "dark" ? "light" : "dark";
      //   set({ theme: next });
      //   document.documentElement.setAttribute("data-theme", next);
      // },

      toggleAutoCalculate: () =>
        set((s) => ({ autoCalculate: !s.autoCalculate })),

      loadFromHistory: (entry) =>
        set({ input: entry.input, result: entry.result }),
    }),
    {
      name: "numsum-storage",
      // Dark mode removed — theme no longer persisted
      partialize: (s) => ({ history: s.history, autoCalculate: s.autoCalculate }),
    }
  )
);
