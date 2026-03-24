"use client";

import {
  ListingCompareCard,
  ListingCompareHeader,
  ListingsCompareContentHeader,
} from "@/src/features/listings/ui/listingsCompareRoom";
import { InfraSheet } from "@/src/features/listings/ui/listingsCardDetail/infra/infraSheet";
import { ListingCompareCardSkeleton } from "@/src/features/listings/ui/listingsCompareRoom/components/listingsCompareCardSkeleton";
import { PageTransition } from "@/src/shared/ui/animation";
import { useListingCompareSectionHooks } from "@/src/features/listings/hooks";

type ListingCompareSectionProps = {
  id: string;
  sortType?: string;
  nearbyFacilities?: string[];
  pinPointId: string;
};

export const ListingCompareSection = ({
  id,
  sortType,
  nearbyFacilities,
  pinPointId,
}: ListingCompareSectionProps) => {
  const { sheetState, setSheetState, isLoading, unitData, zeroCount } =
    useListingCompareSectionHooks({
      id,
      sortType,
      nearbyFacilities,
      pinPointId,
    });

  return (
    <section className="mx-auto min-h-full w-full">
      <PageTransition>
        <ListingCompareHeader id={id} />
        <div className="px-5 pt-4">
          <ListingsCompareContentHeader count={zeroCount} />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-2 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ListingCompareCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {unitData?.map(unit => (
                <div key={unit.typeId}>
                  <ListingCompareCard unitData={unit} onOpenSheet={setSheetState} />
                </div>
              ))}
            </div>
          </div>
        )}
      </PageTransition>
      <InfraSheet sheetState={sheetState} onClose={() => setSheetState({ open: false })} />
    </section>
  );
};
