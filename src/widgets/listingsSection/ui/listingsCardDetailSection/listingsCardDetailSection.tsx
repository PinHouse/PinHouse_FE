"use client";
import {
  ListingsCardDetailCompareButton,
  ListingsCardDetailComplexSection,
  ListingsCardDetailFilterBar,
  ListingsCardDetailHeader,
  ListingsCardDetailOutOfCriteriaSection,
  ListingsCardDetailSummary,
} from "@/src/features/listings";
import { DataEnterTransition } from "@/src/shared/ui/animation/pageUpTransition";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { useListingsCardDetailSectionHooks } from "@/src/features/listings/hooks";

export const ListingsCardDetailSection = ({ id }: { id: string }) => {
  const { data, isLoading, ready, basicInfo, filtered, nonFiltered } =
    useListingsCardDetailSectionHooks(id);

  if (!data?.data || isLoading) {
    return (
      <div className="flex h-full items-center justify-center pb-[88px]">
        <Spinner title="공고 탐색중..." description="잠시만 기다려주세요" />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-full w-full">
      <DataEnterTransition ready={ready}>
        {ready && basicInfo && filtered && nonFiltered && (
          <>
            <ListingsCardDetailHeader />
            <main>
              <ListingsCardDetailSummary basicInfo={basicInfo} />

              <ListingsCardDetailCompareButton paramId={id} />
              <ListingsCardDetailFilterBar />

              <ListingsCardDetailComplexSection
                listings={filtered}
                onFilteredCount={nonFiltered.totalCount}
              />

              <ListingsCardDetailOutOfCriteriaSection listings={nonFiltered} />
            </main>
          </>
        )}
      </DataEnterTransition>
    </div>
  );
};
