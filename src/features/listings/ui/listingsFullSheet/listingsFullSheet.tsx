"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterSheetStore } from "../../model/listingsStore";
import { FILTER_TABS, FilterTabKey, TAB_CONFIG } from "../../model";
import { ChangeEvent, useEffect } from "react";
import { CloseButton } from "@/src/assets/icons/button";
import { useEnvtagStore } from "@/src/entities/tag/envTag";
import { useRouter, useSearchParams } from "next/navigation";
import { getIndicatorLeft, getIndicatorWidth } from "../../hooks/listingsHooks";

export const ListingFilterPartialSheet = () => {
  const { open, closeSheet } = useFilterSheetStore();
  const router = useRouter();
  const onClickCLose = () => {
    closeSheet();
    router.push("/listings", { scroll: false });
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={closeSheet}
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
            <div className="mx-auto mb-3 mt-2 h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="flex items-center justify-between px-5 pb-2">
              <h2 className="text-sm font-bold">공고 필터</h2>
              <button onClick={onClickCLose} className="text-xl font-bold">
                <CloseButton />
              </button>
            </div>
            <ListingTab />

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 scrollbar-hide">
              <UseCheckBox />
              <ListingSheet />
            </div>

            <div className="p-5">
              <button className="w-full rounded-lg bg-button-primary py-3 font-semibold text-white">
                1000+개의 공고가 있어요
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ListingSheet = () => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as FilterTabKey) || "region";
  const { sections, labels } = TAB_CONFIG[currentTab];

  return (
    <>
      {Object.entries(sections).map(([regionKey, cities]) => {
        const typedKey = regionKey as keyof typeof labels;

        return (
          <div key={regionKey}>
            <h3 className="mb-3 text-xs-12 font-bold text-text-secondary">{labels[typedKey]}</h3>

            <div className="flex flex-wrap gap-2">
              {cities.map(city => (
                <Tag key={city.code}>{city.name}</Tag>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

const Tag = ({ children }: { children: string }) => {
  const { envTag, toggleEnvtag, reset } = useEnvtagStore();
  const isSelected = envTag.includes(children);
  const onTagClick = () => {
    toggleEnvtag(children);
  };

  useEffect(() => {
    reset();
  }, []);
  return (
    <span
      className={`rounded-full px-4 py-2 text-xs font-bold ${isSelected ? "bg-button-light text-text-inverse" : "bg-gray-100 text-text-secondary"}`}
      onClick={onTagClick}
    >
      {children}
    </span>
  );
};

const UseCheckBox = () => {
  const { envTag, toggleEnvtag, reset } = useEnvtagStore();

  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as FilterTabKey) || "region";
  const { sections } = TAB_CONFIG[currentTab];

  const totalCount = Object.values(sections).flat().length;
  const isAllSelected = envTag.length === totalCount;

  const onAllTagClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    reset();
    if (checked) {
      const allCities = Object.values(sections)
        .flat()
        .map(city => city.name);

      allCities.forEach(city => toggleEnvtag(city));
    }
  };

  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="relative h-5 w-5 appearance-none rounded-md border border-gray-300 before:absolute before:left-[4px] before:top-[0px] checked:border-primary-blue-500 checked:bg-button-light checked:before:text-[12px] checked:before:text-white checked:before:content-['✔']"
        onChange={onAllTagClick}
        checked={!!isAllSelected}
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
