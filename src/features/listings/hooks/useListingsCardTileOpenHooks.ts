import { useCallback, useState } from "react";
import { ListingRentalDetailVM } from "@/src/entities/listings/model/type";
import { SheetState } from "@/src/features/listings/model";

export const useListingsCardTileOpenHooks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return {
    isOpen,
    handleToggle,
  };
};

export const useRouteSheetHooks = (infra?: ListingRentalDetailVM) => {
  const [sheetState, setSheetState] = useState<SheetState>({
    open: false,
  });
  const openRouteSheet = useCallback(() => {
    if (!infra?.id) return;
    setSheetState({ open: true, section: "route", listingId: infra.id });
  }, [infra?.id]);

  const openInfraSheet = useCallback(() => {
    if (!infra?.id) return;
    setSheetState({ open: true, section: "infra", listingId: infra.id });
  }, [infra?.id]);

  const openRoomSheet = useCallback(() => {
    if (!infra?.id) return;
    setSheetState({ open: true, section: "room", listingId: infra.id });
  }, [infra?.id]);

  return {
    sheetState,
    openRouteSheet,
    openInfraSheet,
    openRoomSheet,
    setSheetState,
  };
};
