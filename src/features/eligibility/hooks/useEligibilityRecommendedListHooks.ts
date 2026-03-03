import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteData } from "@tanstack/react-query";
import { ListingItem } from "@/src/entities/listings/model/type";
import { SliceResponse } from "@/src/entities/home/model/type";

export const useEligibilityRecommendedListHooks = (
  data: InfiniteData<SliceResponse<ListingItem>> | undefined
) => {
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
