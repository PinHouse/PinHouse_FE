import { FilterOption } from "@/src/entities/listings/model/type";
import { PinPoint, PinPointMap } from "@/src/shared/ui/dropDown/deafult/type";
import { SectionLabelMap, SectionMap } from "./filterPanelModel";

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

const listingDrop: PinPoint[] = [
  { key: "all", value: "전체" },
  { key: "recruiting", value: "모집중" },
];

export const listingPoint: PinPointMap<PinPoint[]> = {
  drop: listingDrop,
};

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

export const REGION_SECTION_LABEL = {
  metro: "수도권",
  chungcheong: "충청권",
  honam: "호남권",
  yeongnam: "영남권",
  gangwonJeju: "강원·제주권",
} as const;

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

export const ELIGIBILITY_SECTION_LABEL = {
  youth: "청년층",
  family: "가족형",
  vulnerable: "주거취약계층",
  housingStatus: "주택보유 상태",
} as const;

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

export const RENTAL_SECTION_LABEL = {
  publicRental: "공공 임대",
  privateRental: "민간 임대",
  jeonseRental: "전세형 임대",
} as const;

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

export const HOUSING_SECTION_LABEL = {
  housingType: "주택유형",
} as const;

export const FILTER_TABS = [
  { key: "region", label: "지역" },
  { key: "target", label: "모집대상" },
  { key: "rental", label: "임대유형" },
  { key: "housing", label: "주택유형" },
] as const;

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

export type FilterTabKey = (typeof FILTER_TABS)[number]["key"];
export const DETAIL_FILTERS = [
  { key: "distance", label: "거리" },
  { key: "region", label: "지역" },
  { key: "cost", label: "비용" },
  { key: "area", label: "면적" },
  { key: "around", label: "주변" },
] as const;
