import { ListingDetailResponseWithColor } from "@/src/entities/listings/model/type";
import { getListingsRental, normalizeRentType } from "@/src/features/listings/hooks/listingsHooks";

export const useDetailColorHooks = (
  basicInfo: ListingDetailResponseWithColor["data"]["basicInfo"]
) => {
  const type = normalizeRentType(basicInfo.type);
  const color = getListingsRental(type);

  return {
    color,
  };
};
