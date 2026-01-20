import { GlobalBuilding } from "@/src/assets/icons/home/globalBuilding";
import { GlobalNoticeIncon } from "@/src/assets/icons/home/globalDoc";
import { GlobalHouse } from "@/src/assets/icons/home/globalHouse";
import { GlobalMapPin } from "@/src/assets/icons/home/globalMappin";
import { GlobalPerson } from "@/src/assets/icons/home/globalPerson";
import { HomeResultSectionHeader } from "@/src/features/home";
import { HomeResultSectionItems } from "@/src/features/home/ui/result/homeResultSectionItem";
import { HomeResultSectionMore } from "@/src/features/home/ui/result/homeResultSectionMore";
import { ReactNode } from "react";

export type SearchCategory = "NOTICE" | "COMPLEX" | "TARGET_GROUP" | "REGION" | "HOUSE_TYPE";

export interface SearchItem {
  id: string;
  title: string;
  agency: string;
  housingType: string;
  supplyType: string;
  announceDate: string;
  applyStart: string;
  applyEnd: string;
  targetGroups: string[];
  liked: boolean;
}

export interface SearchResponse {
  category: SearchCategory;
  page: number;
  content: SearchItem[];
  hasNext: boolean;
}
export const NOTICE_SEARCH_MOCK: SearchResponse = {
  category: "NOTICE",
  page: 1,
  content: [
    {
      id: "N001",
      title: "광주역세권 청년혁신타운 통합공공임대주택 입주자 모집공고",
      agency: "경기주택도시공사",
      housingType: "오피스텔",
      supplyType: "통합공공임대",
      announceDate: "2025-12-23",
      applyStart: "2026-01-06",
      applyEnd: "2026-01-09",
      targetGroups: ["청년", "무주택자"],
      liked: false,
    },
    {
      id: "N002",
      title: "광주역세권 청년혁신타운 통합공공임대주택 입주자 모집공고",
      agency: "경기주택도시공사",
      housingType: "오피스텔",
      supplyType: "통합공공임대",
      announceDate: "2025-12-23",
      applyStart: "2026-01-06",
      applyEnd: "2026-01-09",
      targetGroups: ["청년", "무주택자"],
      liked: false,
    },
    {
      id: "N003",
      title: "광주역세권 청년혁신타운 통합공공임대주택 입주자 모집공고",
      agency: "경기주택도시공사",
      housingType: "오피스텔",
      supplyType: "통합공공임대",
      announceDate: "2025-12-23",
      applyStart: "2026-01-06",
      applyEnd: "2026-01-09",
      targetGroups: ["청년", "무주택자"],
      liked: false,
    },
    {
      id: "N004",
      title: "광주역세권 청년혁신타운 통합공공임대주택 입주자 모집공고",
      agency: "경기주택도시공사",
      housingType: "오피스텔",
      supplyType: "통합공공임대",
      announceDate: "2025-12-23",
      applyStart: "2026-01-06",
      applyEnd: "2026-01-09",
      targetGroups: ["청년", "무주택자"],
      liked: false,
    },
    {
      id: "N005",
      title: "광주역세권 청년혁신타운 통합공공임대주택 입주자 모집공고",
      agency: "경기주택도시공사",
      housingType: "오피스텔",
      supplyType: "통합공공임대",
      announceDate: "2025-12-23",
      applyStart: "2026-01-06",
      applyEnd: "2026-01-09",
      targetGroups: ["청년", "무주택자"],
      liked: false,
    },
    {
      id: "N006",
      title: "광주역세권 청년혁신타운 통합공공임대주택 입주자 모집공고",
      agency: "경기주택도시공사",
      housingType: "오피스텔",
      supplyType: "통합공공임대",
      announceDate: "2025-12-23",
      applyStart: "2026-01-06",
      applyEnd: "2026-01-09",
      targetGroups: ["청년", "무주택자"],
      liked: false,
    },
  ],
  hasNext: false,
};

export const COMPLEX_SEARCH_MOCK: SearchResponse = {
  category: "COMPLEX",
  page: 1,
  content: [
    {
      id: "C001",
      title: "광주역세권 청년혁신타운",
      agency: "광주도시공사",
      housingType: "공공임대",
      supplyType: "청년주택",
      announceDate: "2025-11-10",
      applyStart: "2025-12-01",
      applyEnd: "2025-12-15",
      targetGroups: ["청년"],
      liked: false,
    },
  ],
  hasNext: false,
};

export const TARGET_GROUP_SEARCH_MOCK: SearchResponse = {
  category: "TARGET_GROUP",
  page: 1,
  content: [
    {
      id: "TG001",
      title: "청년 대상 공공임대주택",
      agency: "국토교통부",
      housingType: "행복주택",
      supplyType: "공공임대",
      announceDate: "2025-10-01",
      applyStart: "2025-10-10",
      applyEnd: "2025-10-20",
      targetGroups: ["청년"],
      liked: false,
    },
  ],
  hasNext: false,
};

export const REGION_SEARCH_MOCK: SearchResponse = {
  category: "REGION",
  page: 1,
  content: [
    {
      id: "R001",
      title: "서울 강남구 공공임대주택 공고",
      agency: "서울주택도시공사",
      housingType: "아파트",
      supplyType: "국민임대",
      announceDate: "2025-09-15",
      applyStart: "2025-09-25",
      applyEnd: "2025-10-05",
      targetGroups: ["무주택자"],
      liked: false,
    },
  ],
  hasNext: false,
};

export const HOUSE_TYPE_SEARCH_MOCK: SearchResponse = {
  category: "HOUSE_TYPE",
  page: 1,
  content: [
    {
      id: "H001",
      title: "오피스텔 공공임대주택 입주자 모집",
      agency: "인천도시공사",
      housingType: "오피스텔",
      supplyType: "공공임대",
      announceDate: "2025-08-20",
      applyStart: "2025-09-01",
      applyEnd: "2025-09-10",
      targetGroups: ["청년", "신혼부부"],
      liked: false,
    },
  ],
  hasNext: false,
};

export const SEARCH_CATEGORY_CONFIG: Record<SearchCategory, { label: string; icon: ReactNode }> = {
  NOTICE: { label: "공고명", icon: <GlobalNoticeIncon /> },
  COMPLEX: { label: "단지명", icon: <GlobalBuilding /> },
  TARGET_GROUP: { label: "모집대상", icon: <GlobalPerson /> },
  REGION: { label: "지역", icon: <GlobalMapPin /> },
  HOUSE_TYPE: { label: "주택유형", icon: <GlobalHouse /> },
};

export const useHomeGlobalSearch = (): SearchResponse[] => {
  return [
    NOTICE_SEARCH_MOCK,
    COMPLEX_SEARCH_MOCK,
    TARGET_GROUP_SEARCH_MOCK,
    REGION_SEARCH_MOCK,
    HOUSE_TYPE_SEARCH_MOCK,
  ];
};
export const HomeResultSection = () => {
  const data = useHomeGlobalSearch();

  return (
    <section className="flex flex-col gap-5 bg-greyscale-grey-25 p-5">
      {data.map(section => {
        return (
          <div key={section.category}>
            <span>
              <HomeResultSectionHeader category={section.category} count={section.content.length} />
            </span>
            <span className="flex flex-col rounded-xl border">
              <HomeResultSectionItems items={section.content} limit={5} />

              {/* More */}
              <HomeResultSectionMore total={section.content.length} limit={5} />
            </span>
          </div>
        );
      })}
    </section>
  );
};
