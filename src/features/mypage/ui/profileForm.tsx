"use client";

import { useEffect, useRef, useState } from "react";
import { ProfileAvatar } from "./profileAvatar";
import { ProfileNicknameInput } from "./profileNicknameInput";
import { ProfileLoginInfo } from "./profileLoginInfo";
import { useProfile } from "../hooks/useProfile";
import { ProfilePhotoBottomSheet } from "./profilePhotoBottomSheet";

export interface ProfileFormProps {
  /** 초기 닉네임 */
  initialNickname?: string;
  /** 초기 이메일 */
  initialEmail?: string;
  /** 초기 프로필 이미지 URL */
  initialProfileImageUrl?: string | null;
  /** 초기 로그인 제공자 */
  initialProvider?: "naver" | "kakao" | "google";
}

export const ProfileForm = ({
  initialNickname = "",
  initialEmail = "",
  initialProfileImageUrl = null,
  initialProvider = "naver",
}: ProfileFormProps) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleImageUpload, handleRemovePhoto, profileImageUrl } = useProfile();

  useEffect(() => {
    setNickname(initialNickname);
  }, [initialNickname]);
  const handleCameraClick = () => {
    setIsSheetOpen(true);
  };

  const handleSelectFromAlbum = () => {
    // TODO: 파일 선택 후 업로드 API로 연결될 예정
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
      setIsSheetOpen(false);
    }
  };

  const handleRemovePhotoClick = () => {
    // TODO: 삭제 API 연결 후 서버 상태와 동기화 필요
    handleRemovePhoto();
    setIsSheetOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {/* 프로필 아바타 */}
      <div className="flex justify-center">
        <ProfileAvatar
          imageUrl={profileImageUrl ?? initialProfileImageUrl}
          onCameraClick={handleCameraClick}
        />
      </div>

      {/* 닉네임 입력 */}
      <ProfileNicknameInput value={nickname} onChange={setNickname} maxLength={10} />
      <div className="mx-[-20px] h-[9px] border-t border-greyscale-grey-50 bg-greyscale-grey-25" />
      {/* 로그인 정보 */}
      <ProfileLoginInfo email={initialEmail} provider={initialProvider} />

      <ProfilePhotoBottomSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSelectFromAlbum={handleSelectFromAlbum}
        onRemovePhoto={handleRemovePhotoClick}
      />
    </div>
  );
};
