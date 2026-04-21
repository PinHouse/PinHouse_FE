import { LoginForm } from "@/src/features/login/ui/loginForm";
import useLogin from "@/src/features/login/hooks/useLogin";
import { AppLogoIcon } from "@/src/assets/icons/logo/appLogo";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col gap-30 px-lg py-45">
      {/* 상단 로고 */}
      <div className="flex flex-[1.5] flex-col items-center justify-end">
        <div className="flex w-full flex-col items-center justify-center gap-lg">
          <AppLogoIcon />
          <p className="text-center text-2xl font-bold">
            간편하게 로그인하고<br></br>
            내게 맞는 집을 찾아보세요
          </p>
        </div>
      </div>
      {/* 중간 폼 */}
      <div className="flex flex-[5] flex-col">
        <LoginForm />
      </div>
    </div>
  );
}
