import { OAuthProviderType } from "@/src/shared/types";

export interface ProfileData {
  nickname: string;
  email: string;
  profileImageUrl?: string | null;
  provider?: OAuthProviderType;
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
