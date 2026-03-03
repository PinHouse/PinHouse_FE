"use client";

import { InfiniteData } from "@tanstack/react-query";
import { ListingItem } from "@/src/entities/listings/model/type";
import { SliceResponse } from "@/src/entities/home/model/type";
import { ListingContentsCard } from "@/src/features/listings/ui/listingsContents/listingsContentCard";
import { ListingNoSearchResult } from "@/src/features/listings";
import { Button } from "@/src/shared/lib/headlessUi";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { DataEnterTransition } from "@/src/shared/ui/animation/pageUpTransition";
import { useEligibilityRecommendedListHooks } from "@/src/features/eligibility/hooks/useEligibilityRecommendedListHooks";
import { useListingsContentsObserveHooks } from "@/src/features/listings/hooks/useListingsContentListHooks";

export type EligibilityRecommendedListProps = {
  data: InfiniteData<SliceResponse<ListingItem>> | undefined;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  enableInfiniteScroll?: boolean;
};

export function EligibilityRecommendedList({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isError,
  enableInfiniteScroll = true,
}: EligibilityRecommendedListProps) {
  const { handleScroll, observerRoot, ready, items, isBottoms, setScrollContainerRef } =
    useEligibilityRecommendedListHooks(data);

  const { observerRef } = useListingsContentsObserveHooks({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    root: observerRoot,
    enableInfiniteScroll,
  });

  if (!data) {
    return <Spinner title="공고 불러오는 중..." description="잠시만 기다려주세요" />;
  }

  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto scrollbar-hide"
      ref={setScrollContainerRef}
      onScroll={handleScroll}
    >
      <DataEnterTransition ready={ready}>
        <ListingContentsCard data={items} />
      </DataEnterTransition>

      {!isError && hasNextPage && <div ref={observerRef} className="h-20" />}

      {isFetchingNextPage && (
        <div className="py-5 text-center text-sm text-gray-400">불러오는 중...</div>
      )}

      {isError && (
        <div className="flex h-full flex-col items-center justify-center gap-5 pb-[88px]">
          <div>
            <ListingNoSearchResult text="정보를 가져오지 못했어요 <br /> 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요." />
          </div>
          <div className="flex w-full items-center justify-center">
            <Button
              variant="solid"
              size="sm"
              theme="mainBlue"
              onClick={() => fetchNextPage()}
              className="px-5"
            >
              재시도
            </Button>
          </div>
        </div>
      )}

      {!hasNextPage && !isError && data && (
        <div className="py-3 text-center text-sm text-gray-400">더 이상 데이터가 없습니다.</div>
      )}
    </div>
  );
}
