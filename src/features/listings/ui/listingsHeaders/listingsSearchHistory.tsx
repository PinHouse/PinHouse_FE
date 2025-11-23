import { CloseButton } from "@/src/assets/icons/button";
import { useSearchState } from "@/src/shared/hooks/store";
import { SearchResultsProps } from "../../model";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { cn } from "@/lib/utils";

export const SearchHistory = ({ handleSearch }: SearchResultsProps) => {
  const { searchQuery, removeSearchQuery, setQuery } = useSearchState();
  if (searchQuery.length === 0) return;

  const handleDelete = (word: string) => {
    removeSearchQuery(word);
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
              setQuery(word);
              handleSearch(word);
            }}
            className={cn(
              "transition-al gap-2 rounded-full border px-2 py-1 font-suit text-sm text-text-greyscale-grey-85"
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
