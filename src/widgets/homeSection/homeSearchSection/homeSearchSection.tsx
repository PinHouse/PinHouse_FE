"use client";
import { LeftButton } from "@/src/assets/icons/button";
import { SearchBar } from "@/src/features/home";
import { useRouter } from "next/navigation";
import { SearchHeader } from "@/src/shared/ui/header/header/searchHeader/searchHeader";
import { useSearchState } from "@/src/shared/hooks/store";

export const HomeSearchSection = () => {
  const { setSearchQuery } = useSearchState();

  return (
    <div className="items-cente flex items-center gap-2 rounded-none border-b px-5 pb-2 pt-5">
      <SearchHeader
        placeHolder="공고·지역·단지를 검색해보세요"
        searchQuery={setSearchQuery}
        searchConfig={{
          resultPath: "/home/search/result",
          clearPath: "/home/search",
          queryKey: "q",
          mainUrl: "/home",
        }}
      />
    </div>
  );
};
1;
