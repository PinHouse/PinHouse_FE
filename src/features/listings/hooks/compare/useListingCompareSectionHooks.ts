"use client";

import { useState } from "react";
import { useListingRoomCompare } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { UnitTypeRespnse } from "@/src/entities/listings/model/type";
import { SheetState, useListingState } from "@/src/features/listings/model";

type UseListingCompareSectionHooksArgs = {
  id: string;
  sortType?: string;
  nearbyFacilities?: string[];
  pinPointId?: string;
};

export const useListingCompareSectionHooks = ({
  id,
  sortType,
  nearbyFacilities,
  pinPointId,
}: UseListingCompareSectionHooksArgs) => {
  const { status } = useListingState();
  const [sheetState, setSheetState] = useState<SheetState>({ open: false });
  const resolvedSortType = sortType ?? status;
  const resolvedNearbyFacilities = nearbyFacilities ?? [];
  const { data, isLoading } = useListingRoomCompare<UnitTypeRespnse>({
    noticeId: id,
    sortType: resolvedSortType,
    nearbyFacilities: resolvedNearbyFacilities,
    pinPointId,
  });
  const unitData = data?.unitTypes ?? [];
  const count = unitData.length;
  const zeroCount = count > 10 ? `0${count}` : `${count}`;
  return {
    sheetState,
    setSheetState,
    isLoading,
    unitData,
    zeroCount,
  };
};
