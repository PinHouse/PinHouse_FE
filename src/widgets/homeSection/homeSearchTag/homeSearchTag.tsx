"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HomeSearchRecent } from "./homeSearchRecent";
import { HomeSearchPopuler } from "./homeSearchPopuler";

export const HomeSearchTag = () => {
  return (
    <div className="flex-1 p-5">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="flex flex-col"
        >
          <HomeSearchRecent />
          <HomeSearchPopuler />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
