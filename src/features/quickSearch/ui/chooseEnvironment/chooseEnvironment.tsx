"use client";

import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";
import { ENVIRONMENT_CATEGORIES } from "@/src/shared/ui/button/tagButton/preset";
import { QuickSearchCategorySection } from "../common/quickSearchCategorySection";

const MAX_SELECTIONS = 5;

const ChooseEnvironment = () => {
  const { supplyTypes, toggleSupplyType } = useQuickSearchStore();

  // 최대 5개 선택 제한을 포함한 핸들러
  const handleToggle = (item: string) => {
    const isSelected = supplyTypes.includes(item);

    // 이미 선택된 항목을 해제하는 경우는 허용
    if (isSelected) {
      toggleSupplyType(item);
      return;
    }

    // 선택되지 않은 항목을 선택하려는 경우, 최대 개수 확인
    if (supplyTypes.length >= MAX_SELECTIONS) {
      return;
    }

    // 선택 허용
    toggleSupplyType(item);
  };

  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {Object.entries(ENVIRONMENT_CATEGORIES).map(([key, category]) => (
        <QuickSearchCategorySection
          key={key}
          title={category.title}
          options={category.options}
          selectedItems={supplyTypes}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default ChooseEnvironment;
