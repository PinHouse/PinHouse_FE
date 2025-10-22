import { create } from "zustand";
import { EnvtagState } from "../model/envTag.type";

export const useEnvtagStore = create<EnvtagState>(set => ({
  envTag: [],
  setEnvtag: tags => set({ envTag: tags }),
  addEnvtag: tag =>
    set(state => ({
      envTag: [...state.envTag, tag],
    })),
  removeEnvtag: tag =>
    set(state => ({
      envTag: state.envTag.filter(t => t !== tag),
    })),
  toggleEnvtag: tag =>
    set(state => ({
      envTag: state.envTag.includes(tag)
        ? state.envTag.filter(t => t !== tag)
        : [...state.envTag, tag],
    })),

  reset: () => set({ envTag: [] }),
}));
