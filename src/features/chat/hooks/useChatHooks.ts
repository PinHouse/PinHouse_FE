import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useChatHooks = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isChatOpen = searchParams.has("chat");

  const chatPanelMov = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("chat", "");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const chatPanelClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("chat");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return {
    chatPanelClose,
    chatPanelMov,
    isChatOpen,
  };
};
