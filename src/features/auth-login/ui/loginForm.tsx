"use client";
import { ILoginFormProps } from "@/src/features/auth-login/model";

export function LoginForm({ onOuth2Login }: ILoginFormProps) {
  return (
    <div className="flex flex-col justify-center gap-8">
      <button
        onClick={() => onOuth2Login("KAKAO")}
        className="hover:bg-button-hover w-full rounded-lg bg-button-light py-3 font-suit text-lg font-semibold text-button-text transition-all duration-200 active:bg-button-active disabled:bg-button-muted"
      >
        {"카카오 로그인(임시)"}
      </button>
      <button
        onClick={() => onOuth2Login("NAVER")}
        className="hover:bg-button-hover w-full rounded-lg bg-button-light py-3 font-suit text-lg font-semibold text-button-text transition-all duration-200 active:bg-button-active disabled:bg-button-muted"
      >
        {"네이버 로그인(임시)"}
      </button>
    </div>
  );
}
