import { useSearchParams } from "next/navigation";
import { FilterTabKey, TAB_CONFIG } from "../../../model";
import { useListingsFilterStore } from "../../../model/store/listingsStore";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";

export const UseCheckBox = () => {
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
