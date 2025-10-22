"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden"></div> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute left-0 h-full w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
