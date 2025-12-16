// listings 모델 공용 모듈
// - 어디서 쓰이나요?
//   * 필터 패널: src/features/listings/ui/listingsFilter/listingsFilterPanel.tsx
//   * 리스트 카드: src/features/listings/ui/listingsContents/listingsContentCard.tsx
//   * 상세 카드 필터 바: src/features/listings/ui/listingsCardDetail/components/listingsCardDetailFilterBar.tsx
//   * 이동수단 구간: src/features/listings/ui/listingsCardDetail/infra/TransportIconRenderer.tsx
//   * 검색 훅 옵션: src/entities/listings/hooks/useListingHooks.ts
import React, { ReactNode } from "react";
import { OnOffTrue } from "../../../assets/icons/button/onOffTrue";
import { OnOffFalse } from "@/src/assets/icons/button";
import {
  InfraConfig,
  ListingItem,
  ListingNormalized,
  ListingSearchItem,
  ListingsFilterState,
  RouteType,
} from "@/src/entities/listings/model/type";

import { FireIcon } from "@/src/assets/icons/onboarding/fire";
import { SmallMapPin } from "@/src/assets/icons/onboarding/smallMapPin";
import { SmallHome } from "@/src/assets/icons/home/smallHome";
import { BusIcon } from "@/src/assets/icons/route/busIcon";
import { WalkIcon } from "@/src/assets/icons/route/walkl";
import { TrainIcon } from "@/src/assets/icons/route/subway";
import {
  Animals,
  BikeInfraIcon,
  ChildInfraIcon,
  DumbbellIcons,
  HikingInfraIcon,
  HospitalInfraIcon,
  KidInfraIcon,
  LibraryIcons,
  OlderInfraIcon,
  ParkIcon,
  PoliceInfraIcon,
  ShoeInfraIcon,
  StackInfraIcon,
  StorefrontInfraIcon,
  TaxOfficeIcon,
  WashingMachineInfraIcon,
  WheelchairInfraIcon,
} from "@/src/assets/icons/infra";

// 사용처: TAB_CONFIG 제네릭 타입에서 섹션 구성에 사용 (listingsModel.ts)
export type City = { code: string; name: string };
// 사용처: TAB_CONFIG 제네릭 타입에서 섹션 구성에 사용 (listingsModel.ts)
export type SectionMap = Record<string, ReadonlyArray<City>>;
// 사용처: TAB_CONFIG 제네릭 타입에서 섹션 라벨에 사용 (listingsModel.ts)
export type SectionLabelMap = Record<string, string>;
// 미사용: TransportType (내부에서 직접 참조하지 않음)
export type TransportType = "BUS" | "TRAIN" | "WALK";
export type TransportIconProps = {
  color?: string;
  minutes: number;
};

// 미사용: AllFilterOption 타입은 현재 외부에서 직접 사용하지 않음
export interface AllFilterOption {
  key: string;
  label: string;
  component: string;
  type?: "select" | "radio" | "checkbox" | "sort" | "panel";
  icon?: ReactNode;
}

// 사용처: 리스트/검색 인피니트 쿼리 옵션 (useListingSearchInfiniteQuery 등)
export interface SearchOptions {
  enabled?: boolean;
  keepPreviousData?: boolean;
  staleTime?: number;
}

//공고상세 거리 , 버스 , 지하철 ,자동차
// 미사용: SegmentMode (현재 검색 결과/상세에서 직접 참조하지 않음)
export type SegmentMode = "walk" | "bus" | "subway" | "car";
//공고상세 거리 , 버스 , 지하철 ,자동차
// 미사용: MajorRouteSegment (현재 검색 결과/상세에서 직접 참조하지 않음)
export type MajorRouteSegment = { id: string; mode: SegmentMode; minutes: number; label?: string };

// 사용처: 필터 트리거 아이콘 렌더링 (필터 패널/상세 필터 바)
// - listingsFilterPanel.tsx, listingsCardDetailFilterBar.tsx
export const getAllFilterIcon = (hasSelectedFilters: boolean) =>
  hasSelectedFilters ? <OnOffTrue className="h-9" /> : <OnOffFalse className="h-9" />;

// 미사용: AllFitler_OPTIONS 상수는 현재 UI에서 참조하지 않음
export const AllFitler_OPTIONS: AllFilterOption = {
  key: "allFilter",
  label: "전체필터",
  component: "ListingsFilterPanel",
  type: "panel",
  icon: getAllFilterIcon(false),
};

