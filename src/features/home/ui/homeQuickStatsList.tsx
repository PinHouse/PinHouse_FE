import { useMemo } from "react";
import { CaretDown } from "@/src/assets/icons/button/caretDown";
import { HomeFiveoclock } from "@/src/assets/icons/home/HomeFiveoclock";
import { HomePushPin } from "@/src/assets/icons/home/homePushpin";

import { useListingFilterDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { PinPointPlace } from "@/src/entities/listings/model/type";
import { getDefaultPinPointLabel, mapPinPointToOptions } from "../../listings/hooks/listingsHooks";
import { useOAuthStore } from "../../login/model";
import { DropDown } from "@/src/shared/ui/dropDown/deafult";

export const QuickStatsList = () => {
  const { data, isFetching } = useListingFilterDetail<PinPointPlace>();
  const { setPinPointId } = useOAuthStore();

  const pinPointOptions = useMemo(() => mapPinPointToOptions(data?.pinPoints), [data?.pinPoints]);
  const pinPointData = pinPointOptions.myPinPoint;
  const dropDownTriggerLabel = getDefaultPinPointLabel(pinPointOptions);

  const hasPinPoints = pinPointData.length > 0;
  const onChangePinPoint = (id: string) => {
    setPinPointId(id);
  };
  return (
    <div className="relative grid grid-cols-2 grid-rows-[auto,1fr] rounded-2xl bg-white p-4">
      <div className="flex items-center gap-1 text-xs text-greyscale-grey-500">
        <HomePushPin width={17} height={17} />
        <span>핀포인트</span>
      </div>

      <div className="flex items-center gap-1 pl-6 text-xs text-greyscale-grey-500">
        <HomeFiveoclock width={15} height={15} />
        <span>최대시간</span>
      </div>

      <div className="flex items-center">
        <DropDown
          types="myPinPoint"
          data={pinPointOptions}
          icon={<CaretDown />}
          disabled={isFetching || !hasPinPoints}
          className="border-none pl-0 text-left text-sm"
          onChange={onChangePinPoint}
        >
          {dropDownTriggerLabel}
        </DropDown>
      </div>

      <div className="flex items-center pl-6">
        <button className="flex items-center gap-1 text-lg font-semibold leading-none">
          00시간 00분
          <span className="pl-1 text-greyscale-grey-400">
            <CaretDown />
          </span>
        </button>
      </div>

      <span className="pointer-events-none absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-greyscale-grey-200" />
    </div>
  );
};
