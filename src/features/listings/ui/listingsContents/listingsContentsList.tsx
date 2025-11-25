"use client";
import { ListingContentsCards } from "./listingsContentsCards";
import { useEffect, useRef } from "react";
// import { Button } from "@/src/shared/ui/button/deafult";
import { ListingContentsListProps } from "@/src/entities/listings/model/type";
import { ListingNoSearchResult } from "../listingsNoSearchResult/listingNoSearchResult";
import { Button } from "@/src/shared/lib/headlessUi";

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
    <div className="flex h-full flex-col overflow-y-auto pb-[88px] scrollbar-hide">
      <ListingContentsCards data={items} />

      {!isError && hasNextPage && <div ref={observerRef} className="h-10" />}

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
};
