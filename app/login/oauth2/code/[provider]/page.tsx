"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const code = useSearchParams().get("code");
  useEffect(() => {
    console.log(code);
  }, []);
  return <div>로그인 중입니다...</div>;
}
