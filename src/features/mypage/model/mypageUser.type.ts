import { IResponse, OAuthProviderType } from "@/src/shared/types";

/** GET /users/mypage 응답의 data 필드 */
export interface MypageUserData {
  userId: string;
  provider: OAuthProviderType;
  name: string;
  nickName: string;
  email: string;
  phoneNumber: string | null;
  role: string;
  gender: string;
  profileImage: string;
  birthday: string;
  facilityTypes: string[];
}

/** 공통 응답 확장 */
export interface MypageUserResponse extends IResponse<MypageUserData> {
    data: MypageUserData;
}
