import { AddressState } from "@/src/entities/address/model/address.type";
import { create } from "zustand";
import { ListingState } from "./listingsModel";

export const useListingState = create<ListingState>(set => ({
  status: "",
  setStatus: value => set({ status: value }),
  reset: () => set({ status: "" }),
}));
