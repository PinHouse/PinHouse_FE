import { getListingsRental } from "@/src/features/listings/hooks/listingsHooks";
import { ListingBgBookMark } from "@/src/features/listings/ui/listingsContents/listingsBookMark";

export const HomeBgBookMark = ({ supplyType }: { supplyType: string }) => {
  const rantalText = getListingsRental(supplyType);
  if (!rantalText) return null;
  return (
    <ListingBgBookMark item={supplyType} bg={rantalText.bg} text={rantalText.text} border="none" />
  );
};
