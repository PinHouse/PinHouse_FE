"use client";

import { cn } from "@/src/shared/lib/utils";
import { CameraIcon } from "@/src/assets/icons/button/cameraIcon";
import Image from "next/image";
import { ProfileDefaultImg } from "@/src/assets/images/mypage/ProfileDefaultImg";

export interface ProfileAvatarProps {
  /** 프로필 이미지 URL */
  imageUrl?: string | null;
  /** 카메라 아이콘 클릭 핸들러 */
  onCameraClick?: () => void;
  /** 추가 클래스명 */
  className?: string;
}

export const ProfileAvatar = ({ imageUrl, onCameraClick, className }: ProfileAvatarProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* 프로필 이미지 */}
      <div className="relative h-[4.75rem] w-[4.75rem] overflow-hidden rounded-full bg-greyscale-grey-100">
        {imageUrl ? (
          <Image src={imageUrl} alt="프로필 사진" fill className="object-cover" sizes="96px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-greyscale-grey-50">
            <ProfileDefaultImg />
          </div>
        )}
      </div>
      {/* 카메라 아이콘 */}
      <button
        type="button"
        onClick={onCameraClick}
        className="absolute bottom-0 right-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-greyscale-grey-75 bg-white"
        aria-label="프로필 사진 변경"
      >
        <CameraIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
