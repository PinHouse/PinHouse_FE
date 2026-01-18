import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuickSearchState, QuickSearchData } from "./quickSearch.type";

const initialData: QuickSearchData = {
  historyId: null,
  pinPointId: "",
  transitTime: 0,
  minSize: 0,
  maxSize: 0,
  maxDeposit: 0,
  maxMonthPay: 0,
  facilities: [],
  rentalTypes: [],
  supplyTypes: [],
  houseTypes: [],
  livingNumber: 0,
};

export const useQuickSearchStore = create<QuickSearchState>()(
  persist(
    (set, get) => ({
      ...initialData,

      // Individual setters
      setHistoryId: (value: string | null) => set({ historyId: value }),
      setPinPointId: (value: string) => set({ pinPointId: value }),
      setTransitTime: (value: number) => set({ transitTime: value }),
      setMinSize: (value: number) => set({ minSize: value }),
      setMaxSize: (value: number) => set({ maxSize: value }),
      setMaxDeposit: (value: number) => set({ maxDeposit: value }),
      setMaxMonthPay: (value: number) => set({ maxMonthPay: value }),
      setFacilities: (value: string[]) => set({ facilities: value }),
      setRentalTypes: (value: string[]) => set({ rentalTypes: value }),
      setSupplyTypes: (value: string[]) => set({ supplyTypes: value }),
      setHouseTypes: (value: string[]) => set({ houseTypes: value }),
      setLivingNumber: (value: number) => set({ livingNumber: value }),

      // Facilities array manipulation
      addFacility: (facility: string) =>
        set(state => ({
          facilities: state.facilities.includes(facility)
            ? state.facilities
            : [...state.facilities, facility],
        })),
      removeFacility: (facility: string) =>
        set(state => ({
          facilities: state.facilities.filter(f => f !== facility),
        })),
      toggleFacility: (facility: string) =>
        set(state => ({
          facilities: state.facilities.includes(facility)
            ? state.facilities.filter(f => f !== facility)
            : [...state.facilities, facility],
        })),

      // RentalTypes array manipulation
      addRentalType: (type: string) =>
        set(state => ({
          rentalTypes: state.rentalTypes.includes(type)
            ? state.rentalTypes
            : [...state.rentalTypes, type],
        })),
      removeRentalType: (type: string) =>
        set(state => ({
          rentalTypes: state.rentalTypes.filter(t => t !== type),
        })),
      toggleRentalType: (type: string) =>
        set(state => ({
          rentalTypes: state.rentalTypes.includes(type)
            ? state.rentalTypes.filter(t => t !== type)
            : [...state.rentalTypes, type],
        })),

      // SupplyTypes array manipulation
      addSupplyType: (type: string) =>
        set(state => ({
          supplyTypes: state.supplyTypes.includes(type)
            ? state.supplyTypes
            : [...state.supplyTypes, type],
        })),
      removeSupplyType: (type: string) =>
        set(state => ({
          supplyTypes: state.supplyTypes.filter(t => t !== type),
        })),
      toggleSupplyType: (type: string) =>
        set(state => ({
          supplyTypes: state.supplyTypes.includes(type)
            ? state.supplyTypes.filter(t => t !== type)
            : [...state.supplyTypes, type],
        })),

      // HouseTypes array manipulation
      addHouseType: (type: string) =>
        set(state => ({
          houseTypes: state.houseTypes.includes(type)
            ? state.houseTypes
            : [...state.houseTypes, type],
        })),
      removeHouseType: (type: string) =>
        set(state => ({
          houseTypes: state.houseTypes.filter(t => t !== type),
        })),
      toggleHouseType: (type: string) =>
        set(state => ({
          houseTypes: state.houseTypes.includes(type)
            ? state.houseTypes.filter(t => t !== type)
            : [...state.houseTypes, type],
        })),

      // Bulk operations
      setQuickSearchData: (data: Partial<QuickSearchData>) => set(state => ({ ...state, ...data })),

      reset: () => set(initialData),
      // 기존 hooks/quickSearchStore.ts는 이 스토어로 대체됩니다
    }),
    {
      name: "quickSearch", // localStorage key
    }
  )
);
