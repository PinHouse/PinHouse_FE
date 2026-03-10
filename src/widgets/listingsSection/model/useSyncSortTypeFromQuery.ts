"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useListingsFilterStore } from "@/src/features/listings/model";
import {
  DEADLINE_QUERY_VALUE,
  DEADLINE_SORT_TYPE,
} from "@/src/widgets/listingsSection/model/model";

export function useSyncSortTypeFromQuery() {
  const searchParams = useSearchParams();
  const sortType = useListingsFilterStore(state => state.sortType);
  const setSortType = useListingsFilterStore(state => state.setSortType);

  useEffect(() => {
    const requestedSortType = searchParams.get("sortType");

    if (requestedSortType !== DEADLINE_QUERY_VALUE) return;
    if (sortType === DEADLINE_SORT_TYPE) return;

    setSortType(DEADLINE_SORT_TYPE);
  }, [searchParams, sortType, setSortType]);
}
