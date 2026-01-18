"use client";
import { useAuthCheck } from "@/src/entities/auth/hooks/useAuthHook";
import { Spinner } from "@/src/shared/ui/spinner/default";
import Image from "next/image";

export default function Home() {
  // 인증 상태 확인
  useAuthCheck();
  return <Spinner />;
}
