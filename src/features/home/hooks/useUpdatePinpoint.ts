"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePinPoint } from "@/src/entities/pinpoint/api/pinpointApi";
import { pinPointKeys } from "@/src/shared/config/queryKeys";

export interface UpdatePinpointParams {
  id: string;
  name: string;
}

export function useUpdatePinpoint(options?: {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, name }: UpdatePinpointParams) =>
      updatePinPoint(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pinPointKeys.list() });
      queryClient.invalidateQueries({ queryKey: ["pinpointSettings"] });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });

  return {
    updatePinpoint: mutation.mutateAsync,
    updatePinpointMutate: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
