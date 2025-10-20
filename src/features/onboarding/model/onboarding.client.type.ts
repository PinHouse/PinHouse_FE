import { IResponse } from "@/src/shared/types";

/**
 * 온보딩 완료 요청 타입
 */
export interface OnboardingCompleteRequest {
  // 온보딩에서 수집한 사용자 선호도 데이터
  preferences?: {
    diagnosis?: any; // 진단 단계에서 수집한 데이터
    compare?: any; // 비교 단계에서 수집한 데이터
    agent?: any; // 에이전트 단계에서 수집한 데이터
  };
}

/**
 * 온보딩 완료 응답 타입
 */
export interface OnboardingCompleteResponse extends IResponse {
  data?: {
    userId: string;
    onboardingCompleted: boolean;
  };
}
