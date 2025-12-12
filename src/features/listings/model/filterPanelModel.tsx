import React, { ReactNode } from "react";
import { OnOffTrue } from "../../../assets/icons/button/onOffTrue";
import { OnOffFalse } from "@/src/assets/icons/button";
import {
  ListingItem,
  ListingNormalized,
  ListingSearchItem,
  ListingsFilterState,
} from "@/src/entities/listings/model/type";

import { FireIcon } from "@/src/assets/icons/onboarding/fire";
import { HomeIcon } from "@/src/assets/icons/home";
import { SmallMapPin } from "@/src/assets/icons/onboarding/smallMapPin";
import { SmallHome } from "@/src/assets/icons/home/smallHome";

export interface AllFilterOption {
  key: string;
  label: string;
  component: string;
  type?: "select" | "radio" | "checkbox" | "sort" | "panel";
  icon?: ReactNode;
}
export const getAllFilterIcon = (hasSelectedFilters: boolean) =>
  hasSelectedFilters ? <OnOffTrue className="h-9" /> : <OnOffFalse className="h-9" />;
export const AllFitler_OPTIONS: AllFilterOption = {
  key: "allFilter",
  label: "전체필터",
  component: "ListingsFilterPanel",
  type: "panel",
  icon: getAllFilterIcon(false),
};
export type City = { code: string; name: string };
export type SectionMap = Record<string, ReadonlyArray<City>>;
export type SectionLabelMap = Record<string, string>;
export type ListingFilterMap = {
  region: (s: ListingsFilterState) => ListingsFilterState["regionType"];
  target: (s: ListingsFilterState) => ListingsFilterState["rentalTypes"];
  rental: (s: ListingsFilterState) => ListingsFilterState["supplyTypes"];
  housing: (s: ListingsFilterState) => ListingsFilterState["houseTypes"];
};
export const filterMap: ListingFilterMap = {
  region: s => s.regionType,
  target: s => s.rentalTypes,
  rental: s => s.supplyTypes,
  housing: s => s.houseTypes,
};

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

export interface SearchOptions {
  enabled?: boolean;
  keepPreviousData?: boolean;
  staleTime?: number;
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

export const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}분`;
  if (mins === 0) return `${hours}시간`;

  return `${hours}시간 ${mins}분`;
};

// 공고상세 단지정보 , 상세정보, 난방방식
export type ComplexKey = "complexInfo" | "detailInfo" | "heatingType";
// 공고상세 아이콘
export type ComplexIcon = React.FC<React.SVGProps<SVGSVGElement>>;
// 공고상세 단지정보1
export type ComplexInfo = {
  key: ComplexKey;
  value: string;
};

//공고상세 거리 , 버스 , 지하철 ,자동차
export type SegmentMode = "walk" | "bus" | "subway" | "car";
//공고상세 거리 , 버스 , 지하철 ,자동차
export type MajorRouteSegment = { id: string; mode: SegmentMode; minutes: number; label?: string };

export const majorRoute = {
  distanceKm: 0,
  totalMinutes: 45,
  legs: [
    { id: "walk-1", mode: "walk", minutes: 3 },
    { id: "bus-1102", mode: "bus", minutes: 12, label: "1102" },
    { id: "bus-9401", mode: "bus", minutes: 15, label: "9401, G8110" },
    { id: "subway-1", mode: "subway", minutes: 15, label: "1호선" },
  ] as MajorRouteSegment[],
};

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

//   key: ComplexKey;
//   label: string;
//   icon: ComplexIcon;

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
    <div className="flex items-center gap-1">
      <Icon stroke="#BBBAC5" />
      <span>{infoValue}</span>
    </div>
  );
};

// export const COMPLEXES_INFO: {
//   key: ComplexKey;
//   label: string;
//   icon: ComplexIcon;
// }[] = [
//   { key: "complexInfo", label: "단지정보", icon: SmallHome },
//   { key: "detailInfo", label: "상세정보", icon: SmallMapPin },
//   { key: "heatingType", label: "난방방식", icon: FireIcon },
// ];