export type ListingFilterMap = {
  region: (s: ListingsFilterState) => ListingsFilterState["regionType"];
  target: (s: ListingsFilterState) => ListingsFilterState["rentalTypes"];
  rental: (s: ListingsFilterState) => ListingsFilterState["supplyTypes"];
  housing: (s: ListingsFilterState) => ListingsFilterState["houseTypes"];
};
// 사용처: 각 필터 탭의 선택값 접근 (listingsFilterPanel.tsx)
export const filterMap: ListingFilterMap = {
  region: s => s.regionType,
  target: s => s.rentalTypes,
  rental: s => s.supplyTypes,
  housing: s => s.houseTypes,
};

// 사용처: 최근 검색어 컴포넌트에서 검색 실행 핸들러 타입 (listingsSearchHistory.tsx)
export interface SearchResultsProps {
  handleSearch: (keyword: string) => void;
}

export const highlight = (text: string, keyword: string) => {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-primary-blue-50 font-bold text-primary-blue-300">
        {part}
      </span>
    ) : (
      part
    )
  );
};

// 사용처: 리스트 카드 타이틀에서 키워드 중심의 일부만 하이라이트 표시 (listingsContentCard.tsx)
export const HighlightCenteredText = ({
  text,
  keyword,
  range = 5,
}: {
  text: string;
  keyword: string;
  range?: number;
}) => {
  const centered = getKeywordCenteredText(text, keyword, range);
  return <>{highlight(centered, keyword)}</>;
};

export const getKeywordCenteredText = (text: string, keyword: string, range: number = 20) => {
  if (!keyword) return text;

  const index = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (index === -1) return text;

  const start = Math.max(0, index - range);
  const end = Math.min(text.length, index + keyword.length + range);

  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";

  return prefix + text.substring(start, end) + suffix;
};

// 사용처: 공고 리스트/검색 결과를 카드 표현에 맞춘 표준 구조로 변환 (listingsContentCard.tsx)
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

// 사용처: ComplexesInfo 컴포넌트 아이콘/라벨 메타
const COMPLEX_INFO_META = {
  name: {
    icon: SmallHome,
    label: "단지명",
  },
  address: {
    icon: SmallMapPin,
    label: "주소",
  },
  heating: {
    icon: FireIcon,
    label: "난방방식",
  },
} as const;

// 사용처: 상세 카드 타일 상단 기본 정보 표시 (listingsCardTtileInfra.tsx)
export const ComplexesInfo = ({
  infoKey,
  infoValue,
}: {
  infoKey: keyof typeof COMPLEX_INFO_META;
  infoValue: string;
}) => {
  const meta = COMPLEX_INFO_META[infoKey];
  const Icon = meta.icon;

  return (
    <div className="flex items-center">
      <Icon height={20} width={20} />
      <span className="flex items-center justify-center p-1 text-xs-13">
        {infoValue ?? meta.label}
      </span>
    </div>
  );
};

// 사용처: 총 소요시간 텍스트("1시간 10분") → 분(70) 변환 (TransportIconRenderer.tsx)
export const parseTotalMinutes = (timeText: string): number => {
  const hourMatch = timeText.match(/(\d+)\s*시간/);
  const minuteMatch = timeText.match(/(\d+)\s*분/);
  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  return hours * 60 + minutes;
};

// 사용처: 버스 아이콘 바 너비 산정 (src/assets/icons/route/busIcon.tsx)
export const getWidthByMinutes = (minutes: number) => {
  if (minutes <= 5) return 28;
  if (minutes <= 15) return 36;
  if (minutes <= 30) return 50;
  if (minutes <= 60) return 60;
  return 68;
};

// 사용처: 구간 소요시간 텍스트("12분") → 분(12) 변환 (TransportIconRenderer.tsx)
export const parseMinutes = (minutesText: string): number => {
  const match = minutesText.match(/\d+/);
  return match ? Number(match[0]) : 0;
};

// 사용처: 이동수단 타입별 아이콘 매핑 (TransportIconRenderer.tsx)
export const TRANSPORT_ICON_MAP: Record<RouteType, React.ComponentType<TransportIconProps>> = {
  BUS: BusIcon,
  SUBWAY: TrainIcon,
  WALK: WalkIcon,
  TRAIN: TrainIcon,
};

