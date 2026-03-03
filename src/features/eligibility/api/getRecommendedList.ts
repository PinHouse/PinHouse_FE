import { API_BASE_URL_V2, http } from "@/src/shared/api/http";
import { ELIGIBILITY_RECOMMENDED_LIST_ENDPOINT } from "@/src/shared/api/endpoints";
import type { IResponse } from "@/src/shared/types/response";
import type { ListingItem } from "@/src/entities/listings/model/type";
import type { SliceResponse } from "@/src/entities/home/model/type";

export type GetRecommendedListParams = {
  page: number;
  offSet: number;
};

/** 진단기반 추천 공고 목록 조회 (페이지네이션) */
export function getRecommendedList<T = SliceResponse<ListingItem>>(
  params: GetRecommendedListParams
): Promise<IResponse<T>> {
  const data = http.get<IResponse<T>, GetRecommendedListParams>(
    ELIGIBILITY_RECOMMENDED_LIST_ENDPOINT,
    params
  );
  return data;
}
