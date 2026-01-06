import {
  ListingDetailCountState,
  ListingDetailFilterState,
  ListingSearchState,
} from "@/src/entities/listings/model/type";
import { create } from "zustand";

// 사용처:  상태/정렬 (useListingHooks.ts, shared dropdown 등)
export const useListingsDetailTypeStore = create<ListingSearchState>(set => ({
  sortType: "거리 순",
  setSortType: value => set({ sortType: value }),
}));

export const useListingDetailFilter = create<ListingDetailFilterState>(set => ({
  distance: 0,
  region: [],
  typeCode: [],
  maxDeposit: "0",
  maxMonthPay: "0",
  setDistance: value => set({ distance: value }),
  toggleRegionType: region =>
    set(state => {
      const exists = state.region.includes(region);
      return {
        region: exists ? state.region.filter(i => i !== region) : [...state.region, region],
      };
    }),
  toggleTypeCode: typeCode =>
    set(state => {
      const exists = state.typeCode.includes(typeCode);
      return {
        typeCode: exists
          ? state.typeCode.filter(i => i !== typeCode)
          : [...state.typeCode, typeCode],
      };
    }),
  setMaxDeposit: value => set({ maxDeposit: value }),
  setMaxMonthPay: value => set({ maxMonthPay: value }),
}));

export const useListingDetailCountStore = create<ListingDetailCountState>(set => ({
  filteredCount: 0,
  setCounts: value => set({ filteredCount: value }),
}));
