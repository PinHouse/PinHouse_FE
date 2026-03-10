"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePinPoint } from "@/src/entities/pinpoint/api/pinpointApi";
import { pinPointKeys } from "@/src/shared/config/queryKeys";

export function useDeletePinpoint(options?: { onSuccess?: () => void; onError?: (err: unknown) => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deletePinPoint(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pinPointKeys.list() });
      queryClient.invalidateQueries({ queryKey: ["pinpointSettings"] });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });

  return {
    deletePinpoint: mutation.mutateAsync,
    deletePinpointMutate: mutation.mutate,
    isDeleting: mutation.isPending,
  };
}
