import { useListingState, useListingsFilterStore } from "@/src/features/listings/model";
import { fetchNoticeInitialFromBff } from "@/src/features/listings/server";

export async function getNoticeInitialData() {
  const { status } = useListingState.getState();
  const { sortType } = useListingsFilterStore.getState();
  const [initial] = await Promise.all([fetchNoticeInitialFromBff({ status, sortType })]);
  return { initial };
}
