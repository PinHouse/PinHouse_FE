"use client";

import { useEffect, useState } from "react";
import { CompareDefaultImage } from "@/src/assets/images/compare/compare";
import { useListingRoomTypeDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { ListingUnitType } from "@/src/entities/listings/model/type";
import { toPyeong } from "@/src/features/listings/model";
import { LikeType } from "@/src/features/listings/hooks/listingsHooks";
import { formatNumber } from "@/src/shared/lib/numberFormat";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
import { DepositSection } from "./components/roomType/depositSection";
import { TypeInfoSection } from "./components/roomType/typeInfoSection";

export const RoomTypeDetail = ({ listingId }: { listingId: string }) => {
  const { data, isFetching } = useListingRoomTypeDetail<ListingUnitType>({
    id: listingId,
    queryK: "useListingRoomTypeDetail",
    url: "unit",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const items = data ?? [];
  const current = items[currentIndex];

  const goPrev = () => {
    setCurrentIndex(p => (p - 1 + items.length) % Math.max(items.length, 1));
  };

  const goNext = () => {
    setCurrentIndex(p => (p + 1) % Math.max(items.length, 1));
  };

  const hasNext = currentIndex + 1 < items.length;

  useEffect(() => {
    setCurrentIndex(0);
  }, [listingId]);

  if (isFetching && !items.length) {
    return <SmallSpinner title="방 타입 불러오는 중..." />;
  }

  if (!items.length) {
    return (
      <div className="p-6 text-center text-sm text-text-secondary">
        표시할 방 타입 정보가 없어요.
      </div>
    );
  }

  return (
    <section className="flex h-full flex-col">
      <div className="relative flex flex-col justify-center bg-greyscale-grey-25">
        <div className="flex justify-between pl-3 pr-3 pt-3">
          <span className="flex gap-1">
            {current.group.map(tag => (
              <TagButton
                key={tag}
                size="xs"
                variant="ghost"
                className="rounded-md border border-greyscale-grey-100 bg-white px-2 py-1 text-xs font-bold text-greyscale-grey-400"
              >
                {tag}
              </TagButton>
            ))}
          </span>

          <span className="flex items-center justify-center">
            <LikeType
              id={current?.typeId}
              liked={current?.liked}
              type="ROOM"
              resetQuery={["useListingRoomTypeDetail"]}
            />
          </span>
        </div>

        <div className="relative flex h-60 w-full items-center justify-center">
          <div className="relative aspect-[4/1.5] w-full overflow-hidden">
            {current?.thumbnail ? (
              <img src={current.thumbnail} className="h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <CompareDefaultImage className="h-30 object-contain opacity-60" />
                <p className="text-xs text-greyscale-grey-400">이미지 준비 중입니다.</p>
              </div>
            )}
          </div>

          {items.length > 1 && (
            <TypeInfoSection
              onPrev={goPrev}
              onNext={goNext}
              isLast={hasNext}
              currentIndex={currentIndex}
            />
          )}

          <div className="pointer-events-none absolute bottom-2 px-2 py-0.5 text-sm-15">
            <span className="text-greyscale-grey-700">{currentIndex + 1}</span>
            <span className="text-greyscale-grey-400"> {"/"} </span>
            <span className="text-greyscale-grey-400">{items.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1 border-t border-greyscale-grey-50 p-5">
        <h3 className="text-lg font-semibold text-text-primary">{current?.typeCode}</h3>
        <p className="text-xs text-text-secondary">
          전용면적 {formatNumber(current?.exclusiveAreaM2 ?? 0)}m² (
          {toPyeong(current?.exclusiveAreaM2 ?? 0)}평)
          <span className="mx-2 text-greyscale-grey-200">|</span>
          모집호수 {formatNumber(current?.quota ?? 0)}호
        </p>
      </div>

      <div className="border-t border-greyscale-grey-50">
        <DepositSection deposit={current?.deposit} />
      </div>
    </section>
  );
};
