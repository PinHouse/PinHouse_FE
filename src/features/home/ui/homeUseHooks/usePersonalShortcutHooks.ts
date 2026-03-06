"use client";
import { useOAuthStore } from "@/src/features/login/model";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * @userId 사용자 식별자
 * @returns 메시지 노출 여부 세션 스토리지 키
 */
const messageSeenKey = (userId: string) => `home-shortcut-msg-seen:${userId ?? "anon"}`;

/**
 * @returns 개인화 숏컷 메시지 노출 상태
 */
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

/**
 * @returns 개인화 메뉴 라우팅 함수
 */
export const usePersonalRouteHooks = () => {
  const router = useRouter();

  /**
   * @path 이동할 경로
   */
  const personalRoute = (path: string) => {
    router.push(path);
  };
  return {
    personalRoute,
  };
};
