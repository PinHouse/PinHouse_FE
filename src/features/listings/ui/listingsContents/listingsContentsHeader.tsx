import { ArrowUpArrowDown } from "@/src/assets/icons/button/arrowUpArrowDown";
import { listingPoint } from "../../model";
import { CaretDropDown } from "@/src/shared/ui/dropDown/CaretDropDown";
import { useListingState } from "../../model/listingsStore";
import { ListingsContentHeaderProps } from "@/src/entities/listings/model/type";

export const ListingsContentHeader = ({ totalCount }: ListingsContentHeaderProps) => {
  const { status, setStatus } = useListingState();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xl font-bold">
        <p className="text-sm text-text-primary">공고</p>
        <p className="text-sm text-text-greyscale-grey-400">{totalCount}</p>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-1">
          <CaretDropDown
            variant="ghost"
            types="drop"
            data={listingPoint}
            setSelect={setStatus}
            selected={status}
          />
        </div>

        <div className="flex items-center gap-1">
          <div className="text-xs font-bold">최신순</div>
          <ArrowUpArrowDown />
        </div>
      </div>
    </div>
  );
};
