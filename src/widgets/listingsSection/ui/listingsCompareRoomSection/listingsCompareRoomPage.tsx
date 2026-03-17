import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { useListingState } from "@/src/features/listings/model";
import { fetchCompareInitialFromBff } from "@/src/features/listings/server/bff/getCompareInitialFromBff";
import { ListingCompareSection } from "./listingsCompareRoomSection";
import { getCompareInitialData } from "@/src/widgets/listingsSection/server/compare/getCompareInitialData";
import { preFetchCompareQueries } from "@/src/widgets/listingsSection/server/compare/prefetchCompareQueries";

type ListingsCompareRoomPageProps = {
  id: string;
};

export async function ListingsCompareRoomPage({ id }: ListingsCompareRoomPageProps) {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const pinPointId = cookieStore.get("pinpoint_id")?.value ?? "";
  const sortType = "LATEST";
  const nearbyFacilities: string[] = [];

  const { initial } = await getCompareInitialData({
    id,
    sortType,
    nearbyFacilities,
  });

  await preFetchCompareQueries({
    queryClient,
    initial,
    id,
    sortType,
    nearbyFacilities,
    pinPointId,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full flex-col">
        <ListingCompareSection id={id} sortType={sortType} nearbyFacilities={nearbyFacilities} />
      </main>
    </HydrationBoundary>
  );
}
