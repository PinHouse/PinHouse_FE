"use client";
import { AllFitler_OPTIONS, FILTER_OPTIONS } from "../../model";
import { useFilterSheetStore } from "../../model/listingsStore";
import { ListingTagButton } from "../listingsButton/listingsTagButton";

export const ListingFilterPanel = () => {
  const openSheet = useFilterSheetStore(state => state.openSheet);

  return (
    <div className="relative w-full select-none border-b-[1px] px-1 py-1">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="flex-shrink-0" onClick={openSheet}>
          {AllFitler_OPTIONS.icon}
        </div>

        <div className="no-scrollbar flex flex-1 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            {FILTER_OPTIONS.map(item => (
              <div key={item.key} className="flex-shrink-0">
                <ListingTagButton label={item.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
