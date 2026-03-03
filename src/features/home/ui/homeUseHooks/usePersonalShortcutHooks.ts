import { useOAuthStore } from "@/src/features/login/model";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const messageSeenKey = (userId: string) => `home-shortcut-msg-seen:${userId ?? "anon"}`;
export const usePersonalShortcutHooks = () => {
  const { userName } = useOAuthStore();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const key = messageSeenKey(userName);
    const seen = sessionStorage.getItem(key);
    if (!seen) {
      setShowMessage(true);
      sessionStorage.setItem(key, "1");
    }
  }, [userName]);

  return {
    showMessage,
  };
};

export const usePersonalRouteHooks = () => {
  const router = useRouter();
  const personalRoute = (path: string) => {
    router.push(path);
  };
  return {
    personalRoute,
  };
};
