"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FILTER_OPTIONS, filterMap, getAllFilterIcon } from "../../model";
import { useFilterSheetStore, useListingsFilterStore } from "../../model/listingsStore";
import { ListingTagButton } from "../listingsButton/listingsTagButton";

export const ListingFilterPanel = () => {
  const openSheet = useFilterSheetStore(state => state.openSheet);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.set("tab", params.get("tab") ?? "region");
  const onOpenSheet = () => {
    openSheet();
    router.push(`listings?${params}`);
  };

  const hasSelectedFilters = useListingsFilterStore(state =>
    [state.regionType, state.rentalTypes, state.supplyTypes, state.houseTypes].some(
      list => list.length > 0
    )
  );

  return (
    <div className="relative w-full select-none border-b-[1px] px-1 py-1">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="flex-shrink-0 hover:cursor-pointer" onClick={onOpenSheet}>
          {getAllFilterIcon(hasSelectedFilters)}
        </div>

        <div className="no-scrollbar flex flex-1 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            {FILTER_OPTIONS.map(item => {
              const selectedValues = useListingsFilterStore(state => filterMap[item.key](state));
              const count = selectedValues.length;
              return (
                <div key={item.key} className="flex-shrink-0">
                  <ListingTagButton label={item} count={count} param={"tab"} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
