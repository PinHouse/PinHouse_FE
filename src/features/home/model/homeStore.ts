import { create } from "zustand";

type RouteState = {
  prevPath: string | null;
  listingEntry: string | null;
  setPrevPath: (path: string) => void;
  setListingEntry: (entry: string) => void;
  reset: () => void;
};

export const useRouteStore = create<RouteState>(set => ({
  prevPath: null,
  listingEntry: null,
  setPrevPath: path => set({ prevPath: path }),
  setListingEntry: entry => set({ listingEntry: entry }),
  reset: () => set({ prevPath: null, listingEntry: null }),
}));
