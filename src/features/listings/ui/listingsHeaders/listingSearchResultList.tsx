import { CloseButton } from "@/src/assets/icons/button";
import { listingsResults } from "../../model";

export const SearchResults = () => {
  return (
    <section className="mt-6">
      <h3 className="mb-2 text-sm font-bold">인기 검색어</h3>
      <div className="flex flex-wrap gap-2">
        {listingsResults.map(word => (
          <span
            key={word}
            className="flex items-center gap-2 rounded-full bg-gray-200 px-2 py-1 text-xs"
          >
            {word}
            <span className="h-3.5 w-3.5">
              <CloseButton className="h-full w-full" />
            </span>
          </span>
        ))}
      </div>
    </section>
  );
};
