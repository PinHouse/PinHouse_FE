export interface EnvtagState {
  envTag: string[];
  setEnvtag: (tags: string[]) => void;
  addEnvtag: (tag: string) => void;
  removeEnvtag: (tag: string) => void;
  toggleEnvtag: (tag: string) => void;
  reset: () => void;
}
