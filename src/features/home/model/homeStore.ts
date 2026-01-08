import { create } from "zustand";

type RouteState = {
  prevPath: string | null;
  setPrevPath: (path: string) => void;
  reset: () => void;
};

export const useRouteStore = create<RouteState>(set => ({
  prevPath: null,
  setPrevPath: path => set({ prevPath: path }),
  reset: () => set({ prevPath: null }),
}));
