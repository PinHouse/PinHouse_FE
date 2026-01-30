import { USER_SIGNUP_ENDPOINT } from "@/src/shared/api";
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
export const completeOnboarding = async (data: IOnboardingCompleteRequest) => {
  try {
    // zustand store에서 tempUserId 가져오기
    const { tempUserId } = useOAuthStore.getState();

    // GET 파라미터 추가 (zustand store 값 사용)
    let urlWithParams = USER_SIGNUP_ENDPOINT;
    if (tempUserId) {
      urlWithParams += `?tempKey=${encodeURIComponent(tempUserId)}`;
    }
    const response = await http.post<IOnboardingCompleteResponse, IOnboardingCompleteRequest>(
      urlWithParams,
      data
    );
    console.log("response", response);
    
    // Mock 모드일 경우 쿠키는 MSW 핸들러에서 설정됩니다.
    return response.success;
  } catch (error) {
    console.error("온보딩 완료 요청 실패:", error);
    return false;
  }
};
