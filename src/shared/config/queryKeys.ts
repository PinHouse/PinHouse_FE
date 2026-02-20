/**
 * React Query QueryKey 중앙 관리
 * 모든 queryKey는 여기서 정의하고 export합니다.
 */

// QuickSearch 관련 QueryKeys
export const quickSearchKeys = {
  all: ["quickSearch"] as const,
  history: () => [...quickSearchKeys.all, "history"] as const,
} as const;

// PinPoint 관련 QueryKeys
export const pinPointKeys = {
  all: ["pinPoint"] as const,
  lists: () => [...pinPointKeys.all, "list"] as const,
  list: () => [...pinPointKeys.lists()] as const,
  details: () => [...pinPointKeys.all, "detail"] as const,
  detail: (id: string) => [...pinPointKeys.details(), id] as const,
} as const;

// Mypage 관련 QueryKeys
export const mypageKeys = {
  all: ["mypage"] as const,
  user: () => [...mypageKeys.all, "user"] as const,
} as const;

// Listing 관련 QueryKeys
export const listingKeys = {
  all: ["listing"] as const,
  lists: () => [...listingKeys.all, "list"] as const,
  list: (filters?: { sortType?: string; status?: string }) =>
    [...listingKeys.lists(), filters] as const,
  infinite: (filters?: { sortType?: string; status?: string }) =>
    [...listingKeys.all, "infinite", filters] as const,
} as const;