// 사용처: 인프라 라벨/아이콘 목록 (Environment 렌더링용)
// - 변환 경로: API 응답 라벨(한글) → INFRA_LABEL_TO_KEY → key → INFRA_ENVIRONMENT_CONFIG
// - 참조: useListingInfraDetail(select), ui/listingsCardDetail/infra/components/environment.tsx
export const INFRA_ENVIRONMENT_MAP = [
  { key: "police", value: "파출소", icons: <PoliceInfraIcon /> },
  { key: "tax_office", value: "세무소", icons: <TaxOfficeIcon /> },
  { key: "hospital_pharmacy", value: "병원·약국", icons: <HospitalInfraIcon /> },
  { key: "mart_department", value: "대형마트·백화점", icons: <StorefrontInfraIcon /> },
  { key: "library", value: "도서관", icons: <LibraryIcons /> },
  { key: "park", value: "공원", icons: <ParkIcon /> },
  { key: "animal_facility", value: "동물 관련시설", icons: <Animals /> },
  { key: "sports_facility", value: "스포츠 시설", icons: <DumbbellIcons /> },
  { key: "bike_path", value: "자전거길", icons: <BikeInfraIcon /> },
  { key: "walking_path", value: "산책로", icons: <ShoeInfraIcon /> },
  { key: "hiking_trail", value: "등산로", icons: <HikingInfraIcon /> },
  { key: "child", value: "아동", icons: <KidInfraIcon /> },
  { key: "youth", value: "청소년", icons: <ChildInfraIcon /> },
  { key: "senior", value: "노인", icons: <OlderInfraIcon /> },
  { key: "disabled", value: "장애인", icons: <WheelchairInfraIcon /> },
  { key: "vulnerable", value: "차상위·취약계층", icons: <StackInfraIcon /> },
  { key: "washingMachine", value: "세탁소", icons: <WashingMachineInfraIcon /> },
] as const;

// 사용처: API 라벨(한글) → 내부 key 매핑
// - 참조: useListingInfraDetail(select 단계)
export const INFRA_LABEL_TO_KEY = {
  파출소: "police",
  세무소: "tax_office",
  "병원·약국": "hospital_pharmacy",
  "대형마트·백화점": "mart_department",
  도서관: "library",
  공원: "park",
  "동물 관련시설": "animal_facility",
  "스포츠 시설": "sports_facility",
  자전거길: "bike_path",
  산책로: "walking_path",
  등산로: "hiking_trail",
  아동: "child",
  청소년: "youth",
  노인: "senior",
  장애인: "disabled",
  "차상위·취약계층": "vulnerable",
  세탁소: "washingMachine",
} as const;

// 사용처: key → 구성(표시값/아이콘) 조회 맵
// - 참조: useListingInfraDetail(select 결과), Environment 컴포넌트 렌더링
export const INFRA_ENVIRONMENT_CONFIG: Record<string, InfraConfig> = INFRA_ENVIRONMENT_MAP.reduce(
  (acc, item) => {
    acc[item.key] = {
      key: item.key,
      value: item.value,
      icon: item.icons,
    };
    return acc;
  },
  {} as Record<string, InfraConfig>
);

/**
 * 방 타입 관련 섹션 헤더에 쓰이는 텍스트 포맷
 * - title: 섹션 제목
 * - des: 부가 설명 문구
 */
export type RoomTitleDesType = {
  title: string;
  des: string;
};
/**
 * 방 타입 상세 상단 탭별(노선/주변환경/방타입) 헤더 문구 모음
 */
export interface RoomTypeTitleDes {
  route: RoomTitleDesType;
  infra: RoomTitleDesType;
  room: RoomTitleDesType;
}
/**
 * 방 타입 상세 화면에서 사용하는 기본 헤더 문구
 */
export const ROOM_TYPE_TITLE_DES: RoomTypeTitleDes = {
  route: {
    title: "노선정보",
    des: "알수없음",
  },
  infra: {
    title: "주변환경 정보",
    des: "인근 산책로, 자전거길, 생활편의시설까지 한눈에 확인해보세요.",
  },
  room: {
    title: "방타입",
    des: "방타입 을 상세히",
  },
};

/**
 * 보증금 상세 탭 키
 * - min: 최소 납입
 * - normal: 기본
 * - max: 최대 납입
 */
export type DepositTab = "min" | "normal" | "max";

/**
 * 보증금 상세에서 사용하는 탭 구성(라벨 포함)
 */
export const DEPOSIT_TABS: { key: DepositTab; label: string }[] = [
  { key: "min", label: "보증금 최소납입" },
  { key: "normal", label: "보증금 기본" },
  { key: "max", label: "보증금 최대납입" },
];

/**
 * ㎡(제곱미터)를 평 단위 문자열로 변환
 * - 소수점 한 자리 고정
 * - 잘못된 입력(m2 = 0/NaN)은 "0" 반환
 */
export const toPyeong = (m2: number) => {
  if (!m2 || Number.isNaN(m2)) return "0";
  return (m2 / 3.305785).toFixed(1);
};
