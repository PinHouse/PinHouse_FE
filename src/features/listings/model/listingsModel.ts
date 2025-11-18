import { PinPoint, PinPointMap } from "@/src/shared/ui/dropDown/deafult/type";

export const listingsHistory = ["행복주택", "청년", "등등"];
export const listingsResults = ["행복주택", "청년", "등등"];

export interface FilterOption {
  key: string;
  label: string;
  component: string;
  type?: "select" | "radio" | "checkbox" | "sort" | "panel";
}

export interface ListingState {
  status: string;
  setStatus: (value: string) => void;
  reset: () => void;
}

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

export const FILTER_OPTIONS: FilterOption[] = [
  {
    key: "region",
    label: "지역선택",
    component: "RegionFilter",
    type: "select",
  },
  {
    key: "targetGroup",
    label: "모집대상",
    component: "TargetGroupFilter",
    type: "select",
  },
  {
    key: "leaseType",
    label: "임대유형",
    component: "LeaseTypeFilter",
    type: "select",
  },
  {
    key: "housingType",
    label: "주택유형",
    component: "HousingTypeFilter",
    type: "select",
  },
  {
    key: "noticeStatus",
    label: "공고상태",
    component: "NoticeStatusFilter",
    type: "radio",
  },
  {
    key: "sortOption",
    label: "정렬",
    component: "SortOption",
    type: "sort",
  },
  {
    key: "noticeCount",
    label: "공고개수",
    component: "NoticeCount",
  },
];

const listingDrop: PinPoint[] = [
  { key: "all", value: "전체" },
  { key: "recruiting", value: "모집중" },
];

export const listingPoint: PinPointMap<PinPoint[]> = {
  drop: listingDrop,
};

export const LISTING_PARTIAL_SHEET = {
  metro: [
    { cityCode: "seoul", cityName: "서울특별시" },
    { cityCode: "incheon", cityName: "인천광역시" },
    { cityCode: "gyeonggi", cityName: "경기도" },
  ],

  chungcheong: [
    { cityCode: "sejong", cityName: "세종특별자치도" },
    { cityCode: "daejeon", cityName: "대전광역시" },
    { cityCode: "chungbuk", cityName: "충청북도" },
    { cityCode: "chungnam", cityName: "충청남도" },
  ],

  honam: [
    { cityCode: "gwangju", cityName: "광주광역시" },
    { cityCode: "jeonbuk", cityName: "전북특별자치도" },
    { cityCode: "jeonnam", cityName: "전라남도" },
  ],

  yeongnam: [
    { cityCode: "busan", cityName: "부산광역시" },
    { cityCode: "daegu", cityName: "대구광역시" },
    { cityCode: "ulsan", cityName: "울산광역시" },
    { cityCode: "gyeongbuk", cityName: "경상북도" },
    { cityCode: "gyeongnam", cityName: "경상남도" },
  ],

  gangwonJeju: [
    { cityCode: "whichProvince", cityName: "강원특별자치도" },
    { cityCode: "jeju", cityName: "제주특별자치도" },
  ],
};

export const REGION_SECTION_LABEL = {
  metro: "수도권",
  chungcheong: "충청권",
  honam: "호남권",
  yeongnam: "영남권",
  gangwonJeju: "강원·제주권",
} as const;

export const FILTER_TABS = [
  { key: "region", label: "지역" },
  { key: "target", label: "모집대상" },
  { key: "rental", label: "임대유형" },
  { key: "housing", label: "주택유형" },
] as const;

export type FilterTabKey = (typeof FILTER_TABS)[number]["key"];

export function getIndicatorLeft(activeTab: FilterTabKey) {
  switch (activeTab) {
    case "region":
      return 20;
    case "target":
      return 20 + 55;
    case "rental":
      return 20 + 55 + 80;
    case "housing":
      return 20 + 55 + 77 + 84;
  }
}

export function getIndicatorWidth(activeTab: FilterTabKey) {
  switch (activeTab) {
    case "region":
      return 32;
    case "target":
      return 60;
    case "rental":
      return 60;
    case "housing":
      return 60;
  }
}
