import { ChangeEvent, KeyboardEvent, useState } from "react";

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

export const useChangeChat = ({ initialQuery = "" }: { initialQuery: string }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const hasQuery = query.trim().length > 0;

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (event.nativeEvent.isComposing) return;
    onSubmitQuery(query);
  };

  const onSubmitQuery = (query: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("chat", query);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  return {
    query,
    handleChangeQuery,
    handleKeyDown,
    hasQuery,
  };
};
