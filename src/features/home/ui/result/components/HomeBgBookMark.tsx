import { getListingsRental } from "@/src/features/listings/hooks/listingsHooks";
import { ListingBgBookMark } from "@/src/features/listings/ui/listingsContents/listingsBookMark";

export const HomeBgBookMark = ({ supplyType }: { supplyType: string }) => {
  const rantalText = getListingsRental(supplyType);

  if (!rantalText) return null;
  return (
    <span className={`shrink-0 rounded ${rantalText.bg} py-[2px] text-xs text-gray-600`}>
      <ListingBgBookMark
        item={supplyType}
        bg={rantalText.bg}
        text={rantalText.text}
        border="none"
      />
    </span>
  );
};
