import { motion } from "framer-motion";
import { CloseButton } from "@/src/assets/icons/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FILTER_TABS, FilterTabKey } from "../../../model";
import { getIndicatorLeft, getIndicatorWidth } from "../../../hooks/list/components/listingsHooks";

const ListingTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as FilterTabKey) || "region";

  const changeTab = (tab: FilterTabKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative border-b">
      <div className="relative flex gap-6 px-5 pt-3 text-sm font-medium">
        {FILTER_TABS.map(tab => (
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
      <motion.div
        layoutId="activeUnderline"
        className="absolute bottom-0 h-[2px] bg-button-primary"
        initial={false}
        animate={{
          left: `${getIndicatorLeft(currentTab)}px`,
          width: `${getIndicatorWidth(currentTab)}px`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export const FilterSheetHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div className="mx-auto mb-3 mt-2 h-1.5 w-12 rounded-full bg-gray-300" />

      <div className="flex items-center justify-between px-5 pb-2 pt-1">
        <h2 className="text-sm font-bold">공고 필터</h2>
        <button
          onClick={onClose}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full"
          aria-label="close filter sheet"
        >
          <CloseButton />
        </button>
      </div>

      <ListingTab />
    </>
  );
};
