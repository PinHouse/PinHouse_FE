"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { QuickSearchResultBottomSheet } from "@/src/features/quickSearch/ui/common/quickSearchResultBottomSheet";
import { QuickSearchResultHeader } from "@/src/features/quickSearch/ui/common/quickSearchResultHeader";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";
import { useMutation } from "@tanstack/react-query";
import { postQuickSearchFast } from "@/src/features/quickSearch/api/quickSearchApi";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { ListingNoSearchResult } from "@/src/features/listings/ui/listingsNoSearchResult/listingNoSearchResult";
import { QuickSearchRecommendCardProps } from "@/src/features/quickSearch/ui/common/quickSearchRecommendCard";
import { transformUnitToCard } from "@/src/features/quickSearch/api/quickSearchApi";

export default function QuickSearchResultPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const searchParams = useSearchParams();
  const historyIdParam = searchParams.get("historyId");
  const quickSearchData = useQuickSearchStore();

  // 빠른 검색 API mutation
  const searchMutation = useMutation({
    mutationFn: (data: Parameters<typeof postQuickSearchFast>[0]) => postQuickSearchFast(data),
    onError: error => {
      console.error("빠른 검색 요청 실패:", error);
    },
  });

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const {
      historyId: storeHistoryId,
      pinPointId,
      transitTime,
      minSize,
      maxSize,
      maxDeposit,
      maxMonthPay,
      facilities,
      rentalTypes,
      supplyTypes,
      houseTypes,
      livingNumber,
    } = quickSearchData;

    // 쿼리 파라미터의 historyId가 있으면 우선 사용, 없으면 store의 historyId 사용
    const historyId = historyIdParam || storeHistoryId;

    searchMutation.mutate({
      historyId,
      pinPointId,
      transitTime,
      minSize,
      maxSize,
      maxDeposit,
      maxMonthPay,
      facilities,
      rentalTypes,
      supplyTypes,
      houseTypes,
      livingNumber,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 최초 마운트 시에만 실행

  // API 응답 데이터를 카드 props로 변환
  const cards: Omit<QuickSearchRecommendCardProps, "className">[] =
    searchMutation.data?.units?.map(unit => transformUnitToCard(unit)) || [];

  // 로딩 중
  if (searchMutation.isPending) {
    return <Spinner title="검색 중" description="조건에 맞는 방을 찾고 있어요" />;
  }

  // 에러 발생
  if (searchMutation.isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white px-5">
        <ListingNoSearchResult text="정보를 가져오지 못했어요 <br /> 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요." />
      </div>
    );
  }

  // 결과가 없는 경우
  if (
    !searchMutation.data ||
    !searchMutation.data.units ||
    searchMutation.data.units.length === 0
  ) {
    return (
      <div className="flex h-screen flex-col bg-white">
        <QuickSearchResultHeader />
        <div className="flex flex-1 items-center justify-center px-5">
          <ListingNoSearchResult text="조건에 맞는 방이 없어요 <br /> 다른 조건으로 다시 검색해보세요." />
        </div>
      </div>
    );
  }

  // 결과가 있는 경우
  return (
    <div className="relative flex h-screen flex-col bg-white">
      <QuickSearchResultHeader />
      <QuickSearchResultBottomSheet
        open={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        cards={cards}
      />
    </div>
  );
}
