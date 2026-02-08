import { useFilterSheetStore, useListingsFilterStore } from "@/src/features/listings/model";
import { useRouter, useSearchParams } from "next/navigation";

export const ListingHooks = () => {
  const openSheet = useFilterSheetStore(state => state.openSheet);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const onOpenSheet = () => {
    openSheet();
    router.push(`listings?${params}`);
  };

  const hasSelectedFilters = useListingsFilterStore(state =>
    [state.regionType, state.rentalTypes, state.supplyTypes, state.houseTypes].some(
      list => list.length > 0
    )
  );

  return {
    openSheet,
    hasSelectedFilters,
    onOpenSheet,
  };
};
