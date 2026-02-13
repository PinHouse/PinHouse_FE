"use client";

import { useRouter } from "next/navigation";
import { SearchEmpty } from "@/src/assets/icons/home/searchEmpty";
import { Button } from "@/src/shared/lib/headlessUi";
import { AnimatePresence, motion } from "framer-motion";

export interface ErrorStateProps {
  /** 에러 메시지 (<br /> 로 줄바꿈) */
  text?: string;
  /** 버튼 클릭 시 호출 (미전달 시 /home 이동) */
  onClick?: () => void;
  /** wrapper className */
  className?: string;
}

/**
 * 공용 에러 UI
 * ListingNoSearchResult 스타일: 아이콘 + 메시지 + home으로 돌아가기 버튼
 */
export const ErrorState = ({
  text = "에러가 발생했습니다.",
  onClick,
  className,
}: ErrorStateProps) => {
  const router = useRouter();
  const lines = text.split("<br />");
  const handleButtonClick = onClick ?? (() => router.push("/home"));

  return (
    <div
      className={
        className ??
        "flex h-full min-h-screen flex-col items-center justify-center px-5"
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <SearchEmpty />
          {lines.map((line, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "text-center text-[20px] font-bold text-text-primary"
                  : "text-center text-[12px] font-bold text-text-secondary"
              }
            >
              {line}
            </p>
          ))}
          <Button
            type="button"
            variant="solid"
            size="md"
            radius="md"
            theme="mainBlue"
            className="mt-4 w-full max-w-[200px]"
            onClick={handleButtonClick}
          >
            home으로 돌아가기
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
