"use client";

import { useState } from "react";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";
import { CONDITION_CATEGORIES } from "@/src/shared/ui/button/tagButton/preset";
import { QuickSearchCategorySection } from "../common/quickSearchCategorySection";

const ChooseCondition = () => {
  const { rentalTypes, toggleRentalType, setRentalTypes } = useQuickSearchStore();
  const [searchWithAllConditions, setSearchWithAllConditions] = useState(false);

  // 모든 옵션 목록
  const allOptions = CONDITION_CATEGORIES.flatMap(category => category.options);

  // 각 카테고리별 전체 선택 핸들러
  const handleCategorySelectAll = (categoryIndex: number, checked: boolean) => {
    const category = CONDITION_CATEGORIES[categoryIndex];
    const categoryOptions = category.options as readonly string[];
    const currentSelected = rentalTypes.filter(item => categoryOptions.includes(item));
    const otherSelected = rentalTypes.filter(item => !categoryOptions.includes(item));

    if (checked) {
      // 해당 카테고리의 모든 옵션 선택
      setRentalTypes([...otherSelected, ...categoryOptions]);
    } else {
      // 해당 카테고리의 모든 옵션 해제
      setRentalTypes(otherSelected);
    }
  };

  // 전체 조건으로 탐색하기 핸들러
  const handleSearchWithAllConditions = (checked: boolean) => {
    setSearchWithAllConditions(checked);
    if (checked) {
      // 전체 조건 선택 시 모든 옵션 선택
      setRentalTypes([...allOptions]);
    } else {
      // 해제 시 모든 옵션 해제
      setRentalTypes([]);
    }
  };

  return (
    <div className="mt-10 flex w-full flex-col gap-10">
      {CONDITION_CATEGORIES.map(category => {
        return (
          <div key={category.title} className="flex flex-col gap-1.5">
            {/* 카테고리 섹션 */}
            <QuickSearchCategorySection
              title={category.title}
              options={category.options}
              selectedItems={rentalTypes}
              onToggle={toggleRentalType}
            />
          </div>
        );
      })}

      {/* 전체 조건으로 탐색하기 */}
      <div className="flex items-center justify-center gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={searchWithAllConditions}
            onChange={e => handleSearchWithAllConditions(e.target.checked)}
            className="relative h-5 w-5 appearance-none rounded-md border border-greyscale-grey-300 before:absolute before:left-[4px] before:top-[0px] checked:border-primary-blue-300 checked:bg-primary-blue-300 checked:before:text-[12px] checked:before:text-white checked:before:content-['✔']"
          />
          <span className="text-sm font-medium leading-4 tracking-[-0.01em] text-greyscale-grey-500">
            전체 조건으로 탐색하기
          </span>
        </label>
      </div>
    </div>
  );
};

export default ChooseCondition;
