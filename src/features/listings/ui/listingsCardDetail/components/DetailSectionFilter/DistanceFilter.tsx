import { useMemo, useState } from "react";
import { useListingFilterDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { PinPointPlace } from "@/src/entities/listings/model/type";
import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import { Slider } from "@/src/shared/ui/slider";

const SLIDER_MIN = 0;
const SLIDER_MAX = 120;
const DEFAULT_DISTANCE = 30;

export const DistanceFilter = () => {
  const { data, isFetching } = useListingFilterDetail<PinPointPlace>({
    queryK: "usePinPointList",
    url: "pinpoint",
  });
  const [distance, setDistance] = useState<number>(DEFAULT_DISTANCE);

  const pinPointList = {
    myPinPoint:
      data?.map(item => ({
        key: item.id,
        value: item.name,
        description: item.address,
      })) ?? [],
  };

  const onChageValue = (selectedKey: string) => {
    console.log(selectedKey);
  };
  const handleDistanceChange = (values: number[]) => {
    const [nextValue] = values;
    if (typeof nextValue === "number") {
      setDistance(nextValue);
    }
  };

  const sliderValue = useMemo(() => [distance], [distance]);
  const formatMinutes = (value: number) => value.toString().padStart(2, "0");
  const formattedDistance = formatMinutes(distance);
  const hasPinPoints = pinPointList.myPinPoint.length > 0;
  const defaultPinPointName = pinPointList.myPinPoint[0]?.value;
  const dropDownTriggerLabel = hasPinPoints ? defaultPinPointName : "핀포인트를 추가해 주세요";

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
          onChange={onChageValue}
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
          step={1}
          value={sliderValue}
          onValueChange={handleDistanceChange}
          labelSuffix="분"
        />
      </section>

      <div className="mt-auto pt-8">
        <button
          type="button"
          className="w-full rounded-xl bg-greyscale-grey-900 py-4 text-base font-semibold leading-[140%] tracking-[-0.01em] text-white"
        >
          00개의 단지가 있어요
        </button>
      </div>
    </div>
  );
};
