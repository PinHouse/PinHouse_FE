import { UnitType } from "@/src/entities/listings/model/type";
import { ListingsCompareGroup } from "./listingsCompareGroup";
import { SheetState } from "../../../model";

export const ListingCompareCard = ({
  unitData,
  onOpenSheet,
}: {
  unitData: UnitType;
  onOpenSheet: (state: SheetState) => void;
}) => {
  return <ListingsCompareGroup unit={unitData} onOpenSheet={onOpenSheet} />;
};
