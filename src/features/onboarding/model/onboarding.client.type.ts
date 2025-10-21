import { IResponse } from "@/src/shared/types";

/**
 * TODO : 백엔드에 FacilityType 종류 문의
 */
export type FacilityType =
  | "도서관"
  | "공원"
  | "동물 관리시설"
  | "산책로"
  | "스포츠 시설"
  | "대형점포"
  | "파출소"
  | "병원"
  | "전시회"
  | "빨래방";

/**
 * 온보딩 완료 요청 타입
 */
export interface IOnboardingCompleteRequest {
  // 온보딩에서 수집한 사용자 선호도 데이터
  facilityTypes: FacilityType[];
}

/**
 * 온보딩 완료 응답 타입
 */
export interface IOnboardingCompleteResponse extends IResponse {
  data?: {
    userId: string;
    onboardingCompleted: boolean;
  };
}
