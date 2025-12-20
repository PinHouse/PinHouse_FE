"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/src/shared/lib/headlessUi/button/button";
import { ChevronRight } from "lucide-react";
import { HelpButtonImg } from "@/src/assets/images/common/helpButtonImg";

export interface EligibilityHelpButtonProps {
  /** 버튼 텍스트 (길이에 따라 자동으로 2줄로 표시) */
  text: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 클래스명 */
  className?: string;
}

export const EligibilityHelpButton = ({ text, onClick, className }: EligibilityHelpButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="solid"
      theme="mainBlue"
      radius="lg"
      className={cn(
        "relative w-full justify-between rounded-[20px] py-3.5 pr-3.5 text-left",
        "min-h-[68px] pl-[69px]",
        "shadow-[0_4px_10px_-10px_rgba(48,111,255,0.3)]",
        "hover:bg-primary-blue-500",
        className
      )}
    >
      {/* 왼쪽 이미지 (버튼 위에 띄움) */}
      <div className="absolute -left-[3.5px] bottom-0">
        <HelpButtonImg />
      </div>

      <div className="relative z-10 flex w-full items-center gap-3">
        {/* 중앙 텍스트 */}
        <p className="line-clamp-2 flex-1 text-sm font-medium leading-[140%] text-white">{text}</p>

        {/* 오른쪽 화살표 */}
        <ChevronRight className="h-6 w-6 flex-shrink-0 text-white" />
      </div>
    </Button>
  );
};
