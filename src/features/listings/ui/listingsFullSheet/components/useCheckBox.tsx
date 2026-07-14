import { useSearchParams } from "next/navigation";
import { FilterTabKey, TAB_CONFIG } from "../../../model";
import { useListingsFilterStore } from "../../../model/store/listingsStore";
import { ListingsFilterState } from "@/src/entities/listings/model/type";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";

export const UseCheckBox = () => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as FilterTabKey) || "region";
  const tabConfig = currentTab ? TAB_CONFIG[currentTab] : null;
  const draft = useListingsFilterStore((state: ListingsFilterState) => state.draft);

  const toggleRegionType = useListingsFilterStore((state: ListingsFilterState) => state.toggleDraftRegionType);
  const toggleRentalType = useListingsFilterStore((state: ListingsFilterState) => state.toggleDraftRentalType);
  const toggleSupplyType = useListingsFilterStore((state: ListingsFilterState) => state.toggleDraftSupplyType);
  const toggleHouseType = useListingsFilterStore((state: ListingsFilterState) => state.toggleDraftHouseType);
  const resetRegionType = useListingsFilterStore((state: ListingsFilterState) => state.resetDraftRegionType);
  const resetRentalTypes = useListingsFilterStore((state: ListingsFilterState) => state.resetDraftRentalTypes);
  const resetSupplyTypes = useListingsFilterStore((state: ListingsFilterState) => state.resetDraftSupplyTypes);
  const resetHouseTypes = useListingsFilterStore((state: ListingsFilterState) => state.resetDraftHouseTypes);

  if (!tabConfig) {
    return null;
  }
  const { sections } = TAB_CONFIG[currentTab];
  const totalItems = Object.values(sections)
    .flat()
    .map(i => i.name);
  // 현재 탭에 따라 현재 선택된 값 가져오기
  const selectedList = {
    region: draft.regionType,
    target: draft.rentalTypes,
    rental: draft.supplyTypes,
    housing: draft.houseTypes,
  }[currentTab];
  const isAllSelected = selectedList.length === totalItems.length;
  const handleAllSelect = (e: boolean) => {
    const checked = e;
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
      <Checkbox
        checked={isAllSelected}
        onCheckedChange={checked => handleAllSelect(checked === true)}
      />
      <span className="text-sm">전체</span>
    </label>
  );
};
