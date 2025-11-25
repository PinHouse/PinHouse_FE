"use client";

import { useListingListInfiniteQuery } from "@/src/entities/listings/hooks/useListingHooks";
import { ListingsContentHeader } from "./listingsContentsHeader";
import { ListingContentsList } from "./listingsContentsList";
import { useEffect, useRef } from "react";
import { queryClient } from "@/src/app/providers";
import { useFilterSheetStore } from "../../model";
import { ListingNoSearchResult } from "../listingsNoSearchResult/listingNoSearchResult";
import { Spinner } from "@/src/shared/ui/spinner/default";

export const ListingsContent = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading, isSuccess } =
    useListingListInfiniteQuery();
  const open = useFilterSheetStore(state => state.open);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (prevOpenRef.current === true && open === false) {
      queryClient.invalidateQueries({
        queryKey: ["listingListInfinite"],
      });
    }
    prevOpenRef.current = open;
  }, [open]);

  const totalCount = isLoading || !isSuccess ? null : (data?.pages[0]?.totalCount ?? 0);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center pb-[88px]">
        <Spinner title="공고 탐색중..." description="잠시만 기다려주세요" />
      </div>
    );
  }

  return (
    <>
      {totalCount === 0 ? (
        <div className="flex h-full items-center justify-center pb-[88px]">
          <ListingNoSearchResult
            text={"조건에 맞는 공고를 찾지 못했어요. <br />탐색 범위를 넓혀서 다시 탐색해 보세요"}
          />
        </div>
      ) : (
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
      )}
    </>
  );
};
