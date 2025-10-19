"use client";
import { LogoIcon } from "@/src/assets/icons/logo/logIcon";
import { LoginForm } from "@/src/features/auth-login/ui/loginForm";
import useLogin from "@/src/features/auth-login/hooks/useLogin";

export default function LoginPage() {
  const { handleOuth2Login } = useLogin();

  return (
    <div className="flex h-screen flex-col">
      {/* 상단 로고 */}
      <div className="flex flex-[1.5] flex-col items-center justify-end">
        <div className="flex w-full items-center justify-center">
          <LogoIcon className="h-10 w-10 translate-y-[1px]" />
          <span className="text-2xl font-[900] leading-none tracking-tight text-text-brand">
            PIN HOUSE
          </span>
        </div>
      </div>
      {/* 중간 폼 */}
      <div className="flex flex-[5] flex-col justify-center px-md">
        <LoginForm onOuth2Login={handleOuth2Login} />
      </div>
    </div>
  );
}
