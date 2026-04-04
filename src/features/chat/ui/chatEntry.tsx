"use client";

import { useChangeChat, useChatHooks } from "@/src/features/chat/hooks/useChatHooks";
import ChatWidgets from "./chat";
import ChatPanel from "./chatPanel";
import ChatSheet from "./chatSheet";

interface ChatEntryProps {
  initialChatOpen?: boolean;
}

export default function ChatEntry({ initialChatOpen = false }: ChatEntryProps) {
  const { isChatOpen, openChat, closeChat } = useChatHooks({ initialChatOpen: initialChatOpen });
  const { query, hasQuery, handleChangeQuery, handleKeyDown } = useChangeChat();
  return (
    <>
      <ChatWidgets onClick={openChat} />
      <ChatSheet open={isChatOpen} onClose={closeChat}>
        <ChatPanel
          onClose={closeChat}
          query={query}
          hasQuery={hasQuery}
          onChangeQuery={handleChangeQuery}
          onSubmitQuery={handleKeyDown}
        />
      </ChatSheet>
    </>
  );
}
