"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useDetailFilterSheetStore } from "@/src/features/listings/model";
import { useScrollLock } from "@/src/shared/hooks/useScrollLock";
import { usePortalTarget } from "@/src/shared/hooks/usePortalTarget";
import { DetailFilterTab } from "./DetailFilterTab";
import { parseDetailSection } from "@/src/features/listings/model";
import { DistanceFilter } from "./DistanceFilter";
import { CostFilter } from "./components/CostFilter";
import { RegionFilter } from "./components/regionFilter";
import { AreaFilter } from "./components/areaFilter";
import { ListingCardDetailOut } from "@/src/features/listings/ui/listingsCardDetail/button/button";
import { useDetailFilterResultButton } from "@/src/features/listings/ui/listingsCardDetail/hooks/hooks";

export const DetailFilterSheet = () => {
  const open = useDetailFilterSheetStore(s => s.open);
  const searchParams = useSearchParams();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const portalRoot = usePortalTarget("mobile-overlay-root");
  const section = parseDetailSection(searchParams);
  useScrollLock({ locked: open, anchorRef });
  const { filteredCount, handleCloseSheet } = useDetailFilterResultButton();

  const content = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="pointer-events-auto absolute inset-0 bg-black/40"
            onClick={e => {
              e.stopPropagation();
              handleCloseSheet();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="pointer-events-auto absolute bottom-0 left-0 right-0 flex h-[70dvh] flex-col rounded-t-2xl bg-white shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            onClick={e => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="mx-auto mb-3 mt-2 h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="flex items-center justify-between px-5 pb-2">
              <h2 className="text-sm font-bold">단지 필터</h2>
              <button onClick={handleCloseSheet}>✕</button>
            </div>

            <DetailFilterTab />

            <motion.div
              key={section}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pt-5">
                {section === "distance" && <DistanceFilter />}
                {section === "cost" && <CostFilter />}
                {section === "region" && <RegionFilter />}
                {section === "area" && <AreaFilter />}
                {/* {section === "around" && <AroundFilter />} */}
              </div>
              <div className="px-5 pb-5 pt-5">
                <ListingCardDetailOut
                  handleCloseSheet={handleCloseSheet}
                  filteredCount={filteredCount}
                />
              </div>
            </motion.div>
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
