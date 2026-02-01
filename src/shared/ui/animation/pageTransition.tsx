"use client";
import { useAddressStore } from "@/src/entities/address";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(false);
  const { address, isEmbed } = useAddressStore();

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    setIsBottom(atBottom);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const raf = () => requestAnimationFrame(handleScroll);
    raf();
    const ro = new ResizeObserver(() => {
      raf();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [pathname, address, isEmbed]);

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <div className="no-scrollbar h-full min-h-0 overflow-y-auto" ref={scrollRef} onScroll={handleScroll}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className={`pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent transition-all duration-300 ${
          isBottom ? "h-0 opacity-0" : "h-16 opacity-100"
        }`}
      />
    </div>
  );
};
