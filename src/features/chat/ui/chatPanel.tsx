"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { LeftButton } from "@/src/assets/icons/button/leftButton";
import { ChatCounselor } from "@/src/assets/images/chat/chatCounselor";

type ChatPanelProps = {
  onClose: () => void;
  query: string;
  hasQuery: boolean;
  onChangeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitQuery: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export default function ChatPanel({
  onClose,
  query,
  hasQuery,
  onChangeQuery,
  onSubmitQuery,
}: ChatPanelProps) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-white">
      <header className="relative flex items-center justify-center px-5 pb-4 pt-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B8BED3]"
          aria-label="채팅 닫기"
        >
          <LeftButton className="h-5 w-5" />
        </button>
        <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.02em] text-text-primary">
          AI 상담사 핀
        </h2>
      </header>
      <div className="flex-1 overflow-y-auto px-5 pb-6 pt-8">
        <div className="flex flex-col items-start gap-3">
          <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center">
            <ChatCounselor />
          </div>
          <div className="pt-1 text-[18px] leading-[1.5] tracking-[-0.02em] text-text-primary">
            <p>안녕하세요!</p>
            <p>AI 상담사 핀이에요,</p>
            <p>궁금한 게 있으면 물어보세요.</p>
          </div>
        </div>
      </div>
      <div className="px-5 pb-4 pt-3">
        <div className="rounded-[999px] border border-[#4E80FF] bg-white px-4 py-3 shadow-[0_4px_10px_rgba(48,111,255,0.08)]">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={query}
              placeholder="궁금한 질문이 있으면 물어보세요."
              className="flex-1 bg-transparent text-[14px] text-[#191F28] outline-none placeholder:text-[#B8BED3]"
              onChange={onChangeQuery}
              onKeyDown={onSubmitQuery}
            />
            <button
              type="button"
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                hasQuery ? "bg-[#4E80FF] text-white" : "bg-[#D9DEEC] text-white"
              }`}
              aria-label="메시지 전송"
            >
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] leading-4 tracking-[-0.01em] text-[#B8BED3]">
          AI 학습 데이터가 개입될 답변으로, 실제와 차이가 있을 수 있습니다.
        </p>
      </div>
    </section>
  );
}
