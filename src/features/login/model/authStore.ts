import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IOAuthState {
  tempUserId: string | null;
  setTempUserId: (userId: string) => void;
  clearTempUserId: () => void;
  pinPointId: string;
  userName: string;
  setUserName: (userName: string) => void;
  setPinPointId: (pinPointId: string) => void;
  pinPointName: string;
  setPinpointName: (pointName: string) => void;
}

export const useOAuthStore = create<IOAuthState>()(
  persist(
    set => ({
      tempUserId: null,
      setTempUserId: (userId: string) => set({ tempUserId: userId }),
      clearTempUserId: () => set({ tempUserId: null }),
      pinPointId: "",
      setPinPointId: (pinPointId: string) => set({ pinPointId }),
      userName: "",
      setUserName: (userName: string) => set({ userName }),
      pinPointName: "",
      setPinpointName: (pinPointName: string) => set({ pinPointName }),
    }),
    {
      name: "oauth-user-storage", // localStorage 키 이름
    }
  )
);
