"use client";
import { cn } from "@/lib/utils";
import { useGlobal } from "@/src/entities/home/hooks/homeHooks";
import { PopularResponse } from "@/src/entities/home/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { useHomeKeywordRouter } from "@/src/features/home/ui/homeUseHooks/useHomeRouterHooks";

export const HomeSearchPopular = () => {
  const { data } = useGlobal<PopularResponse[]>({ params: "popular", q: "" });
  const { handleSearchTag } = useHomeKeywordRouter();

  return (
    <section className="mt-6">
      <h3 className="mb-2 text-sm font-semibold">인기 검색어</h3>
      <div className="flex flex-wrap gap-2">
        {data?.map((word, index) => (
          <TagButton
            key={index}
            size="sm"
            onClick={() => handleSearchTag(word.keyword)}
            className={cn(
              "font-suit text-text-greyscale-grey-85 rounded-full border px-3 py-1 text-sm transition-all hover:border-none hover:bg-primary-blue-300 hover:text-gray-200"
            )}
          >
            {word.keyword}
          </TagButton>
        ))}
      </div>
    </section>
  );
};
