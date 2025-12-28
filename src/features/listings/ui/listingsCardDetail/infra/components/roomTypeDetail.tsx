"use cilent";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useListingRoomTypeDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
import { formatNumber } from "@/src/shared/lib/numberFormat";
import { toPyeong } from "@/src/features/listings/model";
import { DepositSection } from "./components/roomType/depositSection";
import { TypeInfoSection } from "./components/roomType/typeInfoSection";
import { ListingItemMinimal, ListingUnitType } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { LikeButton } from "@/src/assets/icons/button/likeButton";
import { LineLikeButton } from "@/src/assets/icons/button/lineLikeButton";
import { UnLikeButton } from "@/src/assets/icons/button/unLikeButton";

const LikeType = ({ id, liked }: ListingItemMinimal) => {
  // const { mutateAsync } = useToogleLike();
  // const toggleLike = async () => {
  //   const body: ToggleLikeVariables = liked
  //     ? { method: "delete", targetId: Number(id), type: "NOTICE" }
  //     : { method: "post", targetId: Number(id), liked: liked, type: "NOTICE" };

  //   await mutateAsync(body);
  // };

  // return <div onClick={toggleLike}>{liked ? <LikeButton /> : <LineLikeButton />}</div>;
  return (
    <div>
      {liked ? <LikeButton width={23} height={23} /> : <UnLikeButton width={23} height={23} />}
    </div>
  );
};

export const RoomTypeDetail = ({ listingId }: { listingId: string }) => {
  const { data, isFetching } = useListingRoomTypeDetail<ListingUnitType>({
    id: listingId,
    queryK: "useListingRoomTypeDetail",
    url: "unit",
  });
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

  const isLast = currentIndex + 1 < items.length;

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
      <div className="relative flex flex-col justify-center bg-greyscale-grey-25">
        <div className="flex justify-between pl-3 pr-3 pt-3">
          <span>
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
            <LikeType id={"1"} liked={false} />
          </span>
        </div>
        <div className="relative flex h-60 w-full items-center justify-center">
          <div className="flex-[1] items-center justify-center p-10">
            <img
              src={current?.thumbnail ?? "/area.png"}
              alt={current?.typeCode ?? "room-type"}
              className="h-full w-full object-contain"
            />
          </div>
          {items.length > 1 && <TypeInfoSection onPrev={goPrev} onNext={goNext} isLast={isLast} />}

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
