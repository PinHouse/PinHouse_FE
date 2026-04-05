import { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  createAssistantErrorMessage,
  createAssistantMessage,
  createUserMessage,
  toChatRequestMessages,
} from "@kyungchan3007/pinhouse-chat";
import type { ChatHistoryMessage } from "@kyungchan3007/pinhouse-chat";
import { useSendChatMutation } from "@/src/entities/chat/hooks/useChatHooks";
import type { ChatRenderItem } from "@/src/features/chat/model/chatResponse";

export const useChatHooks = ({ initialChatOpen = false }) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(initialChatOpen);

  const setChatQuery = (open: boolean) => {
    const url = new URL(window.location.href);
    if (open) url.searchParams.set("chat", "");
    else url.searchParams.delete("chat");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const openChat = () => {
    setIsChatOpen(true);
    setChatQuery(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setChatQuery(false);
  };

  return {
    openChat,
    closeChat,
    isChatOpen,
  };
};

const normalizeChatMessageId = (id: string) => {
  return id.startsWith("msg") ? id : `msg_${id}`;
};

export const useChangeChat = ({ initialQuery = "" }: { initialQuery: string }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([]);
  const [items, setItems] = useState<ChatRenderItem[]>([]);
  const hasQuery = query.trim().length > 0;
  const { mutate, isPending } = useSendChatMutation();

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (event.nativeEvent.isComposing) return;
    onSubmitQuery();
  };

  const onSubmitQuery = () => {
    const trimmed = query.trim();
    if (!trimmed || isPending) return;

    const url = new URL(window.location.href);
    url.searchParams.set("chat", trimmed);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);

    const userMessage = createUserMessage(sessionId, trimmed);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setItems(prev => [
      ...prev,
      {
        id: userMessage.id,
        type: "message",
        role: "user",
        content: userMessage.content,
      },
    ]);
    setQuery("");

    const requestMessages = toChatRequestMessages(nextMessages).map(message => ({
      ...message,
      id: normalizeChatMessageId(message.id),
    }));

    mutate(
      {
        messages: requestMessages,
      },
      {
        onSuccess: response => {
          const nextItems: ChatRenderItem[] = [];

          const assistantSummary = createAssistantMessage(sessionId, response.summary);
          nextItems.push({
            id: assistantSummary.id,
            type: "message",
            role: "assistant",
            content: assistantSummary.content,
          });

          const assistantMessages = [assistantSummary];

          if (response.followUpQuestion) {
            const followUpMessage = createAssistantMessage(sessionId, response.followUpQuestion);
            assistantMessages.push(followUpMessage);
            nextItems.push({
              id: followUpMessage.id,
              type: "message",
              role: "assistant",
              content: followUpMessage.content,
            });
          }

          if (response.cta) {
            nextItems.push({
              id: `cta_${Date.now().toString()}`,
              type: "cta",
              cta: response.cta,
            });
          }

          setMessages(prev => [...prev, ...assistantMessages]);
          setItems(prev => [...prev, ...nextItems]);
        },
        onError: error => {
          console.error(error);
          const errorMessage = createAssistantErrorMessage(sessionId);
          setMessages(prev => [...prev, errorMessage]);
          setItems(prev => [
            ...prev,
            {
              id: errorMessage.id,
              type: "message",
              role: "assistant",
              content: errorMessage.content,
            },
          ]);
        },
      }
    );
  };

  return {
    query,
    items,
    hasQuery,
    isPending,
    handleChangeQuery,
    handleKeyDown,
    onSubmitQuery,
  };
};
