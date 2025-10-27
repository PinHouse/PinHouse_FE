import { create } from "zustand";
import { AddressState } from "../model/address.type";

export const useAddressStore = create<AddressState>(set => ({
  address: "",
  pinPoint: "",
  setAddress: value => set({ address: value }),
  setPinPoint: value => set({ pinPoint: value }),
  reset: () => set({ address: "", pinPoint: "" }),
}));
