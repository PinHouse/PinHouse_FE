import { CloseButton } from "@/src/assets/icons/button";
import { listingsHistory } from "../../model";

export const SearchHistory = () => {
  return (
    <section className="mt-4">
      <h3 className="mb-2 text-sm font-bold">최근 검색어</h3>
      <div className="flex flex-wrap gap-2">
        {listingsHistory.map(word => (
          <span
            key={word}
            className="flex items-center justify-between gap-2 rounded-full border bg-gray-100 px-2 py-1 text-xs"
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
