import { DETAIL_FILTERS, DetailFilterTabKey } from "@/src/features/listings/model";
import { useRouter, useSearchParams } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { getIndicatorLeft, getIndicatorWidth } from "@/src/features/listings/hooks/listingsHooks";

export const DetailFilterTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("section") as DetailFilterTabKey) || "region";

  const changeTab = (tab: DetailFilterTabKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative border-b">
      <div className="relative flex gap-6 px-5 pt-3 text-sm font-medium">
        {DETAIL_FILTERS.map(tab => (
          <button
            key={tab.key}
            onClick={() => changeTab(tab.key)}
            className={
              currentTab === tab.key ? "p-1 font-bold text-text-primary" : "p-1 text-gray-500"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* <motion.div
        layoutId="activeUnderline"
        className="absolute bottom-0 h-[2px] bg-button-primary"
        initial={false}
        animate={{
          left: `${getIndicatorLeft(currentTab)}px`,
          width: `${getIndicatorWidth(currentTab)}px`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      /> */}
    </div>
  );
};
