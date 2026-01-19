"use client";
import { cn } from "@/lib/utils";
import { useSearchState } from "@/src/shared/hooks/store";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { useRouter } from "next/navigation";

export const HomeSearchPopuler = () => {
  const router = useRouter();

  const { searchQuery } = useSearchState();
  if (searchQuery.length === 0) return;

  const handleSearchTag = (keyword: string) => {
    if (!keyword) return;
    router.push(`/listings/search?query=${keyword}`);
  };

  return (
    <section className="mt-6">
      <h3 className="mb-2 text-sm font-semibold">인기 검색어</h3>
      <div className="flex flex-wrap gap-2">
        {searchQuery?.map((word: any, index: number) => (
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
  );
};
