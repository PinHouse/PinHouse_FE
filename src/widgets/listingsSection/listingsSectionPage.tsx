import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { ListingListPage } from "@/src/entities/listings/model/type";
import { useListingState, useListingsFilterStore } from "@/src/features/listings/model";
import { getNoticeInitialData } from "./server/getNoticeInitialData";
import { ListingsSection } from "./ui/listingsSection";

export async function ListingsSectionPage() {
  const queryClient = new QueryClient();
  const { initial } = await getNoticeInitialData();

  if (initial) {
    const { regionType, rentalTypes, supplyTypes, houseTypes, sortType } =
      useListingsFilterStore.getState();
    const { status } = useListingState.getState();

    await queryClient.prefetchInfiniteQuery({
      queryKey: [
        "listingListInfinite",
        {
          regionType,
          rentalTypes,
          supplyTypes,
          houseTypes,
          sortType,
        },
        status,
      ],
      initialPageParam: 1,
      queryFn: async () => initial.page,
      getNextPageParam: (lastPage: ListingListPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full flex-col">
        <ListingsSection />
      </main>
    </HydrationBoundary>
  );
}
