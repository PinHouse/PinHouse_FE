// listings 화면 전역 상수/시트 데이터/탭 구성
// - 어디서 쓰이나요?
//   * 색상/태그 스타일: listingsCardTile.tsx, listingsHooks.tsx(getListingsRental)
//   * 필터 탭/시트: listingsFullSheet.tsx, listingsFilterPanel.tsx
//   * 드롭다운: listingsContentsHeader.tsx (listingPoint)
import {
  FilterOption,
  ListingsCardTileProps,
  PopularKeywordItem,
} from "@/src/entities/listings/model/type";
import { PinPoint, PinPointMap } from "@/src/shared/ui/dropDown/deafult/type";
import { SectionLabelMap, SectionMap } from "./filterPanelModel";

export const REGION_CHECKBOX = [
  {
    key: "all",
    value: "전체",
  },
  {
    key: "pinpoint",
    value: "핀포인트 거리 내 단지만 보기",
  },
] as const;

// 사용처: 공고 유형 뱃지 스타일 (getListingsRental 등)
export const RENT_COLOR_CLASS = {
  영구임대: {
    bg: "bg-[var(--rent-permanent-tag-bg)]",
    text: "text-[var(--rent-permanent-tag-text)]",
  },
  국민임대: {
    bg: "bg-[var(--rent-nation-tag-bg)]",
    text: "text-[var(--rent-nation-tag-text)]",
  },
  매입임대: {
    bg: "bg-[var(--rent-purchase-tag-bg)]",
    text: "text-[var(--rent-purchase-tag-text)]",
  },
  N년임대: {
    bg: "bg-[var(--rent-nyear-tag-bg)]",
    text: "text-[var(--rent-nyear-tag-text)]",
  },
  전세임대: {
    bg: "bg-[var(--rent-jeonse-tag-bg)]",
    text: "text-[var(--rent-jeonse-tag-text)]",
  },
  민간임대: {
    bg: "bg-[var(--rent-private-tag-bg)]",
    text: "text-[var(--rent-private-tag-text)]",
  },
  통합공공임대: {
    bg: "bg-[var(--rent-integrated-tag-bg)]",
    text: "text-[var(--rent-integrated-tag-text)]",
  },
  장기전세: {
    bg: "bg-[var(--rent-longterm-tag-bg)]",
    text: "text-[var(--rent-longterm-tag-text)]",
  },
  행복주택: {
    bg: "bg-[var(--rent-happy-tag-bg)]",
    text: "text-[var(--rent-happy-tag-text)]",
  },
} as const;

// 사용처: 상세 카드 컨테이너 스타일 (listingsCardTile.tsx)
export const containerClass: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "border border-greyscale-grey-100",
  muted: "border border-greyscale-grey-75 bg-greyscale-grey-50",
};

// 사용처: 상세 카드 타이틀 색상 (listingsCardTile.tsx)
export const titleClass: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "text-greyscale-grey-900",
  muted: "text-greyscale-grey-400",
};

// 사용처: 상세 카드 펼치기 버튼 색상 (listingsCardTile.tsx)
export const downButton: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "text-gray-400",
  muted: "text-gray-300",
};

// 사용처: 방 타입 뱃지 스타일 (listingsCardTile.tsx)
export const roomTypeClass: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "text-primary-blue-300 border px-1 py-[1px]",
  muted: "text-primary-blue-75 border-none",
};

// 사용처: 주변 환경 개수 뱃지 스타일 (listingsCardTile.tsx)
export const infraClass: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "text-gray-400 font-semibold",
  muted: "text-gray-400",
};

// 사용처: 필터 패널 상단 탭들 (listingsFilterPanel.tsx)
export const FILTER_OPTIONS: FilterOption[] = [
  {
    key: "region",
    label: "지역",
    component: "RegionFilter",
    type: "select",
  },
  {
    key: "target",
    label: "모집대상",
    component: "TargetGroupFilter",
    type: "select",
  },
  {
    key: "rental",
    label: "임대유형",
    component: "LeaseTypeFilter",
    type: "select",
  },
  {
    key: "housing",
    label: "주택유형",
    component: "HousingTypeFilter",
    type: "select",
  },
];

// 사용처: 상단 드롭다운 옵션 (listingsContentsHeader.tsx)
const listingDrop: PinPoint[] = [
  { key: "all", value: "전체" },
  { key: "recruiting", value: "모집중" },
];

const listingsCompare: PinPoint[] = [
  { key: "deistance", value: "핀포인트 거리 순" },
  { key: "security", value: "보증금 낮은 순" },
  { key: "area", value: "면적 넓은 순" },
  { key: "infra", value: "주변환경 매칭 순" },
];

