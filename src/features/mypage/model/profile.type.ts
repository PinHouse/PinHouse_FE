export interface ProfileData {
  nickname: string;
  email: string;
  profileImageUrl?: string | null;
  provider?: "naver" | "kakao" | "google";
  badgeCount?: number;
}

export interface ProfileUpdateRequest {
  nickname: string;
  profileImage?: File;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message?: string;
}
