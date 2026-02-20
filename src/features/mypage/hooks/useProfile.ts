import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mypageKeys } from "@/src/shared/config/queryKeys";
import { getPresignedUrl } from "../api/profileImageApi";
import { patchMypageUser } from "../api/mypageApi";

const MAX_PROFILE_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

function getFileName(file: File): string {
  const base = file.name ? file.name.replace(/\s+/g, "-") : "profile";
  const ext = file.type === "image/png" ? "png" : "jpg";
  return base.endsWith(`.${ext}`) ? base : `${base.split(".")[0] || "profile"}.${ext}`;
}

export const useProfile = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }
    if (file.size > MAX_PROFILE_IMAGE_SIZE) {
      toast.error("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    setIsImageUploading(true);
    try {
      // 1. presigned URL 요청
      const fileName = getFileName(file);
      const contentType = file.type || "image/jpeg";
      const { data } = await getPresignedUrl({ fileName, contentType });
      const presignedUrl = data?.presignedUrl;
      const imageUrl = data?.imageUrl;
      if (!presignedUrl || !imageUrl) {
        toast.error("이미지 업로드 준비에 실패했어요. 잠시 후 다시 시도해주세요.");
        return;
      }

      // 2. presigned URL로 PUT 업로드
      const putRes = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": contentType },
      });
      if (!putRes.ok) {
        toast.error("이미지 업로드에 실패했어요. 잠시 후 다시 시도해주세요.");
        return;
      }

      // 3. PATCH로 서버에 반영
      await patchMypageUser({ imageUrl });

      queryClient.invalidateQueries({ queryKey: mypageKeys.user() });

      // 3단계 모두 성공 시에만 이미지 반영
      setProfileImage(file);
      setProfileImageUrl(imageUrl);
    } catch (err) {
      console.error("프로필 이미지 업로드 실패:", err);
      toast.error("프로필 이미지 변경에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsImageUploading(false);
    }
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

  const updateMypageProfile = async (payload: {
    nickname?: string;
    imageUrl?: string;
  }) => {
    if (!payload.nickname && !payload.imageUrl) return;
    setIsLoading(true);
    try {
      await patchMypageUser({
        ...(payload.nickname !== undefined && { nickname: payload.nickname }),
        ...(payload.imageUrl !== undefined && { imageUrl: payload.imageUrl }),
      });
      queryClient.invalidateQueries({ queryKey: mypageKeys.user() });
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (nickname: string) => {
    await updateMypageProfile({
      nickname,
      ...(profileImageUrl && { imageUrl: profileImageUrl }),
    });
  };

  return {
    profileImage,
    profileImageUrl,
    isLoading,
    isImageUploading,
    handleImageUpload,
    handleRemovePhoto,
    handleProfileUpdate,
    updateMypageProfile,
  };
};