export const listingsComparePoint: PinPointMap<PinPoint[]> = {
  drop: listingsCompare,
};

// 사용처: 상단 드롭다운 데이터 (listingsContentsHeader.tsx)
export const listingPoint: PinPointMap<PinPoint[]> = {
  drop: listingDrop,
};

// 사용처: 지역 탭 시트 데이터 (listingsFullSheet.tsx)
export const LISTING_PARTIAL_SHEET = {
  metro: [
    { code: "seoul", name: "서울특별시" },
    { code: "incheon", name: "인천광역시" },
    { code: "gyeonggi", name: "경기도" },
  ],

  chungcheong: [
    { code: "sejong", name: "세종특별자치도" },
    { code: "daejeon", name: "대전광역시" },
    { code: "chungbuk", name: "충청북도" },
    { code: "chungnam", name: "충청남도" },
  ],

  honam: [
    { code: "gwangju", name: "광주광역시" },
    { code: "jeonbuk", name: "전북특별자치도" },
    { code: "jeonnam", name: "전라남도" },
  ],

  yeongnam: [
    { code: "busan", name: "부산광역시" },
    { code: "daegu", name: "대구광역시" },
    { code: "ulsan", name: "울산광역시" },
    { code: "gyeongbuk", name: "경상북도" },
    { code: "gyeongnam", name: "경상남도" },
  ],

  gangwonJeju: [
    { code: "whichProvince", name: "강원특별자치도" },
    { code: "jeju", name: "제주특별자치도" },
  ],
};

// 사용처: 지역 탭 섹션 라벨 (listingsFullSheet.tsx)
export const REGION_SECTION_LABEL = {
  metro: "수도권",
  chungcheong: "충청권",
  honam: "호남권",
  yeongnam: "영남권",
  gangwonJeju: "강원·제주권",
} as const;

// 사용처: 모집대상 탭 시트 데이터 (listingsFullSheet.tsx)
export const LISTING_ELIGIBILITY_SHEET = {
  youth: [
    { code: "youth", name: "청년" },
    { code: "college", name: "대학생" },
    { code: "jobSeeker", name: "취업준비생" },
  ],

  family: [
    { code: "newlyMarried", name: "신혼부부" },
    { code: "newborn", name: "신생아" },
  ],

  vulnerable: [
    { code: "senior", name: "고령자(노인)" },
    { code: "disabled", name: "장애인" },
    { code: "singleParent", name: "한부모" },
    { code: "careLeaver", name: "자립준비청년(보호종료아동)" },
    { code: "multiChild", name: "다자녀" },
    { code: "emergencySupport", name: "긴급 주거지원대상자" },
    { code: "housingBenefit", name: "주거급여수급자" },
    { code: "lowIncome", name: "저소득층" },
    { code: "artist", name: "예술인" },
    { code: "patriot", name: "국가유공자" },
    { code: "etc", name: "기타" },
  ],

  housingStatus: [
    { code: "noHouse", name: "무주택자" },
    { code: "noHousehold", name: "무주택가구" },
    { code: "houseOwner", name: "유주택자" },
  ],
} as const;

// 사용처: 모집대상 탭 섹션 라벨 (listingsFullSheet.tsx)
export const ELIGIBILITY_SECTION_LABEL = {
  youth: "청년층",
  family: "가족형",
  vulnerable: "주거취약계층",
  housingStatus: "주택보유 상태",
} as const;

// 사용처: 임대형태 탭 시트 데이터 (listingsFullSheet.tsx)
export const LISTING_RENTAL_SHEET = {
  publicRental: [
    { code: "integratedPublic", name: "통합공공임대" },
    { code: "permanent", name: "영구임대" },
    { code: "national", name: "국민임대" },
    { code: "happy", name: "행복주택" },
  ],

  privateRental: [
    { code: "supportedPrivate", name: "공공지원민간임대주택" },
    { code: "purchase", name: "매입임대" },
    { code: "fiveYear", name: "5년임대" },
    { code: "sixYear", name: "6년임대" },
    { code: "tenYear", name: "10년임대" },
    { code: "fiftyYear", name: "50년임대" },
  ],

  jeonseRental: [
    { code: "longTermJeonse", name: "장기전세" },
    { code: "jeonse", name: "전세임대" },
  ],
} as const;

// 사용처: 임대형태 탭 섹션 라벨 (listingsFullSheet.tsx)
export const RENTAL_SECTION_LABEL = {
  publicRental: "공공 임대",
  privateRental: "민간 임대",
  jeonseRental: "전세형 임대",
} as const;

