"use client";
import { cn } from "@/lib/utils";
import { CloseButton } from "@/src/assets/icons/button";
import { useSearchState } from "@/src/shared/hooks/store";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { useRouter } from "next/navigation";

export const HomeSearchRecent = () => {
  const { searchQuery, removeSearchQuery, setSearchQuery } = useSearchState();

  const router = useRouter();
  if (searchQuery.length === 0) return;

  const handleDelete = (word: string) => {
    removeSearchQuery(word);
  };

  const handleSearchTag = (keyword: string) => {
    if (!keyword) return;
    setSearchQuery(keyword);
    router.push(`/home/search/result?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <section className="mt-4">
      <h3 className="mb-2 text-sm font-semibold">최근 검색어</h3>
      <div className="flex flex-wrap gap-2">
        {searchQuery.map((word, index) => (
          <TagButton
            key={index}
            size="sm"
            onClick={() => {
              handleSearchTag(word);
            }}
            className={cn(
              "transition-al font-suit text-text-greyscale-grey-85 gap-2 rounded-full border px-2 py-1 text-sm"
            )}
            variant={"ghost"}
          >
            {word}
            <span
              className="h-4 w-4"
              onClick={e => {
                e.stopPropagation();
                handleDelete(word);
              }}
            >
              <CloseButton className="h-full w-full" />
            </span>
          </TagButton>
        ))}
      </div>
    </section>
  );
};
