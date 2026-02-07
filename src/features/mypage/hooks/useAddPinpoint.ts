"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestSetPinpoint } from "@/src/entities/address/api";

export interface IPinpointData {
  address: string;
  name: string;
  first: boolean;
}

interface IUseAddPinpointParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * 핀포인트만 추가하는 커스텀 훅 (마이페이지 등에서 사용)
 */
export const useAddPinpoint = ({ onSuccess, onError }: IUseAddPinpointParams = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPinpointData) => requestSetPinpoint(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinpointSettings"] });
      onSuccess?.();

    },
    onError: error => {
      console.error("핀포인트 추가 실패:", error);
      onError?.(error);
    },
  });

  return {
    addPinpoint: mutation.mutateAsync,
    addPinpointMutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
