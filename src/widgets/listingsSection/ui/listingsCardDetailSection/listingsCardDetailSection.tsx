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
import {
  useDetailFilterSheetStore,
  useListingDetailCountStore,
} from "@/src/features/listings/model";
import { useEffect } from "react";
import { DataEnterTransition } from "@/src/shared/ui/animation/pageUpTransition";
import { Spinner } from "@/src/shared/ui/spinner/default";

export const ListingsCardDetailSection = ({ id }: { id: string }) => {
  const { data, isLoading } = useListingDetailBasic(id);
  const open = useDetailFilterSheetStore(state => state.open);
  const setCounts = useListingDetailCountStore(state => state.setCounts);

  const ready = !!id && !!data?.data && !isLoading;

  useEffect(() => {
    if (!data?.data?.filtered) return;
    setCounts(data.data.filtered.totalCount);
  }, [data?.data?.filtered?.totalCount, setCounts]);

  const basicInfo = data?.data?.basicInfo;
  const filtered = data?.data?.filtered;
  const nonFiltered = data?.data?.nonFiltered;

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
              {!open && <ListingsCardDetailSummary basicInfo={basicInfo} />}

              <ListingsCardDetailCompareButton paramId={id} />
              <ListingsCardDetailFilterBar />

              <ListingsCardDetailComplexSection
                listings={filtered}
                onFilteredCount={nonFiltered.totalCount}
              />

              {!open && <ListingsCardDetailOutOfCriteriaSection listings={nonFiltered} />}
            </main>
          </>
        )}
      </DataEnterTransition>
    </div>
  );
};
