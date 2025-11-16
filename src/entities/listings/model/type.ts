import { ErrorCode, FieldError, IResponse } from "@/src/shared/types";
import { InfiniteData } from "@tanstack/react-query";

export interface ListingListParams {
  page: number;
  offSet: number;
}
export interface ListingListFilterBody {
  regionType: string[];
  rentalTypes: string[];
  supplyTypes: string[];
  houseTypes: string[];
  status: string;
  sortType: string;
}
// 개별 항목 타입
export interface ListingItem {
  id: string;
  thumbnailUrl: string | null;
  name: string;
  supplier: string;
  complexes: number;
  type: string;
  housingType: string;
  announcePeriod: string;
  applyPeriod: string;
  liked: boolean;
}
// data 객체 타입
export interface ListingListPage {
  totalCount: number;
  content: ListingItem[];
  hasNext: boolean;
  page: number;
}
export type ListingInfiniteResponse = InfiniteData<ListingListPage>;
export interface ListingListApiResponse extends IResponse {
  data: ListingInfiniteResponse;
}
