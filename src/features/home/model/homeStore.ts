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

type HomeSheet = {
  open: boolean;
  openSheet: () => void;
  closeSheet: () => void;
};

export const useHomeSheetStore = create<HomeSheet>(set => ({
  open: false,
  openSheet: () => set({ open: true }),
  closeSheet: () => set({ open: false }),
}));

type HomeMaxSheet = {
  maxTime: number;
  setMaxTime: (time: number) => void;
  reset: (time: number) => void;
};

export const useHomeMaxTime = create<HomeMaxSheet>(set => ({
  maxTime: 30,
  setMaxTime: time => set({ maxTime: time }),
  reset: () => set({ maxTime: 30 }),
}));
