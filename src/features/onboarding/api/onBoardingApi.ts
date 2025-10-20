import { ONBOARDING_COMPLETE_ENDPOINT } from "@/src/shared/api";
import { http } from "@/src/shared/api/http";
import {
  OnboardingCompleteRequest,
  OnboardingCompleteResponse,
} from "@/src/features/onboarding/model";
/**
 * 온보딩 완료 API 호출 함수
 * @param data 온보딩 완료 요청 데이터
 */
export const completeOnboarding = async (data?: OnboardingCompleteRequest) => {
  try {
    const response = await http.post<OnboardingCompleteResponse, OnboardingCompleteRequest>(
      ONBOARDING_COMPLETE_ENDPOINT,
      data
    );
    return response;
  } catch (error) {
    console.error("온보딩 완료 요청 실패:", error);
    throw error;
  }
};
