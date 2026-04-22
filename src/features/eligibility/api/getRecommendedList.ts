import { getHomeRecommendedPageFromBff } from "@/src/entities/home/api/homeBffApi";
import type { ListingItem } from "@/src/entities/listings/model/type";
import type { SliceResponse } from "@/src/entities/home/model/type";

export type GetRecommendedListParams = {
  page: number;
  offSet: number;
};

/** 진단기반 추천 공고 목록 조회 (페이지네이션) */
export function getRecommendedList<T = SliceResponse<ListingItem>>(
  params: GetRecommendedListParams
): Promise<T> {
  return getHomeRecommendedPageFromBff(params.page, params.offSet) as Promise<T>;
}
