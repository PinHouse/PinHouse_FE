export interface SliceRequest {
  page: number;
  offset: number;
}

export interface NoticeByPinPointQuery {
  pinpointId: string;
  sliceRequest: SliceRequest;
}

export interface SliceResponse<T> {
  region: string;
  content: T[];
  hasNext: boolean;
  pages: number;
  totalCount: number;
  totalElements: number;
  category?: string;
}

export interface NoticeByPinPointParams {
  pinpointId: string;
  page: number;
  offSet: number;
}

export interface NoticeContent {
  id: string; // 공고 ID
  thumbnailUrl: string; // 썸네일 이미지 URL
  name: string; // 공고명
  supplier: "LH" | string; // 공급자 (확장 대비 string)
  complexes: number; // 단지 수
  type: string; // 공고 유형 (행복주택 등)
  housingType: string; // 주거 형태 (아파트 등)
  announcePeriod: string; // 공고일 (ISO or yyyy-mm-dd)
  applyPeriod: string; // 신청 기간 (문자열)
  liked: boolean; // 관심 여부
}

export interface NoticeCount {
  count: number;
}

export interface PopularResponse {
  keyword: string;
  count: number;
  lastSearchedAt: string;
}

export type SearchCategory = "notices" | "complexes" | "targetGroups" | "regions" | "houseTypes";
export interface GlobalSearchItem {
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

export interface GlobalList<T> {
  content: T[];
  hasNext: boolean;
}

export interface GlobalListType {
  notices: GlobalList<GlobalSearchItem>;
  complexes: GlobalList<GlobalSearchItem>;
  targetGroups: GlobalList<GlobalSearchItem>;
  regions: GlobalList<GlobalSearchItem>;
  houseTypes: GlobalList<GlobalSearchItem>;
}

export interface GlobalSearchSection {
  category: SearchCategory;
  content: GlobalSearchItem[];
  hasNext: boolean;
}

export interface GlobalSearchCategoryItem {
  content: GlobalSearchItem[];
}
