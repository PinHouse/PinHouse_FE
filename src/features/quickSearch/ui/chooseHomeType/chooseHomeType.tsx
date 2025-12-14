"use client";

import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";
import { HOME_TYPE_CATEGORIES } from "@/src/shared/ui/button/tagButton/preset";
import { QuickSearchCategorySection } from "../common/quickSearchCategorySection";

const ChooseHomeType = () => {
  const {
    houseTypes,
    supplyTypes,
    toggleHouseType,
    toggleSupplyType,
    setHouseTypes,
    setSupplyTypes,
  } = useQuickSearchStore();

  // 각 카테고리별 전체 선택 핸들러
  const handleCategorySelectAll = (categoryIndex: number, checked: boolean) => {
    const category = HOME_TYPE_CATEGORIES[categoryIndex];
    const categoryOptions = category.options as readonly string[];

    // 첫 번째 카테고리 (주택 유형)는 houseTypes에 저장
    if (categoryIndex === 0) {
      const currentSelected = houseTypes.filter(item => categoryOptions.includes(item));
      const otherSelected = houseTypes.filter(item => !categoryOptions.includes(item));

      if (checked) {
        // 해당 카테고리의 모든 옵션 선택
        setHouseTypes([...otherSelected, ...categoryOptions]);
      } else {
        // 해당 카테고리의 모든 옵션 해제
        setHouseTypes(otherSelected);
      }
    }
    // 두 번째 카테고리 (임대 유형)는 supplyTypes에 저장
    else if (categoryIndex === 1) {
      const currentSelected = supplyTypes.filter(item => categoryOptions.includes(item));
      const otherSelected = supplyTypes.filter(item => !categoryOptions.includes(item));

      if (checked) {
        // 해당 카테고리의 모든 옵션 선택
        setSupplyTypes([...otherSelected, ...categoryOptions]);
      } else {
        // 해당 카테고리의 모든 옵션 해제
        setSupplyTypes(otherSelected);
      }
    }
  };

  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {HOME_TYPE_CATEGORIES.map((category, index) => {
        const categoryOptions = category.options as readonly string[];

        // 카테고리별로 적절한 selectedItems와 toggle 함수 선택
        const selectedItems = index === 0 ? houseTypes : supplyTypes;
        const onToggle = index === 0 ? toggleHouseType : toggleSupplyType;

        const currentSelected = selectedItems.filter(item => categoryOptions.includes(item));
        const isAllSelected = currentSelected.length === categoryOptions.length;

        const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
          handleCategorySelectAll(index, e.target.checked);
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
