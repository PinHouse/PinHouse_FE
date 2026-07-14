// listings 전역 상태 관리 (Zustand)
// - 어디서 쓰이나요?
//   * useListingState: 전체/진행상태 선택 (listingsContentsHeader.tsx, useListingHooks.ts)
//   * useFilterSheetStore: 전체 필터 시트 열기/닫기 (listingsFilterPanel.tsx, listingsFullSheet.tsx)
//   * useListingsFilterStore: 필터 값(지역/대상/임대/주택) 상태 (listingsFullSheet.tsx, listingsFilterPanel.tsx, useListingHooks.ts)
//   * useListingsSearchState: 검색 페이지 정렬/상태 (shared dropdown, useListingHooks.ts 등)
//   * useListingDetailStore: 상세 보기에서 방 타입 선택 상태
import { create } from "zustand";
import {
  DEFAULT_LISTING_SEARCH_SORT_TYPE,
  DEFAULT_LISTING_SEARCH_STATUS,
} from "@/src/features/listings/model/searchCriteria";
import {
  DEFAULT_LISTINGS_STATUS,
  createDefaultListingsFilterCriteria,
  normalizeListingsFilterCriteria,
} from "@/src/features/listings/model/listFilterCriteria";
import {
  FilterSheetState,
  ListingDetailFilterState,
  ListingListFilterBody,
  ListingsFilterState,
  ListingState,
  SearchState,
} from "@/src/entities/listings/model/type";

function hasSelectedListingsFilter(criteria: ListingListFilterBody): boolean {
  return [
    criteria.regionType,
    criteria.rentalTypes,
    criteria.supplyTypes,
    criteria.houseTypes,
  ].some(list => list.length > 0);
}

// 사용처: 공고 리스트 상단 상태 드롭다운/쿼리 필터 (useListingHooks.ts, listingsContentsHeader.tsx)
export const useListingState = create<ListingState>(set => ({
  status: DEFAULT_LISTINGS_STATUS,
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
export const useListingsFilterStore = create<ListingsFilterState>((set, get) => ({
  draft: createDefaultListingsFilterCriteria(),
  applied: createDefaultListingsFilterCriteria(),

  syncDraftFromApplied: () =>
    set(state => ({
      draft: {
        ...state.applied,
        regionType: [...state.applied.regionType],
        rentalTypes: [...state.applied.rentalTypes],
        supplyTypes: [...state.applied.supplyTypes],
        houseTypes: [...state.applied.houseTypes],
      },
    })),

  applyDraft: () =>
    set(state => {
      const next = normalizeListingsFilterCriteria(state.draft);
      return {
        applied: next,
        draft: next,
      };
    }),

  toggleDraftRegionType: region =>
    set(state => {
      const exists = state.draft.regionType.includes(region);
      return {
        draft: {
          ...state.draft,
          regionType: exists
            ? state.draft.regionType.filter(i => i !== region)
            : [...state.draft.regionType, region],
        },
      };
    }),

  toggleDraftRentalType: rental =>
    set(state => {
      const exists = state.draft.rentalTypes.includes(rental);
      return {
        draft: {
          ...state.draft,
          rentalTypes: exists
            ? state.draft.rentalTypes.filter(i => i !== rental)
            : [...state.draft.rentalTypes, rental],
        },
      };
    }),

  toggleDraftSupplyType: supply =>
    set(state => {
      const exists = state.draft.supplyTypes.includes(supply);
      return {
        draft: {
          ...state.draft,
          supplyTypes: exists
            ? state.draft.supplyTypes.filter(i => i !== supply)
            : [...state.draft.supplyTypes, supply],
        },
      };
    }),

  toggleDraftHouseType: house =>
    set(state => {
      const exists = state.draft.houseTypes.includes(house);
      return {
        draft: {
          ...state.draft,
          houseTypes: exists
            ? state.draft.houseTypes.filter(i => i !== house)
            : [...state.draft.houseTypes, house],
        },
      };
    }),

  setDraftStatus: status =>
    set(state => ({
      draft: {
        ...state.draft,
        status,
      },
    })),
  setSortType: sort =>
    set(state => ({
      draft: {
        ...state.draft,
        sortType: sort,
      },
      applied: {
        ...state.applied,
        sortType: sort,
      },
    })),

  resetDraftRegionType: () =>
    set(state => ({
      draft: {
        ...state.draft,
        regionType: [],
      },
    })),
  resetDraftRentalTypes: () =>
    set(state => ({
      draft: {
        ...state.draft,
        rentalTypes: [],
      },
    })),
  resetDraftSupplyTypes: () =>
    set(state => ({
      draft: {
        ...state.draft,
        supplyTypes: [],
      },
    })),
  resetDraftHouseTypes: () =>
    set(state => ({
      draft: {
        ...state.draft,
        houseTypes: [],
      },
    })),

  hasAppliedFilters: () => hasSelectedListingsFilter(get().applied),
  hasDraftFilters: () => hasSelectedListingsFilter(get().draft),
}));

// 사용처: 검색 페이지 상태/정렬 (useListingHooks.ts, shared dropdown 등)
export const useListingsSearchState = create<SearchState>(set => ({
  sortType: DEFAULT_LISTING_SEARCH_SORT_TYPE,
  status: DEFAULT_LISTING_SEARCH_STATUS,
  setStatus: value => set({ status: value }),
  setSortType: value => set({ sortType: value }),
  reset: () =>
    set({
      status: DEFAULT_LISTING_SEARCH_STATUS,
      sortType: DEFAULT_LISTING_SEARCH_SORT_TYPE,
    }),
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
