import { create } from "zustand";
import {
  FilterSheetState,
  ListingsFilterState,
  ListingState,
  SearchState,
} from "@/src/entities/listings/model/type";

export const useListingState = create<ListingState>(set => ({
  status: "전체",
  setStatus: value => set({ status: value }),
  reset: () => set({ status: "" }),
}));

export const useFilterSheetStore = create<FilterSheetState>(set => ({
  open: false,
  openSheet: () => set({ open: true }),
  closeSheet: () => set({ open: false }),
}));

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

export const useListingsSearchState = create<SearchState>(set => ({
  sortType: "LATEST",
  status: "ALL",
  setStatus: value => set({ status: value }),
  setSortType: value => set({ sortType: value }),
  reset: () => set({ status: "", sortType: "" }),
}));
