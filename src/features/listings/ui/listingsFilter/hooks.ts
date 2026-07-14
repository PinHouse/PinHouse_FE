import { useFilterSheetStore, useListingsFilterStore } from "@/src/features/listings/model";
import { ListingsFilterState } from "@/src/entities/listings/model/type";
import { useRouter, useSearchParams } from "next/navigation";

export const ListingHooks = () => {
  const openSheet = useFilterSheetStore(state => state.openSheet);
  const syncDraftFromApplied = useListingsFilterStore((state: ListingsFilterState) => state.syncDraftFromApplied);
  const router = useRouter();
  const searchParams = useSearchParams();
  const onOpenSheet = () => {
    syncDraftFromApplied();
    openSheet();
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/listings?${params.toString()}`, { scroll: false });
  };

  const hasSelectedFilters = useListingsFilterStore((state: ListingsFilterState) => state.hasAppliedFilters());

  return {
    openSheet,
    hasSelectedFilters,
    onOpenSheet,
  };
};
