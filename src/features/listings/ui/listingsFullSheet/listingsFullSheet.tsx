"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterSheetStore, useListingsFilterStore } from "../../model/listingsStore";
import { FILTER_TABS, FilterTabKey, TAB_CONFIG } from "../../model";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CloseButton } from "@/src/assets/icons/button";
import { useRouter, useSearchParams } from "next/navigation";
import { getIndicatorLeft, getIndicatorWidth } from "../../hooks/listingsHooks";
import { useListingListInfiniteQuery } from "@/src/entities/listings/hooks/useListingHooks";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";

export const ListingFilterPartialSheet = () => {
  const open = useFilterSheetStore(s => s.open);
  const closeSheet = useFilterSheetStore(s => s.closeSheet);
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const { data } = useListingListInfiniteQuery();
  const prevTotalRef = useRef<number | null>(null);
  const newTotal = data?.pages?.[0]?.totalCount;
  if (newTotal !== undefined && newTotal !== null) {
    prevTotalRef.current = newTotal;
  }

  const displayTotal = prevTotalRef.current;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    setIsAtBottom(atBottom);
  };

  useEffect(() => {
    if (open) {
      handleScroll();
    }
  }, [open]);

  const resetListingsQuery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tab");
    const query = params.toString();
    router.replace(query ? `/listings?${query}` : "/listings", { scroll: false });
  };

  const handleCloseSheet = () => {
    closeSheet();
    resetListingsQuery();
  };

  return (
    <AnimatePresence>
      {open && (
        <FilterSheetContainer onDismiss={handleCloseSheet}>
          <FilterSheetHeader onClose={handleCloseSheet} />
          <FilterSheetContent scrollRef={scrollRef} onScroll={handleScroll} isAtBottom={isAtBottom}>
            <div className="space-y-6">
              <UseCheckBox />
              <ListingSheet />
            </div>
          </FilterSheetContent>
          <FilterSheetFooter total={displayTotal} onApply={handleCloseSheet} />
        </FilterSheetContainer>
      )}
    </AnimatePresence>
  );
};

