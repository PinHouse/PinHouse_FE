import { useListingFilterDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { PinPointPlace } from "@/src/entities/listings/model/type";
import { useOAuthStore } from "@/src/features/login/model";
import { PinpointItem } from "./components/pinpointId";

export const PinpointRowBox = () => {
  const { data } = useListingFilterDetail<PinPointPlace>();
  const pinpoints = data?.pinPoints;
  const pinPointId = useOAuthStore(s => s.pinPointId);
  const setPinPointId = useOAuthStore(s => s.setPinPointId);
  const setPinPointName = useOAuthStore(s => s.setPinpointName);
  const onChangePinpoint = ({ id, name }: { id: string; name: string }) => {
    setPinPointId(id);
    setPinPointName(name);
  };
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
