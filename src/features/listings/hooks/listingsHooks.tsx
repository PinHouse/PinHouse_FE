import {
  ListingItemMinimal,
  ListingNormalized,
  RentType,
  ToggleLikeVariables,
} from "@/src/entities/listings/model/type";
import { DetailFilterTabKey, FilterTabKey, RENT_COLOR_CLASS } from "../model";
import { LISTING_ICON_MAP } from "../model/listingsMap";
import { ListingBgBookMark } from "../ui/listingsContents/listingsBookMark";
import { useToogleLike } from "@/src/entities/listings/hooks/useListingHooks";
import { LikeButton } from "@/src/assets/icons/button/likeButton";
import { LineLikeButton } from "@/src/assets/icons/button/lineLikeButton";

export const getListingsRental = (type: string) => {
  if (!(type in RENT_COLOR_CLASS)) return null;
  const key = type as RentType;
  const rental = RENT_COLOR_CLASS[key];
  return rental;
};

export const getListingIcon = (type: string, housingType: string, size = 78) => {
  const IconComp = LISTING_ICON_MAP[type]?.[housingType];
  if (!IconComp) return null;

  return <IconComp width={size} height={size} />;
};

export function getIndicatorLeft(activeTab: FilterTabKey) {
  switch (activeTab) {
    case "region":
      return 20;
    case "target":
      return 20 + 55;
    case "rental":
      return 20 + 55 + 80;
    case "housing":
      return 20 + 55 + 77 + 84;
  }
}

export function getDetailIndicatorLeft(activeTab: DetailFilterTabKey) {
  switch (activeTab) {
    case "distance":
      return 20;
    case "region":
      return 20 + 57;
    case "cost":
      return 20 + 57 + 55;
    case "around":
      return 20 + 57 + 55;
    case "area":
      return 20 + 57 + 55 + 57;
  }
}

export function getIndicatorWidth(activeTab: FilterTabKey) {
  switch (activeTab) {
    case "region":
      return 32;
    case "target":
      return 60;
    case "rental":
      return 60;
    case "housing":
      return 60;
  }
}

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

export const HouseICons = (item: ListingNormalized) => {
  const icon = getListingIcon(item.type, item.housingType);
  return <div>{icon}</div>;
};

export const HouseRental = (item: ListingNormalized) => {
  const rantalText = getListingsRental(item.type);
  if (!rantalText) return null;
  return (
    <span className="flex w-full justify-between">
      <ListingBgBookMark item={item.type} bg={rantalText.bg} text={rantalText.text} border="none" />
      <LikeType liked={item.liked} id={item.id} />
    </span>
  );
};
