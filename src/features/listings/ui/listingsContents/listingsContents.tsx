import { useListingListInfiniteQuery } from "@/src/entities/listings/hooks/useListingHooks";
import { ListingsContentHeader } from "./listingsContentsHeader";
import { ListingContentsList } from "./listingsContentsList";

export const ListingsContent = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useListingListInfiniteQuery();
  const totalCount = data?.pages[0]?.totalCount ?? 0;
  return (
    <div className="flex h-full flex-col">
      <ListingsContentHeader totalCount={totalCount} />
      <div className="min-h-0 flex-1">
        <ListingContentsList
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
        />
      </div>
    </div>
  );
};
