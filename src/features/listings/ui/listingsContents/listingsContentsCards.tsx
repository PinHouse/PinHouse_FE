"use client";
/**
 * 현재 카드 공통 재사용 컴포넌트로 교체 했으나 테스트용으로 보관
 */
import { useListingState } from "../../model/listingsStore";
import {
  ListingContentsCardsProps,
  ListingItem,
  ListingItemMinimal,
  ToggleLikeVariables,
} from "@/src/entities/listings/model/type";
import { getListingIcon, getListingsRental } from "../../hooks/listingsHooks";
import { ListingBgBookMark, ListingBookMark } from "./listingsBookMark";
import { formatApplyPeriod } from "@/src/shared/lib/utils";
import { LineLikeButton } from "@/src/assets/icons/button/lineLikeButton";
import { LikeButton } from "@/src/assets/icons/button/likeButton";
import { useToogleLike } from "@/src/entities/listings/hooks/useListingHooks";

const HouseICons = (item: ListingItem) => {
  const icon = getListingIcon(item.type, item.housingType);
  return <div>{icon}</div>;
};

const LikeType = ({ id, liked }: ListingItemMinimal) => {
  const { mutateAsync } = useToogleLike();
  const toggleLike = async () => {
    const body: ToggleLikeVariables = liked
      ? { method: "delete", targetId: Number(id), type: "NOTICE" }
      : { method: "post", targetId: Number(id), liked: liked, type: "NOTICE" };

    await mutateAsync(body);
  };

  return <div onClick={toggleLike}>{liked ? <LikeButton /> : <LineLikeButton />}</div>;
};

const HouseRental = (item: ListingItem) => {
  const rantalText = getListingsRental(item.type);
  if (!rantalText) return null;
  return (
    <span className="flex w-full justify-between">
      <ListingBgBookMark item={item.type} bg={rantalText.bg} text={rantalText.text} border="none" />
      <LikeType liked={item.liked} id={item.id} />
    </span>
  );
};

export const ListingContentsCards = ({ data }: ListingContentsCardsProps) => {
  const { status } = useListingState();

  return (
    <div className="flex flex-col gap-2">
      {data?.map((item: ListingItem) => (
        <div key={item.id} className="flex h-[112px] min-h-[100px] w-full rounded-xl border">
          <div className="border-r-1 flex w-[35%] flex-col bg-bgColor-mute pl-1 pt-2">
            <div className="flex justify-start gap-1">
              <ListingBookMark item={item.housingType} border="border" />
              <p className="truncate text-xs font-semibold text-greyscale-grey-800">
                {item.supplier}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <HouseICons {...item} />
            </div>
          </div>
          <div className="flex w-[65%] flex-col justify-start gap-2 pb-3 pl-4 pr-4 pt-2">
            <div className="flex items-baseline gap-2">
              <HouseRental {...item} />
            </div>
            <div className="max-w-full">
              <p className="truncate text-sm font-semibold">{item.name}</p>
            </div>
            <div className="max-w-full">
              <p className="text-sm text-greyscale-grey-400">모집일정</p>
              <p className="text-sm text-greyscale-grey-400">
                {formatApplyPeriod(item.applyPeriod)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
