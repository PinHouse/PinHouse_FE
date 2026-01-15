import { useState } from "react";
import { useRouter } from "next/navigation";

export const useProfile = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  // TODO: 프로필 이미지 URL은 ReactQuery로 조회한 API 응답을 사용하도록 교체

  const handleImageUpload = (file: File) => {
    // 파일 유효성 검사
    if (!file.type.startsWith("image/")) {
      console.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 제한 (예: 5MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setProfileImage(file);

    // 미리보기 URL 생성
    const url = URL.createObjectURL(file);
    setProfileImageUrl(prevUrl => {
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }
      return url;
    });

    // TODO: 선택된 파일을 백엔드에 업로드하는 API 호출로 교체
    // ex: await uploadProfileImage(file);
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    setProfileImageUrl(prevUrl => {
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }
      return null;
    });

    // TODO: 백엔드에 업로드된 프로필 사진 삭제 API 호출로 교체
    // ex: await removeProfileImage();
  };

  const handleProfileUpdate = async (nickname: string) => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출
      // await updateProfile({ nickname, profileImage });
      console.log("프로필 업데이트:", { nickname, profileImage });
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileImage,
    profileImageUrl,
    isLoading,
    handleImageUpload,
    handleRemovePhoto,
    handleProfileUpdate,
  };
};
