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

// 빠른 검색 결과 Unit 타입 (API 응답)
export interface QuickSearchResultUnit {
  complexId: string;
  complexName: string;
  typeCode: string;
  typeId: string;
  heating: string;
  deposit: number; // 원 단위
  monthPayment: number; // 원 단위
  size: number; // m²
  totalSupplyInNotice: number; // 모집호수
  averageTime: number; // 분
  km: number;
  infra: string[]; // 인프라 태그 배열
  liked: boolean;
}

// 빠른 검색 응답 타입
export interface QuickSearchFastResponse extends IResponse {
  data: {
    total: number;
    units: QuickSearchResultUnit[];
    historyId?: string | null; // 검색 결과 historyId
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

/**
 * API 응답 Unit을 QuickSearchRecommendCardProps로 변환하는 헬퍼 함수
 */
export const transformUnitToCard = (
  unit: QuickSearchResultUnit
): Omit<
  import("../ui/common/quickSearchRecommendCard").QuickSearchRecommendCardProps,
  "className"
> => {
  // averageTime을 시간과 분으로 변환
  const hours = Math.floor(unit.averageTime / 60);
  const minutes = unit.averageTime % 60;

  // 원 단위를 만원 단위로 변환 (반올림)
  const depositInManwon = Math.round(unit.deposit / 10000);
  const monthlyRentInManwon = Math.round(unit.monthPayment / 10000);

  return {
    complexName: unit.complexName,
    distanceHours: hours,
    distanceMinutes: minutes,
    deposit: depositInManwon,
    monthlyRent: monthlyRentInManwon,
    exclusiveArea: Math.round(unit.size * 100) / 100, // 소수점 둘째 자리까지
    recruitmentUnits: unit.totalSupplyInNotice,
    infrastructureTags: unit.infra,
    isFavorite: unit.liked,
    onGoToAnnouncement: () => {
      // TODO: 공고 상세 페이지로 이동 (typeId 또는 complexId 사용)
      console.log("공고 바로가기 클릭", unit.typeId, unit.complexId);
    },
  };
};
