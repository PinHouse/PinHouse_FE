import { HTTP_METHODS } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { InfiniteData } from "@tanstack/react-query";

/**
 * 공고 list param
 */
export interface ListingListParams {
  page: number;
  offSet: number;
}

/**
 * 검색어 list param
 */
export interface ListingSearchParams {
  q: string;
  pageRequest: { page: number; size: number };
  sort?: string;
  filter?: string;
}

/**
 * 공고 리스트 필터
 */
export interface ListingListFilterBody {
  regionType: string[];
  rentalTypes: string[];
  supplyTypes: string[];
  houseTypes: string[];
  status: string;
  sortType: string;
}

// 개별 항목 타입 공고 조회
export interface ListingItem {
  id: string;
  thumbnailUrl: string | null;
  name: string;
  supplier: string;
  complexes: number;
  type: string;
  housingType: string;
  announcePeriod: string;
  applyPeriod: string;
  liked: boolean;
}
/**
 * 개별항목 공고검색
 */
export interface ListingSearchItem {
  id: string; // 공고 ID
  title: string; // 공고 제목
  agency: string; // LH / SH / GH 등 기관명
  announceDate: string; // 공고 게시일 (YYYY-MM-DD)
  applyStart: string; // 신청 시작일 (YYYY-MM-DD)
  applyEnd: string; // 신청 종료일 (YYYY-MM-DD)
  housingType: string; // 아파트 / 오피스텔 / 연립 등
  supplyType: string; // 행복주택 / 국민임대 등
  liked: boolean; // 좋아요 여부
}

export type ListingUnion = ListingItem | ListingSearchItem;

export interface ListingNormalized {
  id: string;
  name: string; // ListingItem.name OR ListingSearchItem.title
  supplier: string; // supplier OR agency
  applyPeriod: string; // "start ~ end"
  type: string; // type OR supplyType
  housingType: string;
  liked: boolean;
}

/*
 * @ 좋아요! 타입
 */
export type ListingItemMinimal = Pick<ListingItem, "id" | "liked">;
export type HttpMethod = keyof typeof HTTP_METHODS;

/**
 *@좋아요반환
 */
export interface LikeReturn {
  success: boolean;
  code: number;
  message: string;
}

/**
 *@param 좋아요파라메터
 */
export type ToggleLikeVariables = {
  method: "post" | "delete";
  targetId: number;
  liked?: boolean;
  type: "NOTICE";
};

// data 객체 타입
export interface ListingListPage {
  totalCount: number;
  totalElements: number;
  content: ListingItem[];
  notices: ListingSearchItem[];
  hasNext: boolean;
  page: number;
}
/**
 * 무한스크롤 공고 LIST
 */
export interface ListingContentsCardsProps {
  data: ListingItem[];
}
/**
 * 무한스크롤 공고 LIST
 */
export interface ListingContentsListProps {
  data: InfiniteData<ListingListPage> | undefined;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
}
/**
 * 총공고 카운트
 */
export interface ListingsContentHeaderProps {
  totalCount: number | null;
}

export interface FilterSheetState {
  open: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

export interface ListingState {
  status: string;
  setStatus: (value: string) => void;
  reset: () => void;
}

export interface SearchState {
  sortType: string;
  status: string;
  setStatus: (value: string) => void;
  setSortType: (value: string) => void;
  reset: () => void;
}

/**
 * 인기검색어 Data
 */
export interface PopularKeywordItem {
  keyword: string;
  count: number;
  lastSearchedAt: string;
}

/**
 * 인기검색어 Data
 */

export interface PopularKeywordResponse extends IResponse {
  data: PopularKeywordItem[];
}

export type FilterOptionKey = "region" | "target" | "rental" | "housing";

export interface FilterOption {
  key: FilterOptionKey;
  label: string;
  component: string;
  type?: "select" | "radio" | "checkbox" | "sort" | "panel";
}

export interface ListingsFilterState {
  regionType: string[];
  rentalTypes: string[];
  supplyTypes: string[];
  houseTypes: string[];
  status: string;
  sortType: string;

  toggleRegionType: (item: string) => void;
  toggleRentalType: (item: string) => void;
  toggleSupplyType: (item: string) => void;
  toggleHouseType: (item: string) => void;

  setStatus: (status: string) => void;
  setSortType: (sort: string) => void;

  resetRegionType: () => void;
  resetRentalTypes: () => void;
  resetSupplyTypes: () => void;
  resetHouseTypes: () => void;
}

export const normalizeListing = (item: ListingItem | ListingSearchItem): ListingNormalized => {
  if ("name" in item) {
    // ListingItem
    return {
      id: item.id,
      name: item.name,
      supplier: item.supplier,
      applyPeriod: item.applyPeriod,
      housingType: item.housingType,
      type: item.type,
      liked: item.liked,
    };
  }

  // ListingSearchItem
  return {
    id: item.id,
    name: item.title,
    supplier: item.agency,
    applyPeriod: `${item.applyStart} ~ ${item.applyEnd}`,
    housingType: item.housingType,
    type: item.supplyType,
    liked: item.liked,
  };
};
