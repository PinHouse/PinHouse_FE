import { SearchEmpty } from "@/src/assets/icons/home/searchEmpty";
import { AnimatePresence, motion } from "framer-motion";
type NoSearchReusltType = { text: string };

export const ListingNoSearchResult = ({ text }: NoSearchReusltType) => {
  const lines = text.split("<br />");
  return (
    <div className="flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            <SearchEmpty />
            {lines.map((line, idx) => (
              <p
                key={idx}
                className={`text-sm ${
                  idx === 0
                    ? "text-center text-[20px] font-bold text-text-primary"
                    : "text-center text-[12px] font-bold text-text-secondary"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
