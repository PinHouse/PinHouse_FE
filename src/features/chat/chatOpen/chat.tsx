import { ChatIcon } from "@/src/assets/images/chat/chatIcon";

interface ChatWidgetsProps {
  onClick: () => void;
}

export default function ChatWidgets({ onClick }: ChatWidgetsProps) {
  return (
    <div className="z-60 pointer-events-none fixed bottom-[180px] w-full max-w-[375px] px-4">
      <button
        type="button"
        onClick={onClick}
        className="pointer-events-auto ml-auto flex h-[72px] w-[70px] items-center justify-center transition-transform duration-300 hover:-translate-y-1"
        aria-label="챗봇 열기"
      >
        <ChatIcon className="h-[72px] w-[70px]" />
      </button>
    </div>
  );
}
