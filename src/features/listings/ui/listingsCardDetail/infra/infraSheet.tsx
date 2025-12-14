import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "@/src/assets/icons/button";
import { InfraSheetProps, RenderContentProps } from "../../../model";
import { RouteDetail } from "./components/routeDetail";
import { Environment } from "./components/environment";
import { RoomTypeDetail } from "./components/roomTypeDetail";

const RenderContent = ({ section }: RenderContentProps) => {
  switch (section) {
    case "route":
      return <RouteDetail />;

    case "infra":
      return <Environment />;

    case "room":
      return <RoomTypeDetail />;

    case null:
      return null;

    default:
      return null;
  }
};

export const InfraSheet = ({ open, onClose, section }: InfraSheetProps) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            key="sheet"
            className="fixed bottom-0 left-0 right-0 z-50 flex h-[40vh] flex-col rounded-t-2xl bg-white shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <button onClick={onClose} className="text-xl font-bold">
              <CloseButton />
            </button>
            <RenderContent section={section} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
