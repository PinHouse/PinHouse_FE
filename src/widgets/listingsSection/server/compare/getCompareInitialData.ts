import { fetchCompareInitialFromBff } from "@/src/features/listings/server/bff/getCompareInitialFromBff";
import { useListingState } from "@/src/features/listings/model";

type GetCompareInitialDataArgs = {
  id: string;
  sortType?: string;
  nearbyFacilities?: string[];
};

export async function getCompareInitialData({
  id,
  sortType = "LATEST",
  nearbyFacilities = [],
}: GetCompareInitialDataArgs) {
  const initial = await fetchCompareInitialFromBff({
    noticeId: id,
    sortType,
    nearbyFacilities,
  });

  return {
    initial,
    sortType,
    nearbyFacilities,
  };
}
