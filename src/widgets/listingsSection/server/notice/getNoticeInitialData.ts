import { ListingsFilterCriteria } from "@/src/features/listings/model";
import { fetchNoticeInitialFromBff } from "@/src/features/listings/server";

type GetNoticeInitialDataArgs = {
  filter: ListingsFilterCriteria;
  status: string;
};

export async function getNoticeInitialData({ filter, status }: GetNoticeInitialDataArgs) {
  const [initial] = await Promise.all([
    fetchNoticeInitialFromBff({
      regionType: filter.regionType,
      rentalTypes: filter.rentalTypes,
      supplyTypes: filter.supplyTypes,
      houseTypes: filter.houseTypes,
      status,
      sortType: filter.sortType,
    }),
  ]);
  return { initial };
}
