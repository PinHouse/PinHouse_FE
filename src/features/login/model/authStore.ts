import { create } from "zustand";
import { persist } from "zustand/middleware";

const PINPOINT_COOKIE_KEY = "pinpoint_id";
const PINPOINT_NAME_COOKIE_KEY = "pinpoint_name";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7일

const setCookie = (key: string, value: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
};

const removeCookie = (key: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${key}=; path=/; max-age=0; samesite=lax`;
};

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
      setPinPointId: (pinPointId: string) => {
        set({ pinPointId });
        if (pinPointId) setCookie(PINPOINT_COOKIE_KEY, pinPointId);
        else removeCookie(PINPOINT_COOKIE_KEY);
      },
      userName: "",
      setUserName: (userName: string) => set({ userName }),
      pinPointName: "",
      setPinpointName: (pinPointName: string) => {
        set({ pinPointName });
        if (pinPointName) setCookie(PINPOINT_NAME_COOKIE_KEY, pinPointName);
        else removeCookie(PINPOINT_NAME_COOKIE_KEY);
      },
    }),
    {
      name: "oauth-user-storage",
    }
  )
);
