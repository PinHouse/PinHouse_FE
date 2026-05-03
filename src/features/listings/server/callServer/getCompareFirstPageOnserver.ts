import { getListingCompareOnServer } from "./getListingDetailOnServer";

type GetCompareFirstPageOnServerArgs = {
  noticeId: string;
  sortType: string;
  nearbyFacilities?: string[];
  pinPointId?: string; // route에서 넘기면 fallback으로 사용
};

export async function getCompareFirstPageOnServer({
  noticeId,
  sortType,
  nearbyFacilities = [],
  pinPointId: pinPointIdFromArg,
}: GetCompareFirstPageOnServerArgs) {
  return getListingCompareOnServer({
    noticeId,
    sortType,
    nearbyFacilities,
    pinPointId: pinPointIdFromArg,
  });
}
