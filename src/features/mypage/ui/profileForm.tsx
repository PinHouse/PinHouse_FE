"use client";

import { useEffect, useRef } from "react";
import type { MypageUserData } from "../model";
import { useProfileNickname } from "../hooks/useProfileNickname";
import { useProfilePhotoSheet } from "../hooks/useProfilePhotoSheet";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";
import { ProfileAvatar } from "./profileAvatar";
import { ProfileNicknameInput } from "./profileNicknameInput";
import { ProfileLoginInfo } from "./profileLoginInfo";
import { ProfilePhotoBottomSheet } from "./profilePhotoBottomSheet";

const NICKNAME_SAVE_DEBOUNCE_MS = 500;

export interface ProfileFormProps {
  /** 마이페이지 유저 데이터 (없으면 빈 값으로 표시) */
  user?: MypageUserData | null;
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const nicknameFromUser = user?.nickName ?? "";
  const email = user?.email ?? "";
  const imageUrlFromUser = user?.profileImage?.trim() || null;
  const provider = user?.provider ?? "NAVER";

  const [nickname, setNickname] = useProfileNickname(nicknameFromUser);
  const debouncedNickname = useDebounce(nickname, NICKNAME_SAVE_DEBOUNCE_MS);
  const lastSyncedNicknameRef = useRef(nicknameFromUser);

  const {
    isSheetOpen,
    setIsSheetOpen,
    fileInputRef,
    profileImageUrl,
    isImageUploading,
    isLoading,
    handleCameraClick,
    handleSelectFromAlbum,
    handleFileChange,
    handleRemovePhotoClick,
    handleProfileUpdate,
  } = useProfilePhotoSheet();

  const handleProfileUpdateRef = useRef(handleProfileUpdate);
  handleProfileUpdateRef.current = handleProfileUpdate;

  // 서버에서 내려온 값과 동기화
  useEffect(() => {
    lastSyncedNicknameRef.current = nicknameFromUser;
  }, [nicknameFromUser]);

  // 수정 시 디바운스 후, 이전 값과 다를 때만 PATCH
  useEffect(() => {
    const current = debouncedNickname.trim();
    const lastSynced = lastSyncedNicknameRef.current.trim();
    if (current === lastSynced) return;
    lastSyncedNicknameRef.current = debouncedNickname;
    handleProfileUpdateRef.current(debouncedNickname);
  }, [debouncedNickname]);

  return (
    <form
      aria-label="프로필 수정"
      onSubmit={e => e.preventDefault()}
      className="flex flex-col gap-8"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-hidden
      />
      {/* 프로필 아바타 */}
      <div className="flex justify-center">
        <ProfileAvatar
          imageUrl={profileImageUrl ?? imageUrlFromUser}
          isUploading={isImageUploading}
          onCameraClick={handleCameraClick}
        />
      </div>

      {/* 닉네임 입력 */}
      <ProfileNicknameInput
        value={nickname}
        onChange={setNickname}
        isSaving={isLoading}
        maxLength={10}
      />
      <div className="mx-[-20px] h-[9px] border-t border-greyscale-grey-50 bg-greyscale-grey-25" />
      {/* 로그인 정보 */}
      <ProfileLoginInfo email={email} provider={provider} />

      <ProfilePhotoBottomSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSelectFromAlbum={handleSelectFromAlbum}
        onRemovePhoto={handleRemovePhotoClick}
      />
    </form>
  );
};
