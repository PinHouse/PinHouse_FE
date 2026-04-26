import { useListingState, useListingsFilterStore } from "@/src/features/listings/model";
import { fetchNoticeInitialFromBff } from "@/src/features/listings/server";

export async function getNoticeInitialData() {
  const { status } = useListingState.getState();
  const { regionType, rentalTypes, supplyTypes, houseTypes, sortType } =
    useListingsFilterStore.getState();
  const [initial] = await Promise.all([
    fetchNoticeInitialFromBff({
      regionType,
      rentalTypes,
      supplyTypes,
      houseTypes,
      status,
      sortType,
    }),
  ]);
  return { initial };
}
