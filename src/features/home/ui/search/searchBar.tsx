"use client";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchState } from "@/src/shared/hooks/store";

export const SearchBar = () => {
  const router = useRouter();
  const { setSearchQuery } = useSearchState();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") ?? "";

  const handleSearch = async (keyword: string) => {
    if (!keyword) return;
    setSearchQuery(keyword);
    router.push(`/home/search/result?q=${encodeURIComponent(keyword)}`);
  };

  const searchClear = () => {
    router.push("/home/search");
  };

  return (
    <SearchBarLabel
      direction="vertical"
      placeholder="공고·지역·단지를 검색해보세요"
      className="rounded-3xl"
      variant={"capsule"}
      onEnter={handleSearch}
      value={keyword}
      onClear={searchClear}
      xBtnDef={"deafult"}
    />
  );
};
