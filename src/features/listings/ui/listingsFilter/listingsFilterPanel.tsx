"use client";

import { FILTER_OPTIONS, filterMap, getAllFilterIcon } from "../../model";
import { useListingsFilterStore } from "../../model/listingsStore";
import { ListingTagButton } from "../listingsButton/listingsTagButton";
import { ListingHooks } from "@/src/features/listings/ui/listingsFilter/hooks";

export const ListingFilterPanel = () => {
  const { onOpenSheet, hasSelectedFilters } = ListingHooks();

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
