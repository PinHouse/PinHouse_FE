import { CloseButton } from "@/src/assets/icons/button";
import { useSearchState } from "@/src/shared/hooks/store";
import { SearchResultsProps } from "../../model";

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
        {searchQuery.map(word => (
          <span
            key={word}
            className="flex items-center justify-between gap-2 rounded-full border px-2 py-1 text-xs"
            onClick={() => {
              setQuery(word);
              handleSearch(word);
            }}
          >
            {word}
            <span className="h-3.5 w-3.5">
              <CloseButton className="h-full w-full" onClick={() => handleDelete(word)} />
            </span>
          </span>
        ))}
      </div>
    </section>
  );
};
