import { ListingSearchState } from "@/src/entities/listings/model/type";
import { create } from "zustand";

// 사용처: 필터 바/시트에서 선택한 값 저장 및 토글 (listingsFullSheet.tsx, listingsFilterPanel.tsx, useListingHooks.ts)
// export const useListingsFilterStore = create<ListingsFilterState>(set => ({
//   regionType: [],
//   rentalTypes: [],
//   supplyTypes: [],
//   houseTypes: [],
//   status: "",
//   sortType: "최신공고순",

//   toggleRegionType: region =>
//     set(state => {
//       const exists = state.regionType.includes(region);
//       return {
//         regionType: exists
//           ? state.regionType.filter(i => i !== region)
//           : [...state.regionType, region],
//       };
//     }),

//   toggleRentalType: rental =>
//     set(state => {
//       const exists = state.rentalTypes.includes(rental);
//       return {
//         rentalTypes: exists
//           ? state.rentalTypes.filter(i => i !== rental)
//           : [...state.rentalTypes, rental],
//       };
//     }),

//   toggleSupplyType: supply =>
//     set(state => {
//       const exists = state.supplyTypes.includes(supply);
//       return {
//         supplyTypes: exists
//           ? state.supplyTypes.filter(i => i !== supply)
//           : [...state.supplyTypes, supply],
//       };
//     }),

//   toggleHouseType: house =>
//     set(state => {
//       const exists = state.houseTypes.includes(house);
//       return {
//         houseTypes: exists
//           ? state.houseTypes.filter(i => i !== house)
//           : [...state.houseTypes, house],
//       };
//     }),

//   setStatus: status => set({ status }),
//   setSortType: sort => set({ sortType: sort }),

//   resetRegionType: () =>
//     set({
//       regionType: [],
//     }),
//   resetRentalTypes: () =>
//     set({
//       rentalTypes: [],
//     }),
//   resetSupplyTypes: () =>
//     set({
//       supplyTypes: [],
//     }),
//   resetHouseTypes: () =>
//     set({
//       houseTypes: [],
//     }),
// }));

// 사용처:  상태/정렬 (useListingHooks.ts, shared dropdown 등)
export const useListingsDetailTypeStore = create<ListingSearchState>(set => ({
  sortType: "거리 순",
  setSortType: value => set({ sortType: value }),
}));
