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
export interface ListingContentsCardsProps {
  data: ListingItem[];
}

export interface ListingContentsListProps {
  data: InfiniteData<ListingListPage> | undefined;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
}

export interface ListingsContentHeaderProps {
  totalCount: number | null;
}

export interface FilterSheetState {
  open: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

export interface ListingState {
  status: string;
  setStatus: (value: string) => void;
  reset: () => void;
}

export type ListingInfiniteResponse = InfiniteData<ListingListPage>;
export interface ListingListApiResponse extends IResponse {
  data: ListingInfiniteResponse;
}

export interface FilterOption {
  key: string;
  label: string;
  component: string;
  type?: "select" | "radio" | "checkbox" | "sort" | "panel";
}

export interface ListingsFilterState {
  regionType: string[];
  rentalTypes: string[];
  supplyTypes: string[];
  houseTypes: string[];
  status: string;
  sortType: string;

  toggleRegionType: (item: string) => void;
  toggleRentalType: (item: string) => void;
  toggleSupplyType: (item: string) => void;
  toggleHouseType: (item: string) => void;

  setStatus: (status: string) => void;
  setSortType: (sort: string) => void;

  resetRegionType: () => void;
  resetRentalTypes: () => void;
  resetSupplyTypes: () => void;
  resetHouseTypes: () => void;
}
