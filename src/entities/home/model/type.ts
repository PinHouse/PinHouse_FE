export interface SliceRequest {
  page: number;
  offset: number;
}

export interface NoticeByPinPointQuery {
  pinpointId: string;
  sliceRequest: SliceRequest;
}

export interface SliceResponse<T> {
  content: T[];
  hasNext: boolean;
  pages: number;
  totalCount: number;
  totalElements: number;
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
