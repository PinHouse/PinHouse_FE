"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/src/entities/home/hooks/homeHooks";
import { GlobalListType } from "@/src/entities/home/model/type";
import { useHomeGlobalSearch } from "@/src/features/home/hooks/hooks";
import { HomeResultSectionBlock } from "./components/homeResultSectionBlock";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 16,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const HomeResultSection = ({ q }: { q: string }) => {
  const { data: globalData } = useGlobal<GlobalListType>({
    params: "overview",
    q,
  });

  const data = useHomeGlobalSearch(globalData);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={q}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
        className="flex h-screen flex-col gap-5 p-5"
      >
        {data.map(section => (
          <motion.div key={section.category} variants={itemVariants}>
            <HomeResultSectionBlock
              category={section.category}
              items={section.content}
              limit={5}
              q={q}
            />
          </motion.div>
        ))}
      </motion.section>
    </AnimatePresence>
  );
};
