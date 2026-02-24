import { GlobalListType, GlobalSearchSection } from "@/src/entities/home/model/type";
import { useRouter } from "next/navigation";
import { useHomeSheetStore } from "@/src/features/home/model/homeStore";
import { useOAuthStore } from "@/src/features/login/model";
import { PinPointPlace } from "@/src/entities/listings/model/type";
import { useMemo } from "react";
import { homeSheetParseObject } from "@/src/features/listings/model";

export const useHomeGlobalSearch = (globalData?: GlobalListType): GlobalSearchSection[] => {
  if (!globalData) return [];

  return [
    {
      category: "notices",
      content: globalData.notices.content,
      hasNext: globalData.notices.hasNext,
    },
    {
      category: "complexes",
      content: globalData.complexes.content,
      hasNext: globalData.complexes.hasNext,
    },
    {
      category: "targetGroups",
      content: globalData.targetGroups.content,
      hasNext: globalData.targetGroups.hasNext,
    },
    {
      category: "regions",
      content: globalData.regions.content,
      hasNext: globalData.regions.hasNext,
    },
    {
      category: "houseTypes",
      content: globalData.houseTypes.content,
      hasNext: globalData.houseTypes.hasNext,
    },
  ];
};

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
