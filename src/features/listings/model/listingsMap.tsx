// 사용처: 공고 카드 썸네일 아이콘 매핑 (getListingIcon → HouseICons)
// - src/features/listings/hooks/listingsHooks.tsx
import { HapplyHouseType } from "@/src/assets/icons/houseType/happyHousing/house-type";
import { HappyHouseType1 } from "@/src/assets/icons/houseType/happyHousing/house-type1";
import { HappyHouseType2 } from "@/src/assets/icons/houseType/happyHousing/house-type2";
import { HapplyHouseType3 } from "@/src/assets/icons/houseType/happyHousing/house-type3";
import { HapplyHouseType4 } from "@/src/assets/icons/houseType/happyHousing/house-type4";
import { HapplyHouseType5 } from "@/src/assets/icons/houseType/happyHousing/house-type5";
import { IntegratedHouseType } from "@/src/assets/icons/houseType/IntegratedPublicRentalHousing/house-type";
import { IntegratedHouseType1 } from "@/src/assets/icons/houseType/IntegratedPublicRentalHousing/house-type1";
import { IntegratedHouseType2 } from "@/src/assets/icons/houseType/IntegratedPublicRentalHousing/house-type2";
import { IntegratedHouseType3 } from "@/src/assets/icons/houseType/IntegratedPublicRentalHousing/house-type3";
import { IntegratedHouseType4 } from "@/src/assets/icons/houseType/IntegratedPublicRentalHousing/house-type4";
import { IntegratedHouseType5 } from "@/src/assets/icons/houseType/IntegratedPublicRentalHousing/house-type5";
import { jeonseHouseType } from "@/src/assets/icons/houseType/jeonse-basedRental Housing/house-type";
import { jeonseHouseType1 } from "@/src/assets/icons/houseType/jeonse-basedRental Housing/house-type1";
import { jeonseHouseType2 } from "@/src/assets/icons/houseType/jeonse-basedRental Housing/house-type2";
import { jeonseHouseType3 } from "@/src/assets/icons/houseType/jeonse-basedRental Housing/house-type3";
import { jeonseHouseType4 } from "@/src/assets/icons/houseType/jeonse-basedRental Housing/house-type4";
import { jeonseHouseType5 } from "@/src/assets/icons/houseType/jeonse-basedRental Housing/house-type5";
import { LongHouseType } from "@/src/assets/icons/houseType/long-termJeonseHousing/house-type";
import { LongHouseType1 } from "@/src/assets/icons/houseType/long-termJeonseHousing/house-type1";
import { LongHouseType2 } from "@/src/assets/icons/houseType/long-termJeonseHousing/house-type2";
import { LongHouseType3 } from "@/src/assets/icons/houseType/long-termJeonseHousing/house-type3";
import { LongHouseType4 } from "@/src/assets/icons/houseType/long-termJeonseHousing/house-type4";
import { LongHouseType5 } from "@/src/assets/icons/houseType/long-termJeonseHousing/house-type5";
import { NyearHouseType } from "@/src/assets/icons/houseType/n-yearRentalHousing/house-type";
import { NyearHouseType1 } from "@/src/assets/icons/houseType/n-yearRentalHousing/house-type1";
import { NyearHouseType2 } from "@/src/assets/icons/houseType/n-yearRentalHousing/house-type2";
import { NyearHouseType3 } from "@/src/assets/icons/houseType/n-yearRentalHousing/house-type3";
import { NyearHouseType4 } from "@/src/assets/icons/houseType/n-yearRentalHousing/house-type4";
import { NyearHouseType5 } from "@/src/assets/icons/houseType/n-yearRentalHousing/house-type5";
import { NationHouseType } from "@/src/assets/icons/houseType/nationalRentalHousing/house-type";
import { NationHouseType1 } from "@/src/assets/icons/houseType/nationalRentalHousing/house-type1";
import { NationHouseType2 } from "@/src/assets/icons/houseType/nationalRentalHousing/house-type2";
import { NationHouseType3 } from "@/src/assets/icons/houseType/nationalRentalHousing/house-type3";
import { NationHouseType4 } from "@/src/assets/icons/houseType/nationalRentalHousing/house-type4";
import { NationHouseType5 } from "@/src/assets/icons/houseType/nationalRentalHousing/house-type5";
import { PermanentHouseType } from "@/src/assets/icons/houseType/permanentRentalHousing/house-type";
import { PermanentHouseType1 } from "@/src/assets/icons/houseType/permanentRentalHousing/house-type1";
import { PermanentHouseType2 } from "@/src/assets/icons/houseType/permanentRentalHousing/house-type2";
import { PermanentHouseType3 } from "@/src/assets/icons/houseType/permanentRentalHousing/house-type3";
import { PermanentHouseType4 } from "@/src/assets/icons/houseType/permanentRentalHousing/house-type4";
import { PermanentHouseType5 } from "@/src/assets/icons/houseType/permanentRentalHousing/house-type5";
import { PrivateHouseType } from "@/src/assets/icons/houseType/privateRentalHousing/house-type";
import { PrivateHouseType1 } from "@/src/assets/icons/houseType/privateRentalHousing/house-type1";
import { PrivateHouseType2 } from "@/src/assets/icons/houseType/privateRentalHousing/house-type2";
import { PrivateHouseType3 } from "@/src/assets/icons/houseType/privateRentalHousing/house-type3";
import { PrivateHouseType4 } from "@/src/assets/icons/houseType/privateRentalHousing/house-type4";
import { PrivateHouseType5 } from "@/src/assets/icons/houseType/privateRentalHousing/house-type5";
import { PurchaseHouseType } from "@/src/assets/icons/houseType/purchase-basedRentalHousing/house-type";
import { PurchaseHouseType1 } from "@/src/assets/icons/houseType/purchase-basedRentalHousing/house-type1";
import { PurchaseHouseType2 } from "@/src/assets/icons/houseType/purchase-basedRentalHousing/house-type2";
import { PurchaseHouseType3 } from "@/src/assets/icons/houseType/purchase-basedRentalHousing/house-type3";
import { PurchaseHouseType4 } from "@/src/assets/icons/houseType/purchase-basedRentalHousing/house-type4";
import { PurchaseHouseType5 } from "@/src/assets/icons/houseType/purchase-basedRentalHousing/house-type5";
import { SVGProps } from "react";

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;
export const LISTING_ICON_MAP: Record<string, Record<string, IconComponent>> = {
  영구임대: {
    "단독/다가구": PermanentHouseType,
    다세대주택: PermanentHouseType1,
    연립주택: PermanentHouseType2,
    아파트: PermanentHouseType3,
    오피스텔: PermanentHouseType4,
    기숙사: PermanentHouseType5,
  },

  국민임대: {
    "단독/다가구": NationHouseType,
    다세대주택: NationHouseType1,
    연립주택: NationHouseType2,
    아파트: NationHouseType3,
    오피스텔: NationHouseType4,
    기숙사: NationHouseType5,
  },

  매입임대: {
    "단독/다가구": PurchaseHouseType,
    다세대주택: PurchaseHouseType1,
    연립주택: PurchaseHouseType2,
    아파트: PurchaseHouseType3,
    오피스텔: PurchaseHouseType4,
    기숙사: PurchaseHouseType5,
  },

  N년임대: {
    "단독/다가구": NyearHouseType,
    다세대주택: NyearHouseType1,
    연립주택: NyearHouseType2,
    아파트: NyearHouseType3,
    오피스텔: NyearHouseType4,
    기숙사: NyearHouseType5,
  },

  전세임대: {
    "단독/다가구": jeonseHouseType,
    다세대주택: jeonseHouseType1,
    연립주택: jeonseHouseType2,
    아파트: jeonseHouseType3,
    오피스텔: jeonseHouseType4,
    기숙사: jeonseHouseType5,
  },

  민간임대: {
    "단독/다가구": PrivateHouseType,
    다세대주택: PrivateHouseType1,
    연립주택: PrivateHouseType2,
    아파트: PrivateHouseType3,
    오피스텔: PrivateHouseType4,
    기숙사: PrivateHouseType5,
  },

  통합공공임대: {
    "단독/다가구": IntegratedHouseType,
    다세대주택: IntegratedHouseType1,
    연립주택: IntegratedHouseType2,
    아파트: IntegratedHouseType3,
    오피스텔: IntegratedHouseType4,
    기숙사: IntegratedHouseType5,
  },

  장기전세: {
    "단독/다가구": LongHouseType,
    다세대주택: LongHouseType1,
    연립주택: LongHouseType2,
    아파트: LongHouseType3,
    오피스텔: LongHouseType4,
    기숙사: LongHouseType5,
  },

  행복주택: {
    "단독/다가구": HapplyHouseType,
    다세대주택: HappyHouseType1,
    연립주택: HappyHouseType2,
    아파트: HapplyHouseType3,
    오피스텔: HapplyHouseType4,
    기숙사: HapplyHouseType5,
  },
};
