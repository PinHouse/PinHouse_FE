import { useOAuthStore } from "@/src/features/login/model";
import { PinPointPlace } from "@/src/entities/listings/model/type";

/**
 * @data 사용자 핀포인트 목록 데이터
 * @returns 핀포인트 선택 UI에서 필요한 상태와 변경 핸들러
 */
export const usePinpointRowBox = (data: PinPointPlace["pinPoints"] | null) => {
  const pinpoints = data ?? null;
  const pinPointId = useOAuthStore(s => s.pinPointId);
  const setPinPointId = useOAuthStore(s => s.setPinPointId);
  const setPinPointName = useOAuthStore(s => s.setPinpointName);

  /**
   * @id 선택할 핀포인트 ID
   * @name 선택할 핀포인트 이름
   */
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
