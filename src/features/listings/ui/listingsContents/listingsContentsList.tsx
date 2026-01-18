"use client";
import { useEffect, useRef, useState } from "react";
import { ListingContentsListProps } from "@/src/entities/listings/model/type";
import { ListingNoSearchResult } from "../listingsNoSearchResult/listingNoSearchResult";
import { Button } from "@/src/shared/lib/headlessUi";
import { ListingContentsCard } from "./listingsContentCard";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { Spinner } from "@/src/shared/ui/spinner/default";

export const ListingContentsList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isError,
  isBottom = true,
}: ListingContentsListProps) => {
  const items = data?.pages.flatMap(page => page.content) ?? [];
  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isBottoms, setIsBottoms] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    setIsBottoms(atBottom);
  };

  useEffect(() => {
    handleScroll();
  }, [data]);

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

  if (!data) {
    return <Spinner title="공고 탐색중..." description="잠시만 기다려주세요" />;
  }

  return (
    <div
      className={`flex h-full w-full flex-col overflow-y-auto ${isBottom ? `pb-[88px]` : "pb-0"} scrollbar-hide`}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname + keyword}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="relative w-full"
        >
          <ListingContentsCard data={items} />
        </motion.div>
      </AnimatePresence>

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

      <div
        className={`pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent transition-all duration-300 ${
          isBottoms ? "h-0 opacity-0" : "h-16 opacity-100"
        }`}
      />
    </div>
  );
};
