import { useFilterSheetStore, useHasRouter } from "@/src/features/listings/model";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useListingListInfiniteQuery } from "@/src/entities/listings/hooks/useListingHooks";

const useListingTotal = () => {
  const { data } = useListingListInfiniteQuery();
  const prevTotalRef = useRef<number | null>(null);
  const newTotal = data?.pages?.[0]?.totalCount;

  if (newTotal !== undefined && newTotal !== null) {
    prevTotalRef.current = newTotal;
  }

  return prevTotalRef.current;
};

const useScrollBottom = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // useEffect 의존성을 안정화해서 불필요한 cleanup 반복을 막는다.
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // 스크롤 위치에 따라 하단 그라데이션 표시를 정확히 맞추기 위함.
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    setIsAtBottom(atBottom);
  }, []);

  return { scrollRef, isAtBottom, handleScroll };
};

const useListingsTabSync = (open: boolean, handleScroll: () => void) => {
  const searchParams = useSearchParams();
  const { setHasListingsTab, reset } = useHasRouter();

  useEffect(() => {
    if (!open) return;

    // 시트가 열릴 때 URL 상태를 반영해 하단 네비 같은 UI 분기 기준을 맞춘다.
    handleScroll();
    const hasTab = searchParams.has("tab");
    setHasListingsTab(hasTab);

    // 시트가 닫힐 때 router 관련 상태를 원복한다.
    return () => {
      reset();
    };
  }, [open, handleScroll, searchParams, setHasListingsTab, reset]);
};

export const ListingFilterPartialSheetHooks = () => {
  const open = useFilterSheetStore(s => s.open);
  const closeSheet = useFilterSheetStore(s => s.closeSheet);
  const router = useRouter();
  const searchParams = useSearchParams();
  const displayTotal = useListingTotal();
  const { scrollRef, isAtBottom, handleScroll } = useScrollBottom();
  useListingsTabSync(open, handleScroll);

  const resetListingsQuery = () => {
    try {
      // tab만 제거하고 나머지 쿼리는 그대로 유지한다.
      const params = new URLSearchParams(searchParams.toString());
      params.delete("tab");
      const query = params.toString();
      router.replace(query ? `/listings?${query}` : "/listings", { scroll: false });
    } catch (error) {
      console.error("[ListingFilterPartialSheet] Failed to reset query", error);
    }
  };

  const handleCloseSheet = () => {
    try {
      // UI를 먼저 닫고, 이어서 URL을 정리하는 흐름으로 고정한다.
      closeSheet();
      resetListingsQuery();
    } catch (error) {
      console.error("[ListingFilterPartialSheet] Failed to close sheet", error);
    }
  };

  return {
    open,
    scrollRef,
    isAtBottom,
    displayTotal,
    handleScroll,
    handleCloseSheet,
  };
};
