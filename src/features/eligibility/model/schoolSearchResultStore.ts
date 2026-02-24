import { create } from "zustand";

export type SchoolSearchResultState = {
  keyword: string;
  message: string | null;
  setResult: (keyword: string, message: string | null) => void;
  clear: () => void;
};

export const useSchoolSearchResultStore = create<SchoolSearchResultState>(set => ({
  keyword: "",
  message: null,
  setResult: (keyword, message) => set({ keyword, message }),
  clear: () => set({ keyword: "", message: null }),
}));
