"use client";
import {
  ListingFilterPanel,
  ListingFilterPartialSheet,
  ListingsContent,
  ListingsHeaders,
} from "@/src/features/listings";
import { useListingsFilterStore } from "@/src/features/listings/model";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const DEADLINE_SORT_TYPE = "\uB9C8\uAC10\uC784\uBC15\uC21C";

export const ListingsSection = () => {
  const searchParams = useSearchParams();
  const sortType = useListingsFilterStore(state => state.sortType);
  const setSortType = useListingsFilterStore(state => state.setSortType);

  useEffect(() => {
    const requestedSortType = searchParams.get("sortType");

    if (requestedSortType !== "deadline") {
      return;
    }

    if (sortType === DEADLINE_SORT_TYPE) {
      return;
    }

    setSortType(DEADLINE_SORT_TYPE);
  }, [searchParams, sortType, setSortType]);

  return (
    <section className="flex h-full w-full flex-col justify-between px-4">
      <div className="flex flex-col gap-2">
        <ListingsHeaders />

        <div className="-mx-5">
          <ListingFilterPanel />
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <ListingsContent />
      </div>
      <ListingFilterPartialSheet />
    </section>
  );
};
