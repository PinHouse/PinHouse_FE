import { RENT_COLOR_CLASS } from "../model";
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
