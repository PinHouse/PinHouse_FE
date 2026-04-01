import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ChatEntryProps {
  initialChatOpen?: boolean;
}

export const useChatHooks = ({ initialChatOpen = false }) => {
  const [isChatOpen, setIsChatOpen] = useState(initialChatOpen);

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
