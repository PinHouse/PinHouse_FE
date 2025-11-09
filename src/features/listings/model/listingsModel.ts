export const listingsHistory = ["행복주택", "청년", "등등"];
export const listingsResults = ["행복주택", "청년", "등등"];

export interface FilterOption {
  key: string;
  label: string;
  component: string; // 실제 UI 컴포넌트 이름 (optional)
  type?: "select" | "radio" | "checkbox" | "sort" | "panel";
}

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