// 사용처: 주택유형 탭 시트 데이터 (listingsFullSheet.tsx)
export const LISTING_HOUSING_SHEET = {
  housingType: [
    { code: "apartment", name: "아파트" },
    { code: "officetel", name: "오피스텔" },
    { code: "dormitory", name: "기숙사" },
    { code: "multiHouse", name: "다세대주택" },
    { code: "rowHouse", name: "다가구주택" },
    { code: "townhouse", name: "연립주택" },
    { code: "detached", name: "단독주택" },
  ],
} as const;

// 사용처: 주택유형 탭 섹션 라벨 (listingsFullSheet.tsx)
export const HOUSING_SECTION_LABEL = {
  housingType: "주택유형",
} as const;

// 사용처: 필터 탭 라벨/키 (listingsFullSheet.tsx)
export const FILTER_TABS = [
  { key: "region", label: "지역" },
  { key: "target", label: "모집대상" },
  { key: "rental", label: "임대유형" },
  { key: "housing", label: "주택유형" },
] as const;
// 사용처: 필터 탭 현재값 타입
// - listingsFullSheet.tsx: 탭 전환/쿼리 파라미터 처리
// - listingsHooks.tsx: getIndicatorLeft/Width 인자 타입
export type FilterTabKey = (typeof FILTER_TABS)[number]["key"];
// 사용처: 탭별 섹션/라벨 구성 (listingsFullSheet.tsx)
export const TAB_CONFIG: Record<FilterTabKey, { sections: SectionMap; labels: SectionLabelMap }> = {
  region: {
    sections: LISTING_PARTIAL_SHEET,
    labels: REGION_SECTION_LABEL,
  },
  target: {
    sections: LISTING_ELIGIBILITY_SHEET,
    labels: ELIGIBILITY_SECTION_LABEL,
  },
  rental: {
    sections: LISTING_RENTAL_SHEET,
    labels: RENTAL_SECTION_LABEL,
  },
  housing: {
    sections: LISTING_HOUSING_SHEET,
    labels: HOUSING_SECTION_LABEL,
  },
};

export const DETAIL_FILTERS = [
  { key: "distance", label: "거리", isDefault: true },
  { key: "region", label: "지역", isDefault: false },
  { key: "cost", label: "비용", isDefault: false },
  { key: "area", label: "면적", isDefault: false },
  { key: "around", label: "주변", isDefault: false },
] as const;

export type DetailFilterTabKey = (typeof DETAIL_FILTERS)[number]["key"];
export const DEFAULT_DETAIL_SECTION = DETAIL_FILTERS.find(f => f.isDefault)?.key ?? "distance";

export const parseDetailSection = (searchParams: URLSearchParams): DetailFilterTabKey => {
  const raw = searchParams.get("section");
  if (!raw) return DEFAULT_DETAIL_SECTION;
  const isValid = DETAIL_FILTERS.some(f => f.key === raw);
  return isValid ? (raw as DetailFilterTabKey) : DEFAULT_DETAIL_SECTION;
};

export const HomeSheetTile = {
  pinpoints: "핀포인트 선택",
  maxTime: "최대시간",
} as const;

type HomeSheetKey = keyof typeof HomeSheetTile;
type HomeSheetResult = {
  key: HomeSheetKey;
  label: string;
};

export const homeSheetParseObject = (searchParams: URLSearchParams): HomeSheetResult | null => {
  const raw = searchParams.get("mode") as HomeSheetKey | null;
  if (!raw) return null;

  const label = HomeSheetTile[raw];
  if (!label) return null;

  return {
    key: raw,
    label,
  };
};
// 사용처: 검색 결과가 없을 때/빈 검색어 화면에서 추천 태그 클릭 핸들러와 인기 키워드 전달
// - listingsSearchResult/components/searchNoResultView.tsx
// - listingsSearchResult/components/searchEmptyQueryView.tsx
export type HandleSearchTag = {
  handleSearchTag: (keyword: string) => void;
  popular: PopularKeywordItem[];
};
// 사용처: 상세 카드 하단 시트 섹션 타입 (노선/인프라/방타입)
export type InfraSheetSection = "route" | "infra" | "room";
// 사용처: 상세 카드 하단 시트 상태 (닫힘/열림+섹션+리ListingID)
export type SheetState =
  | { open: false }
  | { open: true; section: InfraSheetSection; listingId: string };
// 사용처: 상세 카드 하단 시트 컴포넌트 프롭스 (infraSheet.tsx)
export type InfraSheetProps = {
  sheetState: SheetState;
  onClose: () => void;
};

// 사용처: 시트 내부 콘텐츠 렌더 함수 프롭스 (infraSheet.tsx)
export type RenderContentProps = {
  section: InfraSheetSection | null;
  listingId: string;
};
