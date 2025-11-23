"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/src/shared/lib/headlessUi/toggle/toggle";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";

// 환경 조건 옵션
const ENVIRONMENT_CATEGORIES = {
  youth: {
    title: "청년층",
    options: ["청년", "대학생"],
  },
  family: {
    title: "가족형",
    options: ["신혼부부", "다자녀"],
  },
  vulnerable: {
    title: "주거약자",
    options: ["고령자", "장애인", "한부모", "국가유공자", "저소득층"],
  },
  ownership: {
    title: "주택 보유 상태",
    options: ["무주택자", "유주택자"],
  },
} as const;

interface CategorySectionProps {
  title: string;
  options: readonly string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}

const CategorySection = ({ title, options, selectedItems, onToggle }: CategorySectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold text-greyscale-grey-900">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => {
          const isSelected = selectedItems.includes(option);
          return (
            <Toggle
              key={option}
              variant="chip"
              pressed={isSelected}
              onPressedChange={() => onToggle(option)}
              className="h-10 text-sm"
            >
              {option}
            </Toggle>
          );
        })}
      </div>
    </div>
  );
};

const ChooseEnvironment = () => {
  const { supplyTypes, toggleSupplyType, setSupplyTypes } = useQuickSearchStore();
  const [searchWithAllConditions, setSearchWithAllConditions] = useState(false);

  // 모든 옵션 목록
  const allOptions = Object.values(ENVIRONMENT_CATEGORIES).flatMap(category => category.options);

  // 전체 조건으로 탐색하기 핸들러
  const handleSearchWithAllConditions = (checked: boolean) => {
    setSearchWithAllConditions(checked);
    if (checked) {
      // 전체 조건 선택 시 모든 옵션 선택
      setSupplyTypes([...allOptions]);
    } else {
      // 해제 시 모든 옵션 해제
      setSupplyTypes([]);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {Object.entries(ENVIRONMENT_CATEGORIES).map(([key, category]) => (
        <CategorySection
          key={key}
          title={category.title}
          options={category.options}
          selectedItems={supplyTypes}
          onToggle={toggleSupplyType}
        />
      ))}

      {/* 전체 조건으로 탐색하기 */}
      <div className="mt-4 flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={searchWithAllConditions}
            onChange={e => handleSearchWithAllConditions(e.target.checked)}
            className="border-greyscale-grey-300 relative h-5 w-5 appearance-none rounded-md border before:absolute before:left-[4px] before:top-[0px] checked:border-primary-blue-500 checked:bg-primary-blue-500 checked:before:text-[12px] checked:before:text-white checked:before:content-['✔']"
          />
          <span className="text-sm font-medium text-greyscale-grey-700">
            전체 조건으로 탐색하기
          </span>
        </label>
      </div>
    </div>
  );
};

export default ChooseEnvironment;
