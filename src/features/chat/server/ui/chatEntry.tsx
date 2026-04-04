import ChatEntryClient from "@/src/features/chat/client/chatEntryClient";

interface ChatEntryProps {
  initialChatOpen?: boolean;
  initialQuery?: string;
}

export default function ChatEntry({ initialChatOpen = false, initialQuery = "" }: ChatEntryProps) {
  return <ChatEntryClient initialChatOpen={initialChatOpen} initialQuery={initialQuery} />;
}
