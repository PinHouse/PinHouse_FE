"use client";
import { KakaoLogo } from "@/src/assets/icons/button/kakaoLogo";
import { NaverLogo } from "@/src/assets/icons/button/naverLogo";
import { ILoginFormProps } from "@/src/features/login/model";
import { IconButton } from "@/src/shared/ui/button/iconButton";

export function LoginForm({ onOuth2Login }: ILoginFormProps) {
  return (
    <div className="flex flex-col justify-center gap-8">
      <IconButton variant="kakao" size="lg" onClick={() => onOuth2Login("KAKAO")}>
        <KakaoLogo className="h-5 w-5" />
        <p className="text-base">카카오로 시작하기</p>
        <div className="h-5 w-5" />
      </IconButton>
      <IconButton variant="naver" size="lg" onClick={() => onOuth2Login("NAVER")}>
        <NaverLogo className="h-5 w-5" />
        <p className="text-base">네이버로 시작하기</p>
        <div className="h-5 w-5" />
      </IconButton>
    </div>
  );
}
