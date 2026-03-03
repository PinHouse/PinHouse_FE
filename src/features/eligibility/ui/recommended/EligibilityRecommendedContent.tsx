"use client";

import { useEligibilityRecommendedList } from "@/src/features/eligibility/hooks/useEligibilityRecommendedList";
import { EligibilityRecommendedHeader } from "./EligibilityRecommendedHeader";
import { EligibilityRecommendedList } from "./EligibilityRecommendedList";
import { ListingNoSearchResult } from "@/src/features/listings";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { ELIGIBILITY_RECOMMENDED_HEADER_LABEL } from "../../model/eligibilityConstants";

type EligibilityRecommendedContentProps = {
  enableInfiniteScroll?: boolean;
};

export function EligibilityRecommendedContent({
  enableInfiniteScroll = true,
}: EligibilityRecommendedContentProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading, isSuccess } =
    useEligibilityRecommendedList();

  const totalElements = isLoading || !isSuccess ? null : (data?.pages[0]?.totalElements ?? 0);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center pb-[88px]">
        <Spinner title="추천 공고 불러오는 중..." description="잠시만 기다려주세요" />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <EligibilityRecommendedHeader totalElements={totalElements} />
      {totalElements === 0 ? (
        <div className="flex h-full flex-col items-center justify-center pb-[88px]">
          <ListingNoSearchResult text="진단기반 추천 공고가 없어요. <br /> 자격 진단을 완료해 보세요." />
        </div>
      ) : (
        <div className="min-h-0 flex-1 px-4">
          <div className="flex items-center justify-between px-4 py-1">
            <div className="flex items-center gap-1 text-xl font-bold">
              <p className="text-base-17 text-text-primary">
                {ELIGIBILITY_RECOMMENDED_HEADER_LABEL}
              </p>
              <p className="text-base-17 text-text-tertiary">{totalElements ?? 0}</p>
            </div>
          </div>
          <EligibilityRecommendedList
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isError={isError}
            enableInfiniteScroll={enableInfiniteScroll}
          />
        </div>
      )}
    </div>
  );
}
