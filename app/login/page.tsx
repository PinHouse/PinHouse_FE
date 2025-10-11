"use client";
import { LogoIcon } from "@/src/assets/icons/logo/logIcon";
import { LoginForm } from "@/src/features/auth-login/ui/loginForm";
import useLogin from "@/src/features/auth-login/ui/useLogin";

export default function LoginPage() {
  const { email, password, handleEmailChange, handlePasswordChange, handleLogin } = useLogin();

  return (
    <div className="flex h-screen flex-col">
      {/* 상단 로고 */}
      <div className="flex flex-[1.5] flex-col items-center justify-end">
        <div className="flex w-full items-center justify-center">
          <LogoIcon className="h-10 w-10 translate-y-[1px]" />
          <span className="text-text-brand text-2xl font-[900] leading-none tracking-tight">
            PIN HOUSE
          </span>
        </div>
      </div>

      {/* 중간 폼 */}
      <div className="px-md flex flex-[5] flex-col justify-center">
        <LoginForm
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleLogin}
        />
      </div>

      {/* 하단 안내 */}
      <div className="flex flex-[2] flex-col items-center justify-end pb-8">
        <p className="text-text-muted mt-4 text-xs">
          회원이 아니신가요?{" "}
          <a href="#" className="text-text-brand">
            가입하기
          </a>
        </p>
      </div>
    </div>
  );
}
