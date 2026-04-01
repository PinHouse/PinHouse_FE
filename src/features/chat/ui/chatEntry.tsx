"use client";

import { useChatHooks } from "@/src/features/chat/hooks/useChatHooks";
import ChatWidgets from "./chat";
import ChatPanel from "./chatPanel";
import ChatSheet from "./chatSheet";

interface ChatEntryProps {
  initialChatOpen?: boolean;
}

export default function ChatEntry({ initialChatOpen = false }: ChatEntryProps) {
  const { isChatOpen, openChat, closeChat } = useChatHooks({ initialChatOpen: initialChatOpen });
  return (
    <>
      <ChatWidgets onClick={openChat} />
      <ChatSheet open={isChatOpen} onClose={closeChat}>
        <ChatPanel onClose={closeChat} />
      </ChatSheet>
    </>
  );
}
