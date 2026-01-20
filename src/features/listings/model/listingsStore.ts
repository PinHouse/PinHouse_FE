// listings 전역 상태 관리 (Zustand)
// - 어디서 쓰이나요?
//   * useListingState: 전체/진행상태 선택 (listingsContentsHeader.tsx, useListingHooks.ts)
//   * useFilterSheetStore: 전체 필터 시트 열기/닫기 (listingsFilterPanel.tsx, listingsFullSheet.tsx)
//   * useListingsFilterStore: 필터 값(지역/대상/임대/주택) 상태 (listingsFullSheet.tsx, listingsFilterPanel.tsx, useListingHooks.ts)
//   * useListingsSearchState: 검색 페이지 정렬/상태 (shared dropdown, useListingHooks.ts 등)
//   * useListingDetailStore: 상세 보기에서 방 타입 선택 상태
import { create } from "zustand";
import {
  FilterSheetState,
  ListingDetailFilterState,
  ListingsFilterState,
  ListingState,
  SearchState,
} from "@/src/entities/listings/model/type";

// 사용처: 공고 리스트 상단 상태 드롭다운/쿼리 필터 (useListingHooks.ts, listingsContentsHeader.tsx)
export const useListingState = create<ListingState>(set => ({
  status: "전체",
  setStatus: value => set({ status: value }),
  reset: () => set({ status: "" }),
}));

// 사용처: 전체 필터 시트 열기/닫기 (listingsFilterPanel.tsx, listingsFullSheet.tsx)
export const useFilterSheetStore = create<FilterSheetState>(set => ({
  open: false,
  openSheet: () => set({ open: true }),
  closeSheet: () => set({ open: false }),
}));

export const useDetailFilterSheetStore = create<FilterSheetState>(set => ({
  open: false,
  openSheet: () => set({ open: true }),
  closeSheet: () => set({ open: false }),
}));

// 사용처: 필터 바/시트에서 선택한 값 저장 및 토글 (listingsFullSheet.tsx, listingsFilterPanel.tsx, useListingHooks.ts)
export const useListingsFilterStore = create<ListingsFilterState>(set => ({
  regionType: [],
  rentalTypes: [],
  supplyTypes: [],
  houseTypes: [],
  status: "",
  sortType: "최신공고순",

  toggleRegionType: region =>
    set(state => {
      const exists = state.regionType.includes(region);
      return {
        regionType: exists
          ? state.regionType.filter(i => i !== region)
          : [...state.regionType, region],
      };
    }),

  toggleRentalType: rental =>
    set(state => {
      const exists = state.rentalTypes.includes(rental);
      return {
        rentalTypes: exists
          ? state.rentalTypes.filter(i => i !== rental)
          : [...state.rentalTypes, rental],
      };
    }),

  toggleSupplyType: supply =>
    set(state => {
      const exists = state.supplyTypes.includes(supply);
      return {
        supplyTypes: exists
          ? state.supplyTypes.filter(i => i !== supply)
          : [...state.supplyTypes, supply],
      };
    }),

  toggleHouseType: house =>
    set(state => {
      const exists = state.houseTypes.includes(house);
      return {
        houseTypes: exists
          ? state.houseTypes.filter(i => i !== house)
          : [...state.houseTypes, house],
      };
    }),

  setStatus: status => set({ status }),
  setSortType: sort => set({ sortType: sort }),

  resetRegionType: () =>
    set({
      regionType: [],
    }),
  resetRentalTypes: () =>
    set({
      rentalTypes: [],
    }),
  resetSupplyTypes: () =>
    set({
      supplyTypes: [],
    }),
  resetHouseTypes: () =>
    set({
      houseTypes: [],
    }),
}));

// 사용처: 검색 페이지 상태/정렬 (useListingHooks.ts, shared dropdown 등)
export const useListingsSearchState = create<SearchState>(set => ({
  sortType: "LATEST",
  status: "ALL",
  setStatus: value => set({ status: value }),
  setSortType: value => set({ sortType: value }),
  reset: () => set({ status: "", sortType: "" }),
}));

// 사용처: 상세 페이지 내 방 타입 선택 상태
export const useListingDetailStore = create<{
  houseType: string | null;
  setHouseType: (value: string) => void;
}>(set => ({
  houseType: null,
  setHouseType: value => set({ houseType: value }),
}));

interface HasRouterState {
  hasListingsTab: boolean;
  hasHomeMode: boolean;

  setHasListingsTab: (value: boolean) => void;
  setHasHomeMode: (value: boolean) => void;

  reset: () => void;
}

export const useHasRouter = create<HasRouterState>(set => ({
  hasListingsTab: false,
  hasHomeMode: false,

  setHasListingsTab: value => set({ hasListingsTab: value }),
  setHasHomeMode: value => set({ hasHomeMode: value }),

  reset: () =>
    set({
      hasListingsTab: false,
      hasHomeMode: false,
    }),
}));
