"use client";

import { useChatHooks } from "@/src/features/chat/hooks/useChatHooks";
import ChatWidgets from "./chat";
import ChatPanel from "./chatPanel";
import ChatSheet from "./chatSheet";

export default function ChatEntry() {
  const { isChatOpen, chatPanelClose, chatPanelMov } = useChatHooks();

  return (
    <>
      <ChatWidgets onClick={chatPanelMov} />
      <ChatSheet open={isChatOpen} onClose={chatPanelClose}>
        <ChatPanel onClose={chatPanelClose} />
      </ChatSheet>
    </>
  );
}
