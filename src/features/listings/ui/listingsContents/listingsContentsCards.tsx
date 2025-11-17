import { useListingState } from "../../model/listingsStore";
import { ListingContentsCardsProps, ListingItem } from "@/src/entities/listings/model/type";
import { getListingIcon, getListingsRental } from "../../hooks/listingsHooks";
import { ListingBgBookMark, ListingBookMark } from "./listingsBookMark";

const HouseICons = (item: ListingItem) => {
  const icon = getListingIcon(item.type, item.housingType);
  return <div>{icon}</div>;
};

const HouseRental = (item: ListingItem) => {
  const rantalText = getListingsRental(item.type);
  if (!rantalText) return;
  return (
    <ListingBgBookMark item={item.type} bg={rantalText?.bg} text={rantalText?.text} border="none" />
  );
};

export const ListingContentsCards = ({ data }: ListingContentsCardsProps) => {
  const { status } = useListingState();

  return (
    <div className="flex flex-col gap-3">
      {data?.map((item: ListingItem) => (
        <div key={item.id} className="flex h-[112px] min-h-[100px] w-full rounded-xl border">
          <div className="border-r-1 flex w-[35%] flex-col bg-bgColor-mute pl-1 pt-2">
            <div className="flex justify-start gap-1">
              <ListingBookMark item={item.housingType} border="border" />
              <p className="text-xs font-bold">{item.supplier}</p>
            </div>
            H
            <div className="flex items-center justify-center">
              <HouseICons {...item} />
            </div>
          </div>
          <div className="flex w-[65%] flex-col justify-start gap-2 pb-3 pl-4 pr-4 pt-3">
            <div className="flex items-baseline gap-2">
              <HouseRental {...item} />
              <p className="text-xs font-bold text-text-greyscale-grey-400">방타입 00 개</p>
            </div>
            <div className="max-w-full">
              <p className="truncate text-sm font-bold">{item.name}</p>
            </div>
            <div className="max-w-full">
              <p className="text-sm font-bold text-text-greyscale-grey-400">모집일정</p>
              <p className="text-sm font-bold text-text-greyscale-grey-400">{item.applyPeriod}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
