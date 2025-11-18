"use client";
import { useListingListInfiniteQuery } from "@/src/entities/listings/hooks/useListingHooks";
import { ListingContentsCards } from "./listingsContentsCards";
import { useEffect, useRef } from "react";
import { Button } from "@/src/shared/ui/button/deafult";
import { ListingContentsListProps } from "@/src/entities/listings/model/type";

export const ListingContentsList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isError,
}: ListingContentsListProps) => {
  const items = data?.pages.flatMap(page => page.content) ?? [];
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-[88px]">
      <ListingContentsCards data={items} />

      {!isError && hasNextPage && <div ref={observerRef} className="h-10" />}

      {isFetchingNextPage && (
        <div className="py-5 text-center text-sm text-gray-400">불러오는 중...</div>
      )}

      {isError && (
        <div className="justify-centerpy-5 flex gap-2 py-2 text-center text-sm text-red-500">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
          <Button
            variant={"outline"}
            onClick={() => fetchNextPage()}
            size={"sm"}
            radius={"sm"}
            text={"sm"}
            className="h-6 border-0 bg-gray-900 px-3 py-1 text-xs text-text-greyscale-grey-50"
          >
            재시도
          </Button>
        </div>
      )}

      {!hasNextPage && !isError && data && (
        <div className="py-3 text-center text-sm text-gray-400">더 이상 데이터가 없습니다.</div>
      )}
    </div>
  );
};
