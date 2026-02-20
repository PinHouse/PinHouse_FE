"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { usePinhouseRouter } from "@/src/features/home/hooks/hooks";
import { PinpointSelectedButton } from "@/src/features/home/ui/components/components/pinpointSelectedButton";
import { usePortalTarget } from "@/src/shared/hooks/usePortalTarget";
import { useScrollLock } from "@/src/shared/hooks/useScrollLock";
import { useHomeSheetStore } from "../../model/homeStore";
import { MaxTimeSliderBox } from "./maxTime";
import { PinpointRowBox } from "./pinpointRowBoxs";
import type { ReadonlyURLSearchParams } from "next/navigation";

export const HomeSheet = () => {
  const open = useHomeSheetStore(s => s.open);
  const searchParams = useSearchParams();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const portalRoot = usePortalTarget("mobile-overlay-root");

  const { replaceRouter, handleSetPinpoint, mode } = usePinhouseRouter(
    searchParams as ReadonlyURLSearchParams
  );

  useScrollLock({ locked: open, anchorRef });

  const content = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="pointer-events-auto absolute inset-0 bg-black/40"
            onClick={replaceRouter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="pointer-events-auto absolute bottom-0 left-0 right-0 flex h-[55vh] flex-col rounded-t-2xl bg-white p-5 shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{mode?.label}</h2>
              <button onClick={replaceRouter}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <motion.div
                key={mode?.key}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="z-11 flex h-full flex-col justify-between"
              >
                {mode?.key === "pinpoints" && <PinpointRowBox />}
                {mode?.key === "maxTime" && <MaxTimeSliderBox />}
                {!mode ? null : (
                  <PinpointSelectedButton
                    mode={mode?.key}
                    handleSetPinpoint={handleSetPinpoint}
                    replaceRouter={replaceRouter}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <span ref={anchorRef} className="hidden" />
      {portalRoot ? createPortal(content, portalRoot) : content}
    </>
  );
};
