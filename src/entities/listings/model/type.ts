import { getListingsRental } from "@/src/features/listings/hooks/listingsHooks";
import { RENT_COLOR_CLASS } from "@/src/features/listings/model";
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
export interface ListingSearchParams extends ListingListParams {
  q: string;
  sortType: string;
  status?: string;
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

// data 객체 타입
export interface ListingListPage {
  totalCount: number;
  totalElements: number;
  content: ListingItem[];
  notices: ListingSearchItem[];
  hasNext: boolean;
  page: number;
}

export type ListingItemResponse = IResponse<ListingListPage>;
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

export interface PopularKeywordResponse extends IResponse<PopularKeywordItem[]> {
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

/** 공고탐색상세조회 */

export interface BasicInfo {
  id: string;
  type: string;
  housingType: string;
  supplier: string;
  name: string;
  period: string;
}

export interface ComplexList {
  totalCount: number;
  complexes: Complex[];
}

export interface ListingRoute {
  id: string;
  label: string;
  minutes?: number;
  distanceKm?: number;
  description?: string;
  stations?: string[];
}

export interface ListingRoomTypeInfo {
  id: string;
  name: string;
  supplyArea?: string;
  exclusiveArea?: string;
  deposit?: string;
  monthlyRent?: string;
}

// 공고상세조회
export interface Complex {
  id: string;
  name: string;
  address: string;
  heating: string;
  totalTime: string;
  infra: string[];
  unitCount: number;
  highlights?: string[];
  mainRoutes?: ListingRoute[];
  roomTypesDetail?: ListingRoomTypeInfo[];
}

// 핵심: data 내부 구조
export interface ListingDetailData {
  basicInfo: BasicInfo;
  filtered: ComplexList;
  nonFiltered: ComplexList;
}

export interface LstingBody {
  sortType: string;
  pinPointId: string;
  transitTime: number;
  maxDeposit: number;
  maxMonthPay: number;
}
export type RentType = keyof typeof RENT_COLOR_CLASS;
export type ListingDetailResponse = IResponse<ListingDetailData>;
export type RoomVariant = "default" | "muted";
export type ListingsCardTileProps = {
  listing: Complex;
  variant: RoomVariant;
};
export type RentTypeCss = {
  bg?: string;
  text?: string;
};

export interface ListingDetailResponseWithColor extends ListingDetailResponse {
  data: {
    basicInfo: BasicInfo & {
      rentalColor: ReturnType<typeof getListingsRental>;
    };
    filtered: ComplexList;
    nonFiltered: ComplexList;
  };
}

//단지주택 상세정보
export interface ListingSummary {
  id: string; // "19401#1"
  name: string; // "완주삼봉A-1BL"
  address: string; // "전북특별자치도 완주군"
  heating: string; // "개별난방"
  totalHouseholds: number; // 0
  totalSupplyInNotice: number; // 9
  infra: string[]; // ["공원", "스포츠 시설"]
  unitCount: number; // 2
  unitTypes: string[]; // ["21A", "26B"]
  distance: DistanceInfo; // 거리 정보
}
//단지주택 상세정보
export interface DistanceInfo {
  totalTime: string; // "1시간 3분"
  totalTimeMinutes: number; // 0
  totalDistance: number; // 196.9
  routes: DistanceRoute[]; // 경로 리스트
}

//단지주택 상세정보
export interface DistanceRoute {
  type: "TRAIN" | "BUS" | "WALK" | "SUBWAY" | string; // 확장 가능
  minutesText: string; // "63분"
  lineText: string; // "SRT"
  line: RouteLine; // 노선 정보 (코드 + 스타일)
  bgColorHex: string; // "#E5046C"
}

//단지주택 상세정보
export interface RouteLine {
  code: number; // 8
  label: string; // "SRT"
  bgColorHex: string; // "#E5046C"
}
