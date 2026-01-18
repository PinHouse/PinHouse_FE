import { AnimatePresence, motion } from "framer-motion";
import { SearchHistory } from "../../listingsHeaders/listingsSearchHistory";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { usePopularSearchQuery } from "@/src/entities/listings/hooks/useListingHooks";

import { cn } from "@/lib/utils";
import { HandleSearchTag } from "../../../model";

export const SearchEmptyQueryView = ({ handleSearchTag, popular }: HandleSearchTag) => {
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
          <SearchHistory handleSearch={handleSearchTag} />

          <section className="mt-6">
            <h3 className="mb-2 text-sm font-semibold">인기 검색어</h3>
            <div className="flex flex-wrap gap-2">
              {popular?.map((word: any, index: number) => (
                <TagButton
                  key={index}
                  size="sm"
                  onClick={() => handleSearchTag(word.keyword)}
                  className={cn(
                    "font-suit text-text-greyscale-grey-85 rounded-full border px-3 py-1 text-sm transition-all"
                  )}
                >
                  {word.keyword}
                </TagButton>
              ))}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
