import { GlobalBuilding } from "@/src/assets/icons/home/globalBuilding";
import { GlobalNoticeIncon } from "@/src/assets/icons/home/globalDoc";
import { GlobalHouse } from "@/src/assets/icons/home/globalHouse";
import { GlobalMapPin } from "@/src/assets/icons/home/globalMappin";
import { GlobalPerson } from "@/src/assets/icons/home/globalPerson";
import {
  GlobalListType,
  GlobalSearchSection,
  SearchCategory,
} from "@/src/entities/home/model/type";
import { ReactNode } from "react";

export const SEARCH_CATEGORY_CONFIG: Record<SearchCategory, { label: string; icon: ReactNode }> = {
  notices: { label: "공고명", icon: <GlobalNoticeIncon /> },
  complexes: { label: "단지명", icon: <GlobalBuilding /> },
  targetGroups: { label: "모집대상", icon: <GlobalPerson /> },
  regions: { label: "지역", icon: <GlobalMapPin /> },
  houseTypes: { label: "주택유형", icon: <GlobalHouse /> },
};

export const useHomeGlobalSearch = (globalData?: GlobalListType): GlobalSearchSection[] => {
  if (!globalData) return [];

  return [
    {
      category: "notices",
      content: globalData.notices.content,
      hasNext: globalData.notices.hasNext,
    },
    {
      category: "complexes",
      content: globalData.complexes.content,
      hasNext: globalData.complexes.hasNext,
    },
    {
      category: "targetGroups",
      content: globalData.targetGroups.content,
      hasNext: globalData.targetGroups.hasNext,
    },
    {
      category: "regions",
      content: globalData.regions.content,
      hasNext: globalData.regions.hasNext,
    },
    {
      category: "houseTypes",
      content: globalData.houseTypes.content,
      hasNext: globalData.houseTypes.hasNext,
    },
  ];
};

export const CATEGORY_MAP = {
  notices: "NOTICE",
  complexes: "COMPLEX",
  targetGroups: "TARGET_GROUP",
  regions: "REGION",
  houseTypes: "HOUSE_TYPE",
} as const;

export type SearchCategoryMap = keyof typeof CATEGORY_MAP;
export type ApiCategory = (typeof CATEGORY_MAP)[SearchCategoryMap];
