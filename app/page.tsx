"use client";
import { useAuthCheck } from "@/src/entities/auth/hooks/useAuthHook";
import { Spinner } from "@/src/shared/ui/spinner/default";

export default function Home() {
  // 인증 상태 확인
  useAuthCheck();
  return <Spinner />;
}
