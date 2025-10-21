import { ONBOARDING_COMPLETE_ENDPOINT } from "@/src/shared/api";
import { http } from "@/src/shared/api/http";
import {
  IOnboardingCompleteRequest,
  IOnboardingCompleteResponse,
} from "@/src/features/onboarding/model";
import { useOAuthStore } from "@/src/features/login/model/authStore";
/**
 * 온보딩 완료 API 호출 함수
 * @param data 온보딩 완료 요청 데이터
 */
export const completeOnboarding = async (data?: IOnboardingCompleteRequest) => {
  try {
    // zustand store에서 tempUserId 가져오기
    const { tempUserId } = useOAuthStore.getState();

    // GET 파라미터 추가 (zustand store 값 사용)
    let urlWithParams = ONBOARDING_COMPLETE_ENDPOINT;
    if (tempUserId) {
      urlWithParams += `?tempKey=${encodeURIComponent(tempUserId)}`;
    }
    const response = await http.post<IOnboardingCompleteResponse, IOnboardingCompleteRequest>(
      urlWithParams,
      data
    );
    return response;
  } catch (error) {
    console.error("온보딩 완료 요청 실패:", error);
    throw error;
  }
};
