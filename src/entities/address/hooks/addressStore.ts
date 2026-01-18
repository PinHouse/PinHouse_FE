import { create } from "zustand";
import { AddressState } from "../model/address.type";

export const useAddressStore = create<AddressState>(set => ({
  address: "",
  pinPoint: "",
  isEmbed: false,
  setAddress: value => set({ address: value }),
  setPinPoint: value => set({ pinPoint: value }),
  setIsEmbed: value => set({ isEmbed: value }),
  reset: () => set({ address: "", pinPoint: "", isEmbed: false }),
}));
