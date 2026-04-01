"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { usePortalTarget } from "@/src/shared/hooks/usePortalTarget";
import { useScrollLock } from "@/src/shared/hooks/useScrollLock";

interface ChatSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ChatSheet({ open, onClose, children }: ChatSheetProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const portalRoot = usePortalTarget("mobile-overlay-root");

  useScrollLock({ locked: open, anchorRef });

  const content = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="pointer-events-auto absolute inset-0 z-40 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.section
            className="pointer-events-auto absolute inset-0 z-40 flex h-full max-h-full flex-col overflow-hidden bg-white"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {children}
          </motion.section>
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
}
