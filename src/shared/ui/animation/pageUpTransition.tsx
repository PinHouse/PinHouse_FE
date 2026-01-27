"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export const DataEnterTransition = ({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) => {
  return (
    <AnimatePresence>
      {ready && (
        <motion.div
          key="data-enter"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
            opacity: {
              duration: 0.55,
              ease: "easeOut",
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
