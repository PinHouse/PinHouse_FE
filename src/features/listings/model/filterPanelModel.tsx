import React, { ReactNode } from "react";
import { OnOffTrue } from "../../../assets/icons/button/onOffTrue";
import { OnOffFalse } from "@/src/assets/icons/button";
import {
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
import { InfraSheetSection } from "./listingsModel";

export type City = { code: string; name: string };
export type SectionMap = Record<string, ReadonlyArray<City>>;
export type SectionLabelMap = Record<string, string>;
export type TransportType = "BUS" | "TRAIN" | "WALK";
export type TransportIconProps = {
  color?: string;
  minutes: number;
};
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

//공고상세 거리 , 버스 , 지하철 ,자동차
export type SegmentMode = "walk" | "bus" | "subway" | "car";
//공고상세 거리 , 버스 , 지하철 ,자동차
export type MajorRouteSegment = { id: string; mode: SegmentMode; minutes: number; label?: string };

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

export const parseTotalMinutes = (timeText: string): number => {
  const hourMatch = timeText.match(/(\d+)\s*시간/);
  const minuteMatch = timeText.match(/(\d+)\s*분/);
  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  return hours * 60 + minutes;
};

export const getWidthByMinutes = (minutes: number) => {
  if (minutes <= 5) return 28;
  if (minutes <= 15) return 36;
  if (minutes <= 30) return 50;
  if (minutes <= 60) return 60;
  return 68;
};

export const parseMinutes = (minutesText: string): number => {
  const match = minutesText.match(/\d+/);
  return match ? Number(match[0]) : 0;
};

export const TRANSPORT_ICON_MAP: Record<RouteType, React.ComponentType<TransportIconProps>> = {
  BUS: BusIcon,
  SUBWAY: TrainIcon,
  WALK: WalkIcon,
  TRAIN: TrainIcon,
};
