import { create } from "zustand";
import { SearchState } from "./searchType";
import { persist } from "zustand/middleware";

export const useSearchState = create<SearchState>()(
  persist(
    (set, get) => ({
      searchQuery: [],
      query: "",
      setQuery: (keyword: string) => {
        set({ query: keyword });
      },
      setSearchQuery: (keyword: string) => {
        if (!keyword) return;
        const list = get().searchQuery;
        const next = [keyword, ...list.filter(k => k !== keyword)].slice(0, 10);
        set({ searchQuery: next });
      },
      removeSearchQuery: (keyword: string) => {
        const list = get().searchQuery;
        const next = list.filter(k => k !== keyword);
        set({ searchQuery: next });
      },
      resetQuery: () => {
        set({ query: "" });
      },
      reset: () => {
        set({ searchQuery: [] });
      },
    }),
    {
      name: "recentSearch",
    }
  )
);
