import {
  getDefaultPinPointLabel,
  mapPinPointToOptions,
} from "@/src/features/listings/hooks/listingsHooks";
import { useOAuthStore } from "@/src/features/login/model";
import { useListingDetailFilter } from "@/src/features/listings/model";
import { PinPointPlace } from "@/src/entities/listings/model/type";

export const useDistanceHooks = () => {
  const { setPinPointId } = useOAuthStore();
  const { distance, setDistance } = useListingDetailFilter();

  const onChangeValue = (selectedKey: string) => {
    setPinPointId(selectedKey);
  };

  const handleDistanceChange = (values: number[]) => {
    const [nextValue] = values;
    setDistance(nextValue);
  };

  const sliderValue = [distance];
  const formatMinutes = (value: number) => value.toString().padStart(1, "0");
  const formattedDistance = formatMinutes(distance);

  return {
    onChangeValue,
    handleDistanceChange,
    sliderValue,
    formattedDistance,
  };
};

export const useDistanceVariable = (data?: PinPointPlace) => {
  const pinPointData = data?.pinPoints;
  const pinPointList = mapPinPointToOptions(pinPointData);
  const dropDownTriggerLabel = getDefaultPinPointLabel(pinPointList);
  const hasPinPoints = pinPointList.myPinPoint.length > 0;

  return {
    pinPointList,
    dropDownTriggerLabel,
    hasPinPoints,
  };
};
