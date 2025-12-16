"use cilent";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useListingRoomTypeDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
import { formatNumber } from "@/src/shared/lib/numberFormat";
import { toPyeong } from "@/src/features/listings/model";
import { DepositSection } from "./components/roomType/depositSection";
import { TypeInfoSection } from "./components/roomType/typeInfoSection";

export const RoomTypeDetail = ({ listingId }: { listingId: string }) => {
  const { data, isFetching } = useListingRoomTypeDetail(listingId);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = data ?? [];

  const current = useMemo(() => {
    return items[currentIndex];
  }, [items, currentIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex(p => (p - 1 + items.length) % Math.max(items.length, 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setCurrentIndex(p => (p + 1) % Math.max(items.length, 1));
  }, [items.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [listingId]);

  if (isFetching) return <SmallSpinner title="방 타입 불러오는 중.." />;
  if (!items.length) {
    return (
      <div className="p-6 text-center text-sm text-text-secondary">
        표시할 방 타입 정보가 없어요.
      </div>
    );
  }

  return (
    <section className="flex h-full flex-col">
      <div className="relative flex items-center justify-center bg-greyscale-grey-25">
        <div className="relative flex h-60 w-full items-center justify-center">
          <img
            src={current?.thumbnail ?? "/area.png"}
            alt={current?.typeCode ?? "room-type"}
            className="max-h-full object-contain"
          />
          {items.length > 1 && <TypeInfoSection onPrev={goPrev} onNext={goNext} />}

          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2 py-0.5 text-[11px] text-white">
            {currentIndex + 1} / {items.length}
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
