import { IResponse } from "@/src/shared/types";

/**
 * TODO : 백엔드에 FacilityType 종류 문의
 */
export type FacilityType = "도서관" | "산책로" | "파출소";

export type OnBoardingPinPoint = {
  address: string;
  name: string;
  first: boolean;
};

/**
 * 온보딩 완료 요청 타입
 */
export interface IOnboardingCompleteRequest {
  // 온보딩에서 수집한 사용자 선호도 데이터
  facilityTypes: FacilityType[];
  pinpoint: OnBoardingPinPoint;
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
