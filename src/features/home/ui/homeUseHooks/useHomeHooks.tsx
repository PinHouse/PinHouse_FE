import { useOAuthStore } from "@/src/features/login/model";
import { PinPointPlace } from "@/src/entities/listings/model/type";

export const usePinpointRowBox = (data: PinPointPlace["pinPoints"] | null) => {
  const pinpoints = data ?? null;
  const pinPointId = useOAuthStore(s => s.pinPointId);
  const setPinPointId = useOAuthStore(s => s.setPinPointId);
  const setPinPointName = useOAuthStore(s => s.setPinpointName);
  const onChangePinpoint = ({ id, name }: { id: string; name: string }) => {
    setPinPointId(id);
    setPinPointName(name);
  };

  return {
    pinpoints,
    pinPointId,
    onChangePinpoint,
  };
};
