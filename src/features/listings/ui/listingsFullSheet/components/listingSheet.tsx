import { useSearchParams } from "next/navigation";
import { FilterTabKey, TAB_CONFIG } from "../../../model";
import { useListingsFilterStore } from "../../../model/store/listingsStore";
import { ListingsFilterState } from "@/src/entities/listings/model/type";
import { Tag } from "./tag";

export const ListingSheet = () => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as FilterTabKey) || "region";
  const tabConfig = currentTab ? TAB_CONFIG[currentTab] : null;

  const draft = useListingsFilterStore((state: ListingsFilterState) => state.draft);

  const toggleRegion = useListingsFilterStore((state: ListingsFilterState) => state.toggleDraftRegionType);
  const toggleRental = useListingsFilterStore((state: ListingsFilterState) => state.toggleDraftRentalType);
  const toggleSupply = useListingsFilterStore((state: ListingsFilterState) => state.toggleDraftSupplyType);
  const toggleHouse = useListingsFilterStore((state: ListingsFilterState) => state.toggleDraftHouseType);
  if (!tabConfig) {
    return null;
  }
  const { sections, labels } = TAB_CONFIG[currentTab];

  const isSelected = (name: string) => {
    if (currentTab === "region") return draft.regionType.includes(name);
    if (currentTab === "target") return draft.rentalTypes.includes(name);
    if (currentTab === "rental") return draft.supplyTypes.includes(name);
    if (currentTab === "housing") return draft.houseTypes.includes(name);
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
