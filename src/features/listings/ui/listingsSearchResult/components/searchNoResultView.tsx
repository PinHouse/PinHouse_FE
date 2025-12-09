import { TagButton } from "@/src/shared/ui/button/tagButton";
import { ListingNoSearchResult } from "../../listingsNoSearchResult/listingNoSearchResult";
import { cn } from "@/lib/utils";
import { HandleSearchTag } from "../../../model";

export const SearchNoResultView = ({ handleSearchTag, popular }: HandleSearchTag) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center pb-[88px]">
      <ListingNoSearchResult text={"검색 결과가 없습니다. <br /> 다른 검색어로 검색해보세요."} />

      <section className="mt-6">
        <h3 className={`mb-2 flex justify-center text-sm font-semibold`}>인기 검색어</h3>
        <div className="flex flex-wrap justify-center gap-2">
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
    </div>
  );
};
