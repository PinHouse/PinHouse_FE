"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/src/shared/lib/headlessUi/toggle/toggle";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";

// 주택 유형 옵션
const HOUSE_TYPE_OPTIONS = [
  "아파트",
  "오피스텔",
  "기숙사",
  "다세대주택",
  "연립주택",
  "단독주택",
] as const;

// 임대 유형 옵션
const RENTAL_TYPE_OPTIONS = ["행복주택", "공공임대", "민간임대", "전세형임대"] as const;

interface SectionProps {
  title: string;
  options: readonly string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  onSelectAll: (checked: boolean) => void;
}

const Section = ({ title, options, selectedItems, onToggle, onSelectAll }: SectionProps) => {
  const selectedCount = selectedItems.length;
  const isAllSelected = selectedCount === options.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAll(e.target.checked);
  };

  return (
    <div className="border-primary-blue-200 flex flex-col gap-4 rounded-lg border border-dashed bg-white p-5">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-greyscale-grey-900">{title}</h3>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              {selectedCount}
            </span>
          )}
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              className="border-greyscale-grey-300 relative h-5 w-5 appearance-none rounded-md border before:absolute before:left-[4px] before:top-[0px] checked:border-primary-blue-500 checked:bg-primary-blue-500 checked:before:text-[12px] checked:before:text-white checked:before:content-['✔']"
            />
            <span className="text-sm font-medium text-greyscale-grey-700">전체 선택</span>
          </label>
        </div>
      </div>

      {/* 버튼 그리드 */}
      <div className="grid grid-cols-3 gap-2">
        {options.map((option, index) => {
          const isSelected = selectedItems.includes(option);
          // 임대 유형의 마지막 항목(전세형임대)은 전체 너비로 표시
          const isLastAndRental = title === "임대 유형" && index === options.length - 1;
          return (
            <Toggle
              key={option}
              variant="chip"
              pressed={isSelected}
              onPressedChange={() => onToggle(option)}
              className={cn("h-10 text-sm", isLastAndRental && "col-span-3")}
            >
              {option}
            </Toggle>
          );
        })}
      </div>
    </div>
  );
};

const ChooseHomeType = () => {
  const {
    houseTypes,
    rentalTypes,
    toggleHouseType,
    toggleRentalType,
    setHouseTypes,
    setRentalTypes,
  } = useQuickSearchStore();

  // 전체 선택 핸들러
  const handleHouseTypeSelectAll = (checked: boolean) => {
    if (checked) {
      setHouseTypes([...HOUSE_TYPE_OPTIONS]);
    } else {
      setHouseTypes([]);
    }
  };

  const handleRentalTypeSelectAll = (checked: boolean) => {
    if (checked) {
      setRentalTypes([...RENTAL_TYPE_OPTIONS]);
    } else {
      setRentalTypes([]);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Section
        title="주택 유형"
        options={HOUSE_TYPE_OPTIONS}
        selectedItems={houseTypes}
        onToggle={toggleHouseType}
        onSelectAll={handleHouseTypeSelectAll}
      />
      <Section
        title="임대 유형"
        options={RENTAL_TYPE_OPTIONS}
        selectedItems={rentalTypes}
        onToggle={toggleRentalType}
        onSelectAll={handleRentalTypeSelectAll}
      />
    </div>
  );
};

export default ChooseHomeType;
