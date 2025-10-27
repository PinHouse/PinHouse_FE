"use client";
import { LogoIcon } from "@/src/assets/icons/logo/logIcon";
import { PinhouseLogo } from "@/src/assets/icons/logo";
import { LoginForm } from "@/src/features/login/ui/loginForm";
import useLogin from "@/src/features/login/hooks/useLogin";

export default function LoginPage() {
  const { handleOuth2Login } = useLogin();

  return (
    <div className="flex h-screen flex-col">
      {/* 상단 로고 */}
      <div className="flex flex-[1.5] flex-col items-center justify-end">
        <div className="flex w-full items-center justify-center gap-2">
          <LogoIcon className="h-8 w-8 translate-y-[1px]" />
          <PinhouseLogo className="leading-none tracking-tight" />
        </div>
      </div>
      {/* 중간 폼 */}
      <div className="flex flex-[5] flex-col justify-center px-lg">
        <LoginForm onOuth2Login={handleOuth2Login} />
      </div>
    </div>
  );
}
