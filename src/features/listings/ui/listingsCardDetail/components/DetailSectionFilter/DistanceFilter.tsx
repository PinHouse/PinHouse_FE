import { useListingFilterDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { PinPointPlace } from "@/src/entities/listings/model/type";
import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import { Slider } from "@/src/shared/ui/slider";
import { useOAuthStore } from "@/src/features/login/model";
import { useListingDetailCountStore, useListingDetailFilter } from "@/src/features/listings/model";
import {
  getDefaultPinPointLabel,
  mapPinPointToOptions,
} from "@/src/features/listings/hooks/listingsHooks";
import { ListingCardDetailOut } from "@/src/features/listings/ui/listingsCardDetail/button/button";
import {
  useDistanceHooks,
  useDistanceVariable,
} from "@/src/features/listings/ui/listingsCardDetail/hooks/distanceHooks";

const SLIDER_MIN = 0;
const SLIDER_MAX = 120;

export const DistanceFilter = () => {
  const { data, isFetching } = useListingFilterDetail<PinPointPlace>();
  const emptyPinPoint: PinPointPlace = { userName: "", pinPoints: [] };
  const { pinPointList, dropDownTriggerLabel, hasPinPoints } = useDistanceVariable(
    data ?? emptyPinPoint
  );
  const { onChangeValue, handleDistanceChange, sliderValue, formattedDistance } =
    useDistanceHooks();

  return (
    <div className="flex h-full flex-col">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold leading-[140%] tracking-[-0.01em] text-greyscale-grey-900">
            핀포인트 선택
          </p>
          <p className="text-xs font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-400">
            선택한 핀포인트를 기준으로 거리를 설정해 주세요.
          </p>
        </div>

        <DropDown
          types="myPinPoint"
          data={pinPointList}
          size="lg"
          onChange={onChangeValue}
          disabled={isFetching || !hasPinPoints}
        >
          {dropDownTriggerLabel}
        </DropDown>
      </section>

      <section className="mt-8 flex flex-col gap-4">
        <p className="text-base font-semibold leading-[140%] tracking-[-0.01em] text-greyscale-grey-700">
          핀포인트로부터{" "}
          <span className="font-bold text-primary-blue-400">{formattedDistance}분 이내</span>
        </p>
        <Slider
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={10}
          value={sliderValue}
          onValueChange={handleDistanceChange}
          labelSuffix="분"
        />
      </section>
    </div>
  );
};
