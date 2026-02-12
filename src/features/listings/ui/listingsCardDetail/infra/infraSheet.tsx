import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { CloseButton } from "@/src/assets/icons/button";
import { usePortalTarget } from "@/src/shared/hooks/usePortalTarget";
import { useScrollLock } from "@/src/shared/hooks/useScrollLock";
import {
  InfraSheetProps,
  RenderContentProps,
  ROOM_TYPE_TITLE_DES,
  RoomTitleDesType,
} from "../../../model";

import { Environment } from "./components/environment";
import { RoomTypeDetail } from "./components/roomTypeDetail";
import { RouteDetail } from "./components/routeDetail";

const RenderContent = ({ section, listingId }: RenderContentProps) => {
  switch (section) {
    case "route":
      return <RouteDetail listingId={listingId} />;

    case "infra":
      return <Environment listingId={listingId} />;

    case "room":
      return <RoomTypeDetail listingId={listingId} />;

    case null:
      return null;

    default:
      return null;
  }
};

export const InfraSheet = ({ onClose, sheetState }: InfraSheetProps) => {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const portalRoot = usePortalTarget("mobile-overlay-root");
  const roomType: RoomTitleDesType | null = sheetState.open
    ? ROOM_TYPE_TITLE_DES[sheetState.section]
    : null;
  useScrollLock({ locked: sheetState.open, anchorRef });

  const content = (
    <AnimatePresence mode="wait">
      {sheetState.open && (
        <>
          <motion.div
            key="overlay"
            className="pointer-events-auto absolute inset-0 bg-black/40"
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            key="sheet"
            className="pointer-events-auto absolute bottom-0 left-0 right-0 z-50 flex h-[80vh] flex-col rounded-t-2xl bg-white shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            onClick={e => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <section className="flex flex-col">
              <header className="flex items-center justify-between border-b border-greyscale-grey-50 p-5">
                <div className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-base font-semibold text-text-primary">{roomType?.title}</p>
                    <button onClick={onClose} className="text-xl font-bold">
                      <CloseButton />
                    </button>
                  </div>

                  <p className="mt-1 text-xs text-text-secondary">{roomType?.des}</p>
                </div>
              </header>
            </section>
            <div className="min-h-0 flex-1 overflow-hidden">
              {sheetState.open && (
                <RenderContent section={sheetState.section} listingId={sheetState.listingId} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <span ref={anchorRef} className="hidden" />
      {portalRoot ? createPortal(content, portalRoot) : content}
    </>
  );
};
