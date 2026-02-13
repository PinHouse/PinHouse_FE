import {
  useDetailFilterSheetStore,
  useListingDetailCountStore,
} from "@/src/features/listings/model";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export const useDetailFilterResultButton = () => {
  const { filteredCount } = useListingDetailCountStore();
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const closeSheet = useDetailFilterSheetStore(s => s.closeSheet);

  const resetListingsQuery = () => {
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("section");
      router.replace(`/listings/${id}`);
    } catch (error) {
      console.error("[ListingFilterPartialSheet] Failed to reset query", error);
    }
  };

  const handleCloseSheet = () => {
    try {
      closeSheet();
      resetListingsQuery();
    } catch (error) {
      console.error("[ListingFilterPartialSheet] Failed to close sheet", error);
    }

  };


    return {
      filteredCount,
      handleCloseSheet,
    }

};
