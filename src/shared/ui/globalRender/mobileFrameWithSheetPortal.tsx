"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { MobileSheetPortalProvider } from "@/src/shared/context/mobileSheetPortalContext";

interface MobileFrameWithSheetPortalProps {
  children: React.ReactNode;
  bottom?: React.ReactNode;
  hasBottom: boolean;
}

/**
 * 홈 폰 프레임(375px) 내부에 시트 포탈 컨테이너를 두고,
 * 바텀시트가 이 영역 안에서만 뜨도록 ref를 context로 제공합니다.
 */
export function MobileFrameWithSheetPortal({
  children,
  bottom,
  hasBottom,
}: MobileFrameWithSheetPortalProps) {
  const portalRef = useRef<HTMLDivElement | null>(null);

  return (
    <MobileSheetPortalProvider portalRef={portalRef}>
      <div className="relative z-10 flex min-h-0 w-full max-w-[375px] flex-col bg-white shadow-2xl sm:rounded-xl sm:p-0 md:rounded-2xl lg:rounded-2xl [@media(min-width:375px)]:w-[375px]">
        <div className="pointer-events-none absolute inset-0 rounded-2xl" />

        <div
          className={cn(
            "no-scrollbar relative min-h-0 max-w-[375px] flex-1 overflow-y-auto rounded-t-2xl",
            !hasBottom && "rounded-b-2xl"
          )}
        >
          {children}
        </div>

        <div className={cn("shrink-0", !hasBottom && "hidden")}>{bottom}</div>

        <div
          id="mobile-overlay-root"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden sm:rounded-xl md:rounded-2xl lg:rounded-2xl"
        />

        {/* 바텀시트가 이 컨테이너에만 렌더되도록 포탈 타깃 */}
        <div
          ref={portalRef}
          className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-b-2xl sm:rounded-xl md:rounded-2xl"
          aria-hidden="true"
        />
      </div>
    </MobileSheetPortalProvider>
  );
}
