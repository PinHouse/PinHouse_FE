import { create } from "zustand";
import type { DiagnosisResultData } from "../api/diagnosisTypes";

export interface DiagnosisResultMeta {
  incomeLevel?: string;
}

interface DiagnosisResultState {
  result: DiagnosisResultData | null;
  incomeLevel: string | null;
  setResult: (result: DiagnosisResultData | null, meta?: DiagnosisResultMeta) => void;
}

export const useDiagnosisResultStore = create<DiagnosisResultState>(set => ({
  result: null,
  incomeLevel: null,
  setResult: (result, meta) =>
    set({
      result,
      incomeLevel: result ? (meta?.incomeLevel ?? null) : null,
    }),
}));
