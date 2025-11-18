import { FilterTabKey, RENT_COLOR_CLASS } from "../model";
import { LISTING_ICON_MAP } from "../model/listingsMap";

type RentType = keyof typeof RENT_COLOR_CLASS;

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
