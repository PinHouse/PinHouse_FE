"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { HomeBgBookMark } from "./components/HomeBgBookMark";
import { GlobalSearchItem } from "@/src/entities/home/model/type";
import { HighlightCenteredText } from "@/src/features/listings/hooks/listingsHooks";

interface HomeResultSectionItemsProps {
  items: GlobalSearchItem[];
  limit?: number;
  q: string;
  animateFromIndex?: number;
}

const enterTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const HomeResultSectionItems = ({
  items,
  limit = 5,
  q,
  animateFromIndex = Number.MAX_SAFE_INTEGER,
}: HomeResultSectionItemsProps) => {
  const visibleItems = items.slice(0, limit);

  return (
    <motion.ul layout className="rounded-xl bg-white px-3">
      {visibleItems.map((item, index) => {
        const isNewItem = index >= animateFromIndex;
        const staggerIndex = Math.max(index - animateFromIndex, 0);

        return (
          <motion.li
            key={item.id}
            layout
            initial={isNewItem ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              isNewItem
                ? {
                    ...enterTransition,
                    delay: staggerIndex * 0.06,
                  }
                : undefined
            }
            className={cn(
              "flex items-center justify-between gap-2 p-3",
              visibleItems.length === 1 ? "border-none" : "border-b"
            )}
          >
            <div className="max-w-full">
              <p className="line-clamp-1 text-sm">
                <HighlightCenteredText text={item.title} keyword={q} range={30} />
              </p>
            </div>

            <HomeBgBookMark supplyType={item.supplyType} />
          </motion.li>
        );
      })}
    </motion.ul>
  );
};
