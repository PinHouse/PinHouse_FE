import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "@/src/shared/hooks/useScrollLock";
import { usePortalTarget } from "@/src/shared/hooks/usePortalTarget";
import { useFilterSheetStore } from "@/src/features/listings/model";

export const FilterSheetContainer = ({
  onDismiss,
  children,
}: {
  onDismiss: () => void;
  children: ReactNode;
}) => {
  const open = useFilterSheetStore(s => s.open);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const portalRoot = usePortalTarget("mobile-overlay-root");
  useScrollLock({ locked: open, anchorRef });

  const content = (
    <>
      <motion.div
        className="pointer-events-auto absolute inset-0 z-40 bg-black/40"
        onClick={e => {
          e.stopPropagation();
          onDismiss();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="pointer-events-auto absolute bottom-0 left-0 right-0 z-50 flex h-[85%] max-h-full flex-col rounded-t-2xl bg-white shadow-xl"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        onClick={e => e.stopPropagation()}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        {children}
      </motion.div>
    </>
  );

  return (
    <>
      <span ref={anchorRef} className="hidden" />
      {portalRoot ? createPortal(content, portalRoot) : content}
    </>
  );
};
