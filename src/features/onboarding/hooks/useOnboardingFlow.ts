"use client";
import { useMutation } from "@tanstack/react-query";
import { IOnboardingCompleteRequest } from "@/src/features/onboarding/model";
import { completeOnboarding } from "@/src/features/onboarding/api";
import { requestSetPinpoint } from "@/src/entities/address/api";

interface IPinpointData {
  address: string;
  name: string;
  first: boolean;
}

interface IUseOnboardingFlowParams {
  pinpointData?: IPinpointData;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * 온보딩 플로우를 관리하는 커스텀 훅
 */
export const useOnboardingFlow = ({
  pinpointData,
  onSuccess,
  onError,
}: IUseOnboardingFlowParams = {}) => {
  const mutation = useMutation({
    mutationFn: (data: IOnboardingCompleteRequest) => completeOnboarding(data),
    onSuccess: async success => {
      if (success) {
        // 핀포인트 설정은 onSuccess에서 처리 (쿠키 설정 후)
        if (pinpointData) {
          try {
            await requestSetPinpoint(pinpointData);
          } catch (error) {
            console.error("핀포인트 설정 실패:", error);
          }
        }
        onSuccess?.();
      } else {
        console.error("온보딩 완료 실패");
      }
    },
    onError: error => {
      console.error("온보딩 완료 실패:", error);
      onError?.(error);
    },
  });

  return {
    onCompleteOnboarding: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
