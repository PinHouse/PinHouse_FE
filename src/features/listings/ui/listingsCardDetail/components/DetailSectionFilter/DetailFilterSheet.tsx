"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useDetailFilterSheetStore } from "@/src/features/listings/model";
import { DetailFilterTab } from "./DetailFilterTab";
import { parseDetailSection } from "@/src/features/listings/model";
import { DistanceFilter } from "./DistanceFilter";
import { CostFilter } from "./components/CostFilter";
import { RegionFilter } from "./components/regionFilter";

export const DetailFilterSheet = () => {
  const open = useDetailFilterSheetStore(s => s.open);
  const closeSheet = useDetailFilterSheetStore(s => s.closeSheet);
  const searchParams = useSearchParams();
  const section = parseDetailSection(searchParams);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40"
            onClick={closeSheet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 flex h-[85vh] flex-col rounded-t-2xl bg-white shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="mx-auto mb-3 mt-2 h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="flex items-center justify-between px-5 pb-2">
              <h2 className="text-sm font-bold">단지 필터</h2>
              <button onClick={closeSheet}>✕</button>
            </div>

            {/* 전체 필터 탭 (항상 표시) */}
            <DetailFilterTab />

            {/* section별 콘텐츠 */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <motion.div
                key={section}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-full"
              >
                {section === "distance" && <DistanceFilter />}
                {section === "cost" && <CostFilter />}
                {section === "region" && <RegionFilter />}

                {/* {section === "area" && <AreaFilter />}
              {section === "around" && <AroundFilter />} */}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
