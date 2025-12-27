"use client";
import { useListingDetailBasic } from "@/src/entities/listings/hooks/useListingDetailHooks";
import {
  ListingsCardDetailCompareButton,
  ListingsCardDetailComplexSection,
  ListingsCardDetailFilterBar,
  ListingsCardDetailHeader,
  ListingsCardDetailOutOfCriteriaSection,
  ListingsCardDetailSummary,
} from "@/src/features/listings";
import { PageTransition } from "@/src/shared/ui/animation";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { useState } from "react";

export const ListingsCardDetailSection = ({ id }: { id: string }) => {
  const { data, isLoading, isFetching } = useListingDetailBasic(id);
  const basicInfo = data?.data.basicInfo;
  const filtered = data?.data.filtered;
  const nonFiltered = data?.data.nonFiltered;

  if (isLoading || isFetching || !basicInfo || !filtered || !nonFiltered) {
    return (
      <div className="flex h-full items-center justify-center pb-[88px]">
        <Spinner title="공고 탐색중..." description="잠시만 기다려주세요" />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-full w-full">
      <PageTransition>
        <ListingsCardDetailHeader />
        <main>
          <ListingsCardDetailSummary basicInfo={basicInfo} />
          <ListingsCardDetailCompareButton />
          <ListingsCardDetailFilterBar />
          <ListingsCardDetailComplexSection
            listings={filtered}
            onFilteredCount={nonFiltered?.totalCount}
          />
          <ListingsCardDetailOutOfCriteriaSection listings={nonFiltered} />
        </main>
      </PageTransition>
    </div>
  );
};
