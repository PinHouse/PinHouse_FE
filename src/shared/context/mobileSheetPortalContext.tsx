"use client";

import { createContext, useContext, useRef, type RefObject } from "react";

const MobileSheetPortalContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useMobileSheetPortal(): RefObject<HTMLDivElement | null> | null {
  return useContext(MobileSheetPortalContext);
}

/** 폰 프레임 내부 시트 포탈 ref를 제공 (globalRender에서 사용) */
export function MobileSheetPortalProvider({
  children,
  portalRef,
}: {
  children: React.ReactNode;
  portalRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <MobileSheetPortalContext.Provider value={portalRef}>
      {children}
    </MobileSheetPortalContext.Provider>
  );
}
