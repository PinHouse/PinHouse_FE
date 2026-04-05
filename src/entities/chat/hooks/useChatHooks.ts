"use client";

import { useMutation } from "@tanstack/react-query";
import { postChatMessage } from "@/src/features/chat/server/bff/getChatMessageBff";

export function useSendChatMutation() {
  return useMutation({
    mutationFn: postChatMessage,
  });
}
