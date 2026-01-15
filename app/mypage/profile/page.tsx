"use client";

import { ProfileForm } from "@/src/features/mypage/ui/profileForm";
import { LeftButton } from "@/src/assets/icons/button/leftButton";
import { useRouter } from "next/navigation";
import { useOAuthStore } from "@/src/features/login/model/authStore";

export default function ProfilePage() {
  const { userName } = useOAuthStore();

  // TODO: 로그인 시 or 프로필 조회 API로 실제 사용자 이메일, Provider 정보 필요
  const initialEmail = "로그인할때or프로필조회API로이메일_필요@naver.com"; // 예시
  const initialProvider = "kakao" as const;
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 프로필 폼 */}
      <div className="px-5 py-6">
        <ProfileForm
          initialNickname={userName}
          initialEmail={initialEmail}
          initialProvider={initialProvider}
        />
      </div>
    </div>
  );
}
