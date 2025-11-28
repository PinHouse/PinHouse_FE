"use client";

import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";
import { HOME_TYPE_CATEGORIES } from "@/src/shared/ui/button/tagButton/preset";
import { QuickSearchCategorySection } from "../common/quickSearchCategorySection";

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
    const houseTypeCategory = HOME_TYPE_CATEGORIES[0];
    if (checked) {
      setHouseTypes([...houseTypeCategory.options]);
    } else {
      setHouseTypes([]);
    }
  };

  const handleRentalTypeSelectAll = (checked: boolean) => {
    const rentalTypeCategory = HOME_TYPE_CATEGORIES[1];
    if (checked) {
      setRentalTypes([...rentalTypeCategory.options]);
    } else {
      setRentalTypes([]);
    }
  };

  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {HOME_TYPE_CATEGORIES.map((category, index) => {
        const selectedItems = index === 0 ? houseTypes : rentalTypes;
        const onToggle = index === 0 ? toggleHouseType : toggleRentalType;
        const onSelectAll = index === 0 ? handleHouseTypeSelectAll : handleRentalTypeSelectAll;
        const selectedCount = selectedItems.length;
        const isAllSelected = selectedCount === category.options.length;

        const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
          onSelectAll(e.target.checked);
        };

        return (
          <div key={category.title} className="flex flex-col gap-3">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-900">
                {category.title}
              </h3>
              <div className="flex items-center gap-2">
                <label className="flex cursor-pointer items-center gap-2">
                  {/* TODO: 체크 박스 추구 개선 */}
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="relative h-5 w-5 appearance-none rounded-md border border-greyscale-grey-300 before:absolute before:left-[4px] before:top-[0px] checked:border-primary-blue-300 checked:bg-primary-blue-300 checked:before:text-[12px] checked:before:text-white checked:before:content-['✔']"
                  />
                  <span className="text-sm font-medium leading-4 tracking-[-0.01em] text-greyscale-grey-500">
                    전체 선택
                  </span>
                </label>
              </div>
            </div>

            {/* 카테고리 섹션 */}
            <QuickSearchCategorySection
              title=""
              options={category.options}
              selectedItems={selectedItems}
              onToggle={onToggle}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChooseHomeType;
