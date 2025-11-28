import { http } from "@/src/shared/api/http";
import { SEARCH_FAST_ENDPOINT, SEARCH_FAST_HISTORY_ENDPOINT } from "@/src/shared/api/endpoints";
import { IResponse } from "@/src/shared/types";
import { QuickSearchData } from "../model/quickSearch.type";

// 이전 탐색 결과 응답 타입
export interface QuickSearchHistoryResponse extends IResponse {
  data: {
    existed: boolean;
    id: string | null;
  };
}

// 빠른 검색 요청 타입
export interface QuickSearchFastRequest extends QuickSearchData {}

// 빠른 검색 응답 타입
export interface QuickSearchFastResponse extends IResponse {
  data: {
    id: string;
    // 추가 응답 데이터는 백엔드 응답에 따라 확장 가능
  };
}

/**
 * 이전 빠른 탐색 결과 조회 API
 */
export const getQuickSearchHistory = async (): Promise<QuickSearchHistoryResponse["data"]> => {
  const response = await http.get<QuickSearchHistoryResponse>(SEARCH_FAST_HISTORY_ENDPOINT);
  return response.data;
};

/**
 * 빠른 검색 API 호출 함수
 * @param data 빠른 검색 요청 데이터
 */
export const postQuickSearchFast = async (
  data: QuickSearchFastRequest
): Promise<QuickSearchFastResponse["data"]> => {
  const response = await http.post<QuickSearchFastResponse, QuickSearchFastRequest>(
    SEARCH_FAST_ENDPOINT,
    data
  );
  return response.data;
};