const ListingSheet = () => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as FilterTabKey) || "region";
  const tabConfig = currentTab ? TAB_CONFIG[currentTab] : null;

  const regionType = useListingsFilterStore(s => s.regionType);
  const rentalTypes = useListingsFilterStore(s => s.rentalTypes);
  const supplyTypes = useListingsFilterStore(s => s.supplyTypes);
  const houseTypes = useListingsFilterStore(s => s.houseTypes);

  const toggleRegion = useListingsFilterStore(s => s.toggleRegionType);
  const toggleRental = useListingsFilterStore(s => s.toggleRentalType);
  const toggleSupply = useListingsFilterStore(s => s.toggleSupplyType);
  const toggleHouse = useListingsFilterStore(s => s.toggleHouseType);
  if (!tabConfig) {
    return null;
  }
  const { sections, labels } = TAB_CONFIG[currentTab];

  const isSelected = (name: string) => {
    if (currentTab === "region") return regionType.includes(name);
    if (currentTab === "target") return rentalTypes.includes(name);
    if (currentTab === "rental") return supplyTypes.includes(name);
    if (currentTab === "housing") return houseTypes.includes(name);
    return false;
  };

  const onClick = (name: string) => {
    if (currentTab === "region") toggleRegion(name);
    if (currentTab === "target") toggleRental(name);
    if (currentTab === "rental") toggleSupply(name);
    if (currentTab === "housing") toggleHouse(name);
  };

  return (
    <>
      {Object.entries(sections).map(([key, cities]) => (
        <div key={key}>
          <h3 className="mb-3 text-xs-12 font-bold text-text-secondary">
            {labels[key as keyof typeof labels]}
          </h3>

          <div className="flex flex-wrap gap-2">
            {cities.map(city => (
              <Tag
                key={city.code}
                label={city.name}
                selected={isSelected(city.name)}
                onClick={() => onClick(city.name)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

const Tag = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="flex flex-col"
        >
          <span
            className={`rounded-full px-4 py-2 text-xs font-bold ${
              selected ? "bg-button-light text-text-inverse" : "bg-gray-100 text-text-secondary"
            }`}
            onClick={onClick}
          >
            {label}
          </span>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const UseCheckBox = () => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as FilterTabKey) || "region";
  const tabConfig = currentTab ? TAB_CONFIG[currentTab] : null;
  const regionType = useListingsFilterStore(s => s.regionType);
  const rentalTypes = useListingsFilterStore(s => s.rentalTypes);
  const supplyTypes = useListingsFilterStore(s => s.supplyTypes);
  const houseTypes = useListingsFilterStore(s => s.houseTypes);

  const toggleRegionType = useListingsFilterStore(s => s.toggleRegionType);
  const toggleRentalType = useListingsFilterStore(s => s.toggleRentalType);
  const toggleSupplyType = useListingsFilterStore(s => s.toggleSupplyType);
  const toggleHouseType = useListingsFilterStore(s => s.toggleHouseType);
  const resetRegionType = useListingsFilterStore(s => s.resetRegionType);
  const resetRentalTypes = useListingsFilterStore(s => s.resetRentalTypes);
  const resetSupplyTypes = useListingsFilterStore(s => s.resetSupplyTypes);
  const resetHouseTypes = useListingsFilterStore(s => s.resetHouseTypes);

  if (!tabConfig) {
    return null;
  }
  const { sections } = TAB_CONFIG[currentTab];
  const totalItems = Object.values(sections)
    .flat()
    .map(i => i.name);
  // 현재 탭에 따라 현재 선택된 값 가져오기
  const selectedList = {
    region: regionType,
    target: rentalTypes,
    rental: supplyTypes,
    housing: houseTypes,
  }[currentTab];

  const isAllSelected = selectedList.length === totalItems.length;

  const handleAllSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    // 기존 방식 유지: 기존 값 초기화
    if (currentTab === "region") resetRegionType();
    if (currentTab === "target") resetRentalTypes();
    if (currentTab === "rental") resetSupplyTypes();
    if (currentTab === "housing") resetHouseTypes();

    // 기존 toggleXXX 로직 그대로 유지 (이름 변경 없음)
    if (checked) {
      totalItems.forEach(item => {
        if (currentTab === "region") toggleRegionType(item);
        if (currentTab === "target") toggleRentalType(item);
        if (currentTab === "rental") toggleSupplyType(item);
        if (currentTab === "housing") toggleHouseType(item);
      });
    }
  };

  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="relative h-5 w-5 appearance-none rounded-md border border-gray-300 before:absolute before:left-[4px] before:top-[0px] checked:border-primary-blue-500 checked:bg-button-light checked:before:text-[12px] checked:before:text-white checked:before:content-['✔']"
        onChange={handleAllSelect}
        checked={isAllSelected}
      />
      <span className="text-sm">전체</span>
    </label>
  );
};

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

const FilterSheetContainer = ({
  onDismiss,
  children,
}: {
  onDismiss: () => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onDismiss}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 flex h-[95vh] flex-col rounded-t-2xl bg-white shadow-xl"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        {children}
      </motion.div>
    </>
  );
};

const FilterSheetHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div className="mx-auto mb-3 mt-2 h-1.5 w-12 rounded-full bg-gray-300" />

      <div className="flex items-center justify-between px-5 pb-2">
        <h2 className="text-sm font-bold">공고 필터</h2>
        <button onClick={onClose} className="text-xl font-bold">
          <CloseButton />
        </button>
      </div>

      <ListingTab />
    </>
  );
};

const FilterSheetContent = ({
  children,
  scrollRef,
  onScroll,
  isAtBottom,
}: {
  children: React.ReactNode;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  isAtBottom: boolean;
}) => {
  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="no-scrollbar h-full overflow-y-auto px-5 py-5"
      >
        {children}
      </div>
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white to-transparent transition-all duration-300 ${
          isAtBottom ? "h-0 opacity-0" : "h-16 opacity-100"
        }`}
      />
    </div>
  );
};

const FilterSheetFooter = ({
  total,
  onApply,
}: {
  total: number | null | undefined;
  onApply: () => void;
}) => {
  return (
    <div className="p-5">
      <button
        className="w-full rounded-lg bg-button-primary py-3 font-semibold text-white"
        onClick={onApply}
      >
        <span className="flex justify-center gap-1 transition-none">
          <p className="text-center">{total}</p>
          <p>개의 공고가 있어요</p>
        </span>
      </button>
    </div>
  );
};
