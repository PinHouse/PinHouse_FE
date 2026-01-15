"use client";

import { cn } from "@/src/shared/lib/utils";
import { NaverLogo } from "@/src/assets/icons/button/naverLogo";
import { KakaoLogo } from "@/src/assets/icons/button/kakaoLogo";

export interface ProfileLoginInfoProps {
  /** 이메일 주소 */
  email: string;
  /** 로그인 제공자 (naver, kakao, google) */
  provider?: "naver" | "kakao" | "google";
  /** 추가 클래스명 */
  className?: string;
}

export const ProfileLoginInfo = ({
  email,
  provider = "naver",
  className,
}: ProfileLoginInfoProps) => {
  const getProviderIcon = () => {
    switch (provider) {
      case "naver":
        return (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#03C75A]">
            <NaverLogo width={10} height={10} />
          </div>
        );
      case "kakao":
        return (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FEE500]">
            <KakaoLogo width={10} height={10} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <h3 className="text-sm font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-400">
        로그인 정보
      </h3>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-900">
          연결된 이메일
        </span>
        <span className="flex-1 text-right text-xs-12 font-medium text-greyscale-grey-500">
          {email}
        </span>
        {getProviderIcon()}
      </div>
    </div>
  );
};
