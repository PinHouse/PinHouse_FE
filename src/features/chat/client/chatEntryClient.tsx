"use client";
import { useChangeChat, useChatHooks } from "@/src/features/chat/hooks/useChatHooks";
import ChatWidgets from "@/src/features/chat/ui/chat";
import ChatSheet from "@/src/features/chat/ui/chatSheet";
import ChatPanel from "@/src/features/chat/ui/chatPanel";

interface ChatEntryProps {
  initialChatOpen?: boolean;
  initialQuery?: string;
}

export default function ChatEntryClient({
  initialChatOpen = false,
  initialQuery = "",
}: ChatEntryProps) {
  const { isChatOpen, openChat, closeChat } = useChatHooks({ initialChatOpen: initialChatOpen });
  const { query, hasQuery, handleChangeQuery, handleKeyDown, items, isPending, onSubmitQuery } =
    useChangeChat({ initialQuery });
  return (
    <>
      <ChatWidgets onClick={openChat} />
      <ChatSheet open={isChatOpen} onClose={closeChat}>
        <ChatPanel
          onClose={closeChat}
          items={items}
          isPending={isPending}
          query={query}
          hasQuery={hasQuery}
          onChangeQuery={handleChangeQuery}
          onSubmitQuery={handleKeyDown}
          onClickSubmit={onSubmitQuery}
        />
      </ChatSheet>
    </>
  );
}
