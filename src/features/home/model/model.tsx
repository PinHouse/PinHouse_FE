import { SearchCategory } from "@/src/entities/home/model/type";
import { ReactNode } from "react";
import { GlobalNoticeIncon } from "@/src/assets/icons/home/globalDoc";
import { GlobalBuilding } from "@/src/assets/icons/home/globalBuilding";
import { GlobalPerson } from "@/src/assets/icons/home/globalPerson";
import { GlobalMapPin } from "@/src/assets/icons/home/globalMappin";
import { GlobalHouse } from "@/src/assets/icons/home/globalHouse";

export const SEARCH_CATEGORY_CONFIG: Record<SearchCategory, { label: string; icon: ReactNode }> = {
  notices: { label: "공고명", icon: <GlobalNoticeIncon /> },
  complexes: { label: "단지명", icon: <GlobalBuilding /> },
  targetGroups: { label: "모집대상", icon: <GlobalPerson /> },
  regions: { label: "지역", icon: <GlobalMapPin /> },
  houseTypes: { label: "주택유형", icon: <GlobalHouse /> },
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
