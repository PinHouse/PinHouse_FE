import { create } from "zustand";

type RouteState = {
  prevPath: string | null;
  setPrevPath: (path: string) => void;
  reset: () => void;
};

type FirstAccess = {
  access: boolean;
  setAccess: (access: boolean) => void;
  reset: () => void;
};

export const useRouteStore = create<RouteState>(set => ({
  prevPath: null,
  setPrevPath: path => set({ prevPath: path }),
  reset: () => set({ prevPath: null }),
}));

export const useFirstAccess = create<FirstAccess>(set => ({
  access: true,
  setAccess: access => set({ access: access }),
  reset: () => set({ access: true }),
}));
