"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMobileSheetPortal } from "@/src/shared/context/mobileSheetPortalContext";
import { Button } from "@/src/shared/lib/headlessUi/button/button";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetTitle,
} from "@/src/shared/lib/headlessUi";
import { ChevronRight } from "lucide-react";
import { InfoButoonImg } from "@/src/assets/images/eligibility/InfoButoonImg";

/** 바텀시트에 표시할 콘텐츠 타입 (타입별 제목·이미지) */
export type EligibilityInfoSheetContentType = "asset" | "car" | "house";

const INFO_SHEET_CONFIG: Record<
  EligibilityInfoSheetContentType,
  { title: string; imageSrc: string }
> = {
  asset: {
    title: "총자산 계산법 한눈에 보기",
    imageSrc: "/info/info_asset.png",
  },
  car: {
    title: "자동차 기준 한눈에 보기",
    imageSrc: "/info/info_car.png",
  },
  house: {
    title: "세대주,세대원 기준 한눈에 보기",
    imageSrc: "/info/info_house.png",
  },
};

export interface EligibilityInfoButtonWithSheetProps {
  /** 버튼 텍스트 */
  text: string;
  /** 바텀시트 콘텐츠 타입. 있으면 클릭 시 시트 오픈, 없으면 onClick 사용 */
  sheetContentType?: EligibilityInfoSheetContentType;
  /** 시트를 쓰지 않을 때 클릭 핸들러 (action: home/back 또는 커스텀) */
  onClick?: () => void;
  /** 추가 클래스명 */
  className?: string;
}

export const EligibilityInfoButtonWithSheet = ({
  text,
  sheetContentType,
  onClick,
  className,
}: EligibilityInfoButtonWithSheetProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const portalRef = useMobileSheetPortal();
  const container = portalRef?.current ?? undefined;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sheetOpen) {
      scrollRef.current?.scrollTo(0, 0);
    }
  }, [sheetOpen]);

  const handleClick = () => {
    if (sheetContentType) {
      setSheetOpen(true);
    } else {
      onClick?.();
    }
  };

  const config = sheetContentType ? INFO_SHEET_CONFIG[sheetContentType] : null;

  return (
    <>
      <Button
        onClick={handleClick}
        variant="solid"
        theme="mainBlue"
        radius="lg"
        className={cn(
          "relative w-full justify-between rounded-[20px] py-3.5 pr-3.5 text-left",
          "min-h-[48px] pl-[73px]",
          "shadow-[0_4px_10px_-10px_rgba(48,111,255,0.3)]",
          "bg-greyscale-grey-800 hover:bg-greyscale-grey-800",
          className
        )}
      >
        <div className="absolute -left-[3.5px] bottom-0">
          <InfoButoonImg />
        </div>
        <div className="relative z-10 flex w-full items-center gap-3">
          <p className="line-clamp-2 flex-1 text-sm font-semibold leading-[140%] text-white">
            {text}
          </p>
          <ChevronRight className="h-6 w-6 flex-shrink-0 text-white" />
        </div>
      </Button>

      {config && (
        <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <BottomSheetContent
            className="flex h-[80vh] max-h-[85vh] flex-col overflow-hidden p-0 gap-5 "
            showOverlay={true}
            container={container}
          >
            <BottomSheetTitle className="sr-only ">{config.title}</BottomSheetTitle>
            <div
              ref={scrollRef}
              className="no-scrollbar flex h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden px-6 pt-6 pb-4"
              role="region"
              aria-label={config.title}
            >
              <h2 className="text-center font-medium text-base text-greyscale-grey-500 leading-[140%] shrink-0">
                {config.title}
              </h2>
              <div className="relative w-full rounded-lg bg-greyscale-grey-50">
                <Image
                  src={config.imageSrc}
                  alt={config.title}
                  width={800}
                  height={600}
                  className="h-auto w-full object-contain"
                  unoptimized
                />
              </div>

            </div>
            <div className="shrink-0 px-6 pb-6">
              <button
                type="button"
                className="h-12 w-full rounded-xl bg-greyscale-grey-800 text-base font-semibold text-white"
                onClick={() => setSheetOpen(false)}
              >
                닫기
              </button>
            </div>
          </BottomSheetContent>
        </BottomSheet>
      )}
    </>
  );
};
