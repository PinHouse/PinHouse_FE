import { SearchEmpty } from "@/src/assets/icons/home/searchEmpty";

export const ListingNoSearchResult = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SearchEmpty />
      <p className="text-center text-sm font-bold text-text-primary">
        검색 결과가 없습니다. <br />
        다른 검색어로 검색해보세요.
      </p>
    </div>
  );
};
