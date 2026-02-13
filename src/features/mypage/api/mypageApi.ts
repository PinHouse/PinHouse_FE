import { http } from "@/src/shared/api/http";
import {
  USER_MYPAGE_ENDPOINT,
  USER_EDIT_MY_INFO_ENDPOINT,
} from "@/src/shared/api";
import { MypageUserResponse } from "../model";

export const getMypageUser = () => {
  return http.get<MypageUserResponse>(USER_MYPAGE_ENDPOINT);
};

export interface PatchMypageUserBody {
  nickname?: string;
  imageUrl?: string;
}

/**
 * 마이페이지 개인정보 수정 (닉네임 / 프로필 이미지 URL)
 * PATCH /users/mypage
 */
export const patchMypageUser = (body: PatchMypageUserBody) => {
  return http.patch<MypageUserResponse, PatchMypageUserBody>(
    USER_EDIT_MY_INFO_ENDPOINT,
    body
  );
};
