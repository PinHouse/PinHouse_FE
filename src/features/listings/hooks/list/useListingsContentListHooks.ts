import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteData } from "@tanstack/react-query";
import { ListingListPage } from "@/src/entities/listings/model/type";

type ListingsFetchingProps = {
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  root?: Element | null;
  enableInfiniteScroll?: boolean;
};

export const useListingsContentListHooks = (data: InfiniteData<ListingListPage> | undefined) => {
  const items = data?.pages.flatMap(page => page.content) ?? [];
  const [isBottoms, setIsBottoms] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [observerRoot, setObserverRoot] = useState<Element | null>(null);
  const ready = !!items;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    setIsBottoms(atBottom);
  }, []);

  const setScrollContainerRef = useCallback((node: HTMLDivElement | null) => {
    scrollRef.current = node;
    setObserverRoot(node);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [data, handleScroll]);

  return {
    handleScroll,
    items,
    isBottoms,
    observerRoot,
    ready,
    setScrollContainerRef,
    scrollRef,
  };
};

export const useListingsContentsObserveHooks = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  root,
  enableInfiniteScroll = true,
}: ListingsFetchingProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!observerRef.current) return;
    if (!enableInfiniteScroll) return;
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: root ?? null,
        rootMargin: "0px 0px 120px 0px",
        threshold: 0,
      }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, root]);

  return {
    observerRef,
  };
};
