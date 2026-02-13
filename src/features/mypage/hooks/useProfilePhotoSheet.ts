"use client";

import { useRef, useState } from "react";
import { useProfile } from "./useProfile";

/**
 * 프로필 사진 변경 시트 + 앨범 선택/삭제 핸들러
 * useProfile 기반으로 시트 열기/닫기 및 파일 입력 처리
 */
export function useProfilePhotoSheet() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    handleImageUpload,
    handleRemovePhoto,
    profileImageUrl,
    isImageUploading,
    isLoading,
    handleProfileUpdate,
  } = useProfile();

  const handleCameraClick = () => setIsSheetOpen(true);

  const handleSelectFromAlbum = () => {
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
    handleRemovePhoto();
    setIsSheetOpen(false);
  };

  return {
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
  };
}
