import { useListingFilterDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { PinPointPlace } from "@/src/entities/listings/model/type";
import { PinpointItem } from "./components/pinpointId";
import { PinpointRowBoxSkeleton } from "./skeleton/skeleton";
import { usePinpointRowBox } from "@/src/features/home/ui/homeUseHooks/useHomeHooks";

export const PinpointRowBox = () => {
  const { data } = useListingFilterDetail<PinPointPlace>();
  const pin = data?.pinPoints ?? null;
  const { pinpoints, pinPointId, onChangePinpoint } = usePinpointRowBox(pin);

  if (!pinpoints) {
    return <PinpointRowBoxSkeleton />;
  }

  return (
    <div className="flex flex-col pt-4">
      <ul className="flex flex-col divide-y">
        {pinpoints?.map(item => (
          <PinpointItem
            key={item.id}
            item={item}
            isSelected={pinPointId === item.id}
            onSelect={onChangePinpoint}
          />
        ))}
      </ul>
    </div>
  );
};
