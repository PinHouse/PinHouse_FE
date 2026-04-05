"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { LeftButton } from "@/src/assets/icons/button/leftButton";
import { ChatCounselor } from "@/src/assets/images/chat/chatCounselor";
import { cn } from "@/src/shared/lib/utils";
import type { ChatRenderItem } from "@/src/features/chat/model/chatResponse";

type ChatPanelProps = {
  onClose: () => void;
  items: ChatRenderItem[];
  isPending: boolean;
  query: string;
  hasQuery: boolean;
  onChangeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitQuery: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
};

export default function ChatPanel({
  onClose,
  items,
  isPending,
  query,
  hasQuery,
  onChangeQuery,
  onSubmitQuery,
  onClickSubmit,
}: ChatPanelProps) {
  const router = useRouter();

  const handleClickCta = (keyword?: string) => {
    const nextKeyword = keyword?.trim() ?? "";
    router.push(`/listings/search?query=${encodeURIComponent(nextKeyword)}`);
  };

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
        <div className="flex flex-col gap-6">
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
          <div className="flex flex-col gap-3">
            {items.map(item =>
              item.type === "message" && item.role === "user" ? (
                <div
                  key={item.id}
                  className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-[24px] rounded-br-md bg-[#4E80FF] px-4 py-3 text-[14px] leading-6 tracking-[-0.01em] text-white"
                >
                  {item.content}
                </div>
              ) : item.type === "message" ? (
                <div key={item.id} className="flex flex-col gap-2">
                  <div className={"flex items-center gap-2"}>
                    <ChatCounselor className={"h-8 w-8"} />
                    <p className={"text-sm text-text-secondary"}>답변을 준비했어요.</p>
                  </div>
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-[24px] rounded-bl-md bg-[#F3F6FF] px-4 py-3 text-[14px] leading-6 tracking-[-0.01em] text-[#191F28]"
                    )}
                  >
                    {item.content}
                  </div>
                </div>
              ) : (
                <div
                  key={item.id}
                  className="max-w-[85%] rounded-[28px] rounded-bl-md bg-white p-4 shadow-[0_8px_24px_rgba(47,84,255,0.08)]"
                >
                  <button
                    type="button"
                    onClick={() => handleClickCta(item.cta.keyword)}
                    className="w-full rounded-md bg-[#E5EBFF] px-2 py-2 text-sm font-bold tracking-[-0.02em] text-[#4E80FF]"
                  >
                    {item.cta.label}
                    <span className="ml-2 inline-block">{">"}</span>
                  </button>
                  {item.cta.keyword ? (
                    <p className="mt-3 text-[12px] leading-5 tracking-[-0.01em] text-[#8B95A1]">
                      {item.cta.keyword}
                    </p>
                  ) : null}
                </div>
              )
            )}
            {isPending && (
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-[chatDot_1.2s_ease-in-out_infinite] rounded-full bg-[#5B86FF]" />
                <span className="h-1.5 w-1.5 animate-[chatDot_1.2s_ease-in-out_0.2s_infinite] rounded-full bg-[#5B86FF]" />
                <span className="h-1.5 w-1.5 animate-[chatDot_1.2s_ease-in-out_0.4s_infinite] rounded-full bg-[#5B86FF]" />
                <span className="max-w-[85%] px-4 py-3 text-[14px] text-[#6B7684]">
                  질문을 분석하고 있어요.
                </span>
              </div>
            )}
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
              onClick={onClickSubmit}
              disabled={!hasQuery || isPending}
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
