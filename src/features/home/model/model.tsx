import { SearchCategory } from "@/src/entities/home/model/type";
import { ReactNode } from "react";
import { GlobalNoticeIncon } from "@/src/assets/icons/home/globalDoc";
import { GlobalBuilding } from "@/src/assets/icons/home/globalBuilding";
import { GlobalPerson } from "@/src/assets/icons/home/globalPerson";
import { GlobalMapPin } from "@/src/assets/icons/home/globalMappin";
import { GlobalHouse } from "@/src/assets/icons/home/globalHouse";
import { HomeScreenHomeIcon } from "@/src/assets/icons/home/home";
import { LeftButton } from "@/src/assets/icons/button";
import { HomeScreenTask } from "@/src/assets/icons/home/homeScreenTask";

export const SEARCH_CATEGORY_CONFIG: Record<SearchCategory, { label: string; icon: ReactNode }> = {
  notices: { label: "공고명", icon: <GlobalNoticeIncon /> },
  complexes: { label: "단지명", icon: <GlobalBuilding /> },
  targetGroups: { label: "모집대상", icon: <GlobalPerson /> },
  regions: { label: "지역", icon: <GlobalMapPin /> },
  houseTypes: { label: "주택유형", icon: <GlobalHouse /> },
};

export const SearchNoResultDescriptions = {
  notices: "모집 공고가 없습니다.",
  complexes: "모집 단지가 없습니다.",
  targetGroups: "모집 대상이 없습니다.",
  regions: "모집 지역이 없습니다.",
  houseTypes: "모집 주택유형이 없습니다.",
} as const;

export const CATEGORY_MAP = {
  notices: "NOTICE",
  complexes: "COMPLEX",
  targetGroups: "TARGET_GROUP",
  regions: "REGION",
  houseTypes: "HOUSE_TYPE",
} as const;

export type SearchCategoryMap = keyof typeof CATEGORY_MAP;
export type ApiCategory = (typeof CATEGORY_MAP)[SearchCategoryMap];

export const PERSONAL_SHORTCUTS = [
  {
    id: "tour",
    title: "나에게 맞는 방 둘러보기",
    description: "예산·거리·주변 환경을 기반으로\n나의 조건에 맞는 방을 탐색해 보세요",
    icon: <HomeScreenHomeIcon />,
    button: <LeftButton width={25} />,
    message: "임대주택 탐색이 처음이라면?",
    path: "/listings",
  },
  {
    id: "save-condition",
    title: "자격진단 하러가기",
    description: "나이·소득·자산·결혼 여부에 따른 조건을\n자격진단으로 맞는 공고를 확인해 보세요",
    icon: <HomeScreenTask />,
    button: <LeftButton width={25} />,
    message: "나의 공공 임대주택 지원자격을 알고싶다면?",
    path: "/eligibility",
  },
] as const;
