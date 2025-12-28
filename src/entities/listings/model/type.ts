// Listings 도메인 전역 타입/응답 정의
// - 어디서 쓰이나요?
//   * 리스트/검색 훅: useListingHooks.ts (요청/응답/필터 타입)
//   * UI 컴포넌트: listingsContentCard.tsx, listingsFullSheet.tsx, listingsCardTile.tsx 등
//   * 상세 훅/컴포넌트: useListingDetailHooks.ts, TransportIconRenderer.tsx, Environment.tsx
import { getListingsRental } from "@/src/features/listings/hooks/listingsHooks";
import { INFRA_LABEL_TO_KEY, RENT_COLOR_CLASS } from "@/src/features/listings/model";
import { HTTP_METHODS, PINPOINT_CREATE_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";

import { InfiniteData } from "@tanstack/react-query";

/**
 * 공고 list param
 */
// 사용처: 공고 목록/검색 API 페이징 파라미터 (useListingHooks.ts)
export interface ListingListParams {
  page: number;
  offSet: number;
}
/**
 * 검색어 list param
 */
// 사용처: 공고 검색 API 파라미터 (useListingHooks.ts)
export interface ListingSearchParams extends ListingListParams {
  q: string;
  sortType: string;
  status?: string;
}

/**
 * 공고 리스트 필터
 */
// 사용처: 목록 조회 바디 필터 (지역/대상/임대/주택/정렬) — useListingHooks.ts
export interface ListingListFilterBody {
  regionType: string[];
  rentalTypes: string[];
  supplyTypes: string[];
  houseTypes: string[];
  status: string;
  sortType: string;
}

// 개별 항목 타입 공고 조회
// 사용처: 공고 목록 개별 항목 (list 카드)
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
// 사용처: 공고 목록 응답 (페이지네이션)
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
// 사용처: 공고 검색 결과 항목 (키워드 검색)
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

// 사용처: UI 표준화된 카드 데이터 (filterPanelModel.tsx의 normalizeListing 반환 타입)
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
// 사용처: 좋아요 토글(간소 타입) — listingsHooks.tsx LikeType
export type ListingItemMinimal = Pick<ListingItem, "id" | "liked">;
export type HttpMethod = keyof typeof HTTP_METHODS;

/**
 *@좋아요반환
 */
// 사용처: 좋아요 API 응답
export interface LikeReturn {
  success: boolean;
  code: number;
  message: string;
}

/**
 *@param 좋아요파라메터
 */
// 사용처: 좋아요 토글 변수 — useToogleLike 훅
export type ToggleLikeVariables = {
  method: "post" | "delete";
  targetId: number;
  liked?: boolean;
  type: "NOTICE";
};

/**
 * 무한스크롤 공고 LIST
 */
// 사용처: 리스트 카드 컴포넌트 프롭스
export interface ListingContentsCardsProps {
  data: ListingItem[];
}
/**
 * 무한스크롤 공고 LIST
 */
// 사용처: 무한 스크롤 리스트 프롭스 (페이지네이션 상태)
export interface ListingContentsListProps {
  data: InfiniteData<ListingListPage> | undefined;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  isBottom?: boolean;
}
/**
 * 총공고 카운트
 */
// 사용처: 리스트 헤더 컴포넌트 — 총 공고 수 표시
export interface ListingsContentHeaderProps {
  totalCount: number | null;
}

// 사용처: 전체 필터 시트 상태 (Zustand)
export interface FilterSheetState {
  open: boolean;

  openSheet: () => void;
  closeSheet: () => void;
}

// 사용처: 리스트 전체/상태 탭 (Zustand)
export interface ListingState {
  status: string;
  setStatus: (value: string) => void;
  reset: () => void;
}

// 사용처: 검색 페이지 상태/정렬 (Zustand)
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
// 사용처: 인기 검색어 항목 — usePopularSearchQuery 훅/검색 화면
export interface PopularKeywordItem {
  keyword: string;
  count: number;
  lastSearchedAt: string;
}

/**
 * 인기검색어 Data
 */

// 사용처: 인기 검색어 API 응답 타입
export interface PopularKeywordResponse extends IResponse<PopularKeywordItem[]> {
  data: PopularKeywordItem[];
}

export type FilterOptionKey = "region" | "target" | "rental" | "housing";

// 사용처: 필터 탭 정의 — listingsModel.ts의 FILTER_OPTIONS
export interface FilterOption {
  key: FilterOptionKey;
  label: string;
  component: string;
  type?: "select" | "radio" | "checkbox" | "sort" | "panel";
}

// 사용처: 목록 필터 값/토글/리셋 (Zustand) — listingsStore.ts
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

// 사용처: 상세 기본 정보 섹션
export interface BasicInfo {
  id: string;
  type: string;
  housingType: string;
  supplier: string;
  name: string;
  period: string;
}

// 사용처: 상세 — 단지 리스트 묶음 (필터/비필터)
export interface ComplexList {
  totalCount: number;
  complexes: Complex[];
}

// 사용처: 상세 — 주요 노선/이동 경로 정보
export interface ListingRoute {
  id: string;
  label: string;
  minutes?: number;
  distanceKm?: number;
  description?: string;
  stations?: string[];
}

// 사용처: 상세 — 방 타입/면적/임대료 정보
export interface ListingRoomTypeInfo {
  id: string;
  name: string;
  supplyArea?: string;
  exclusiveArea?: string;
  deposit?: string;
  monthlyRent?: string;
}

// 공고상세조회
// 사용처: 상세 — 단지(Complex) 요약 정보
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
// 사용처: 상세 응답 데이터 루트
export interface ListingDetailData {
  basicInfo: BasicInfo;
  filtered: ComplexList;
  nonFiltered: ComplexList;
}

// 사용처: (요청 바디) 공고 탐색 파라미터
export interface LstingBody {
  sortType: string;
  pinPointId: string;
  transitTime: number;
  maxDeposit: number;
  maxMonthPay: number;
  typeCode?: string[];
  facilities?: string[];
  region?: string[];
  targetType?: string[];
}
// 사용처: 임대 유형 키 타입 — RENT_COLOR_CLASS 기반 (listingsHooks.tsx)
export type RentType = keyof typeof RENT_COLOR_CLASS;
export type ListingDetailResponse = IResponse<ListingDetailData>;
export type RoomVariant = "default" | "muted";
export type ListingsCardTileProps = {
  listing: Complex;
  variant: RoomVariant;
};

// 사용처: 상세 기본 정보에 색상 정보 추가 (getListingsRental)
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
// 사용처: 상세 카드 타일 데이터 (ListingsCardTileDetails 등)
export interface ListingSummary {
  id: string;
  name: string;
  address: string;
  heating: string;
  totalHouseholds: number;
  totalSupplyInNotice: number;
  infra: string[];
  unitCount: number;
  unitTypes: string[];
  distance: DistanceInfo;
}
//단지주택 상세정보
// 사용처: 총 소요시간/거리 및 구간 리스트 — TransportIconRenderer.tsx
export interface DistanceInfo {
  totalTime: string;
  totalTimeMinutes: number;
  totalDistance: number;
  segments: RouteInfo[];
}

// 사용처: 구간 이동수단 타입 (아이콘 렌더링/색상)
export type RouteType = "BUS" | "SUBWAY" | "WALK" | "TRAIN"; // API 확장 대비

//단지주택 상세정보
// 사용처: 구간 상세 정보 (시간/노선/색상)
export interface RouteInfo {
  type: RouteType;
  minutes: number;
  labelText: string | null;
  line: LineInfo | null; // WALK처럼 line이 없는 경우 대비
  colorHex: string;
}

//단지주택 상세정보
// 사용처: 라인(지하철/버스 노선) 정보
export interface LineInfo {
  code: number;
  label: string;
  bgColorHex: string;
}
// 사용처: 상세 ‘단지 기본정보’ 키-값 페어 (ComplexesInfo 렌더)
export type RentalInfoItem = {
  key: "name" | "address" | "heating";
  value: string;
};

// 사용처: 상세 카드 타일 ViewModel (useListingDetailHooks.ts select 결과)
export interface ListingRentalDetailVM {
  distance: ListingSummary["distance"];
  rentalInfo: RentalInfoItem[];
  id: string;
  infra: ListingSummary["infra"];
  totalHouseholds: number;
  totalSupplyInNotice: number;
  unitCount: number;
  unitTypes: string[];
}

// 사용처: 인프라 상세 API 응답 (useListingInfraDetail)
export type Environmnt = {
  infra: string[];
};

// 사용처: 인프라 아이템 구성 (키/라벨/아이콘) — INFRA_ENVIRONMENT_CONFIG
export interface InfraConfig {
  key: string;
  value: string;
  icon: React.ReactNode;
}

// 사용처: API 라벨을 제한된 키로 타입 안전 처리
export type InfraLabel = keyof typeof INFRA_LABEL_TO_KEY;

// 금액 단위 타입 (Deposit Breakdown)
export interface DepositAmount {
  /** 총 보증금 */
  total: number;
  /** 계약금 */
  contract: number;
  /** 잔금 */
  balance: number;
  /** 월 납부액 */
  monthPay: number;
}
//보증금 구간 타입 (최소 / 일반 / 최대)
export interface DepositRange {
  min: DepositAmount;
  normal: DepositAmount;
  max: DepositAmount;
}
//타입별 주택 정보 (메인 타입)
export interface ListingUnitType {
  /** 타입 고유 ID */
  typeId: string;
  /** 타입 코드 (ex: 34) */
  typeCode: string;
  /** 썸네일 이미지 URL */
  thumbnail: string | null;
  /** 공급 세대 수 */
  quota: number;
  /** 전용면적 (㎡) */
  exclusiveAreaM2: number;
  /** 보증금 정보 */
  deposit: DepositRange;
  /** 관심 여부 */
  liked: boolean;
  group: [string];
}

// 공통 Enum (타입 안정성 ↑)
export type TransportType = "AIR" | "TRAIN" | "BUS" | "SUBWAY" | "WALK";
export type StopRole = "START" | "TRANSFER" | "ARRIVE";
//Line 타입
export interface TransportLine {
  code: number;
  label: string;
  bgColorHex: string;
}

export interface RouteDistance {
  colorHex: string;
  line: string | null;
  minutes: number;
  labelText: string;
  type: string;
}

export interface RouteStepLine {
  line: string;
}

export interface RouteStep {
  action?: string | null;
  colorHex?: string | null;
  line?: RouteStepLine | null;
  minutes?: string | null;
  primaryText?: string | null;
  stepIndex: number;
  stopName?: string | number | null;
  type?: TransportType | string | null;
  secondaryText: string;
}

export interface RouteSummary {
  displayText?: string;
  totalDistanceKm?: number;
  totalFareWon?: number;
  totalMinutes?: number;
  transferCount?: number;
}
//이동구간
export interface RouteSegment {
  distance: RouteDistance[];
  routeIndex: number;
  steps: RouteStep[];
  summary: RouteSummary[] | RouteSummary;
}

export interface RouteStop {
  role: StopRole;
  type: TransportType;
  stopName: string;
  lineText: string | null;
  line: TransportLine | null;
  bgColorHex: string | null;
}

export interface ListingRouteInfo {
  totalCount: number;
  routes: RouteSegment[];
}

export type UseListingsHooksType = {
  id: string;
  queryK: string;
  url: string;
};

export type UseListingsDetailHooksType = {
  queryK: string;
  url: EndPointKey;
};

export type UseListingsHooksWithParam<TParam extends object> = {
  id: string;
  queryK: string;
  url: string;
  params: TParam;
};

export interface RequestOptions<TQuery extends object = object> {
  query?: TQuery;
}

export const endPoint = {
  pinpoint: PINPOINT_CREATE_ENDPOINT,
} as const;

type EndPointKey = keyof typeof endPoint;
export interface PinPointPlace {
  id: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  isFirst: boolean;
}
