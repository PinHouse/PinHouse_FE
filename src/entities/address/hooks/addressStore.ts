import { create } from "zustand";
import { AddressState } from "../model/address.type";

export const useAddressStore = create<AddressState>(set => ({
  address: "",
  pinPoint: "",
  isEmbed: false,
  editingPinpointId: null,
  setAddress: value => set({ address: value }),
  setPinPoint: value => set({ pinPoint: value }),
  setIsEmbed: value => set({ isEmbed: value }),
  setEditPinpoint: ({ id, address, name }) =>
    set({ address, pinPoint: name, editingPinpointId: id }),
  clearEditPinpoint: () => set({ editingPinpointId: null }),
  reset: () =>
    set({ address: "", pinPoint: "", isEmbed: false, editingPinpointId: null }),
}));
