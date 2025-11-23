import { http } from "@/src/shared/api/http";
import { SEARCH_FAST_HISTORY_ENDPOINT } from "@/src/shared/api/endpoints";
import { IResponse } from "@/src/shared/types";

// 이전 탐색 결과 응답 타입
export interface QuickSearchHistoryResponse extends IResponse {
  data: {
    existed: boolean;
    id: string | null;
  };
}

/**
 * 이전 빠른 탐색 결과 조회 API
 */
export const getQuickSearchHistory = async (): Promise<QuickSearchHistoryResponse["data"]> => {
  const response = await http.get<QuickSearchHistoryResponse>(SEARCH_FAST_HISTORY_ENDPOINT);
  return response.data;
};
