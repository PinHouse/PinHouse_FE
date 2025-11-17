"use client";
import { useListingListInfiniteQuery } from "@/src/entities/listings/hooks/useListingHooks";
import { ListingContentsCards } from "./listingsContentsCards";
import { useEffect, useRef } from "react";

export const ListingContentsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useListingListInfiniteQuery();
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
    <div className="flex h-full flex-col overflow-y-auto pb-[100px]">
      <ListingContentsCards data={items} />

      <div ref={observerRef} className="h-10"></div>

      {isFetchingNextPage && (
        <div className="py-5 text-center text-sm text-gray-400">불러오는 중...</div>
      )}
    </div>
  );
};
