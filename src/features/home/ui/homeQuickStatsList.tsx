import { useEffect, useMemo, useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { CaretDown } from "@/src/assets/icons/button/caretDown";
import { HomeFiveoclock } from "@/src/assets/icons/home/HomeFiveoclock";
import { HomePushPin } from "@/src/assets/icons/home/homePushpin";

import { useListingFilterDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { PinPointPlace } from "@/src/entities/listings/model/type";
import { getDefaultPinPointLabel, mapPinPointToOptions } from "../../listings/hooks/listingsHooks";
import { useOAuthStore } from "../../login/model";

export const QuickStatsList = () => {
  const { data, isFetching } = useListingFilterDetail<PinPointPlace>();
  const { setPinPointId } = useOAuthStore();

  const pinPointOptions = useMemo(() => mapPinPointToOptions(data?.pinPoints), [data?.pinPoints]);
  const pinPointData = pinPointOptions.myPinPoint;
  const hasPinPoints = pinPointData.length > 0;

  return (
    <div className="relative flex items-center rounded-2xl bg-white px-4 py-4">
      {/* 핀포인트 */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-1 text-xs text-greyscale-grey-500">
          <HomePushPin width={17} height={17} />
          <span>핀포인트</span>
        </div>
        <button className="text-md flex items-center gap-1 font-semibold">
          경기 성남시 분당
          <span className="pl-1 text-greyscale-grey-400">
            <CaretDown />
          </span>
        </button>
      </div>

      {/* Divider */}
      <span className="pointer-events-none absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-greyscale-grey-200" />

      {/* 최대시간 */}
      <div className="flex flex-1 flex-col items-start gap-1 pl-8">
        <div className="flex items-center gap-1 text-xs text-greyscale-grey-500">
          <HomeFiveoclock width={15} height={15} />
          <span>최대시간</span>
        </div>

        <button className="flex items-center gap-1 text-lg font-semibold">
          00시간 00분
          <span className="pl-1 text-greyscale-grey-400">
            <CaretDown />
          </span>
        </button>
      </div>
    </div>
  );
};
