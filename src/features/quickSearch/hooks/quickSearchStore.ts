import { create } from "zustand";

interface QuickSearchState {
  livingNumber: string | null;
  setLivingNumber: (value: string | null) => void;
  reset: () => void;
}

export const useQuickSearchStore = create<QuickSearchState>(set => ({
  livingNumber: null,
  setLivingNumber: value => set({ livingNumber: value }),
  reset: () => set({ livingNumber: null }),
}));
