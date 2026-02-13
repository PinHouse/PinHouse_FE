"use client";

import Image from "next/image";
import { ProfileDefaultImg } from "@/src/assets/images/mypage/ProfileDefaultImg";
import SettingsIcon from "@/src/assets/icons/mypage/settingsIcon";
import type { MypageUserData } from "@/src/features/mypage/model";
import {
  MYPAGE_DEFAULT_USER_EMAIL,
  MYPAGE_DEFAULT_USER_NAME,
  MYPAGE_PROFILE_IMAGE_ALT,
} from "@/src/features/mypage/model/mypageConstants";

interface UserInfoCardProps {
  user?: MypageUserData | null;
  onSettingsClick?: () => void;
}

export const UserInfoCard = ({ user, onSettingsClick }: UserInfoCardProps) => {
  const profileImageUrl = user?.profileImage?.trim() || null;
  const userName = user?.nickName ?? MYPAGE_DEFAULT_USER_NAME;
  const userEmail = user?.email ?? MYPAGE_DEFAULT_USER_EMAIL;

  return (
    <section
      aria-label="사용자 정보"
      className="flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-4"
    >
      <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-greyscale-grey-50">
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt={MYPAGE_PROFILE_IMAGE_ALT}
            fill
            className="object-cover"
          />
        ) : (
          <ProfileDefaultImg width={25} height={25} />
        )}
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
        <span className="truncate text-lg font-semibold leading-[132%] tracking-[-0.01em] text-greyscale-grey-900">
          {userName}
        </span>
        <span className="truncate text-xs-12 font-medium text-greyscale-grey-400">
          {userEmail}
        </span>
      </div>
      <button
        type="button"
        aria-label="설정"
        disabled={!onSettingsClick}
        onClick={onSettingsClick}
      >
        <SettingsIcon />
      </button>
    </section>
  );
};
