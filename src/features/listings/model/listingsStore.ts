import { AddressState } from "@/src/entities/address/model/address.type";
import { create } from "zustand";
import { FilterSheetState, ListingState } from "@/src/entities/listings/model/type";

export const useListingState = create<ListingState>(set => ({
  status: "",
  setStatus: value => set({ status: value }),
  reset: () => set({ status: "" }),
}));

export const useFilterSheetStore = create<FilterSheetState>(set => ({
  open: false,
  openSheet: () => set({ open: true }),
  closeSheet: () => set({ open: false }),
}));
