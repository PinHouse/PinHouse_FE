"use client";
import { useListingDetailBasic } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { ListingDetailResponseWithColor } from "@/src/entities/listings/model/type";
import {
  ListingsCardDetailCompareButton,
  ListingsCardDetailComplexSection,
  ListingsCardDetailFilterBar,
  ListingsCardDetailHeader,
  ListingsCardDetailOutOfCriteriaSection,
  ListingsCardDetailSummary,
} from "@/src/features/listings";
import {
  useDetailFilterSheetStore,
  useListingDetailCountStore,
} from "@/src/features/listings/model";
import { PageTransition } from "@/src/shared/ui/animation";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { useEffect, useState } from "react";

type ListingDetailRenderData = {
  basicInfo: ListingDetailResponseWithColor["data"]["basicInfo"];
  filtered: ListingDetailResponseWithColor["data"]["filtered"];
  nonFiltered: ListingDetailResponseWithColor["data"]["nonFiltered"];
};

export const ListingsCardDetailSection = ({ id }: { id: string }) => {
  const { data, isLoading } = useListingDetailBasic(id);
  const open = useDetailFilterSheetStore(state => state.open);
  const setCounts = useListingDetailCountStore(state => state.setCounts);

  const [renderData, setRenderData] = useState<ListingDetailRenderData | null>(null);

  useEffect(() => {
    if (open) return;
    if (!data?.data) return;

    const { basicInfo, filtered, nonFiltered } = data.data;
    if (!basicInfo || !filtered || !nonFiltered) return;

    setRenderData({ basicInfo, filtered, nonFiltered });
  }, [open, data]);

  useEffect(() => {
    const liveFiltered = data?.data.filtered;
    if (!liveFiltered) return;

    setCounts(liveFiltered.totalCount);
  }, [data?.data.filtered?.totalCount, setCounts]);

  if (!renderData) {
    return (
      <div className="flex h-full items-center justify-center pb-[88px]">
        <Spinner title="공고 탐색중..." description="잠시만 기다려주세요" />
      </div>
    );
  }

  const { basicInfo, filtered, nonFiltered } = renderData;

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
            onFilteredCount={nonFiltered.totalCount}
          />

          <ListingsCardDetailOutOfCriteriaSection listings={nonFiltered} />
        </main>
      </PageTransition>
    </div>
  );
};
