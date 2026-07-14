"use client";

import { useEffect } from "react";
import { ListingsFilterCriteria, useListingState, useListingsFilterStore } from "@/src/features/listings/model";
import { ListingsFilterState } from "@/src/entities/listings/model/type";

type ListingsFilterStoreBootstrapProps = {
  initialFilter: ListingsFilterCriteria;
  initialStatus: string;
};

export function ListingsFilterStoreBootstrap({
  initialFilter,
  initialStatus,
}: ListingsFilterStoreBootstrapProps) {
  const setListingStatus = useListingState(state => state.setStatus);
  const listingStatus = useListingState(state => state.status);

  useEffect(() => {
    useListingsFilterStore.setState((state: ListingsFilterState) => ({
      ...state,
      draft: initialFilter,
      applied: initialFilter,
    }));

    if (listingStatus !== initialStatus) {
      setListingStatus(initialStatus);
    }
  }, [initialFilter, initialStatus, listingStatus, setListingStatus]);

  return null;
}
