"use client";
import { useListingRoomCompare } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { UnitTypeRespnse } from "@/src/entities/listings/model/type";
import { useListingState } from "@/src/features/listings/model";
import {
  ListingCompareCard,
  ListingCompareHeader,
  ListingsCompareContentHeader,
} from "@/src/features/listings/ui/listingsCompareRoom";
import { ListingCompareCardSkeleton } from "@/src/features/listings/ui/listingsCompareRoom/components/listingsCompareCardSkeleton";
import { PageTransition } from "@/src/shared/ui/animation";

export const ListingCompareSection = ({ id }: { id: string }) => {
  const { status } = useListingState();

  const { data, isLoading, error } = useListingRoomCompare<UnitTypeRespnse>({
    noticeId: id,
    sortType: status === "전체" ? "핀포인트 거리순" : status,
    nearbyFacilities: ["도서관"],
  });

  const unitData = data?.unitTypes;
  const count = Number(data?.unitTypes?.length);
  const zeroCount = count <= 10 ? `0${count}` : `${count}`;
  return (
    <section className="mx-auto min-h-full w-full">
      <PageTransition>
        <ListingCompareHeader id={id} />
        <div className="p-5">
          <ListingsCompareContentHeader count={zeroCount} />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-2 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ListingCompareCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="px-4">
            <div className="grid grid-cols-2 gap-3">
              {unitData?.map(unit => (
                <div key={unit.typeId} className="flex justify-center">
                  <ListingCompareCard {...unit} />
                </div>
              ))}
            </div>
          </div>
        )}
      </PageTransition>
    </section>
  );
};
