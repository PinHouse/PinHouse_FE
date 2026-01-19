"use client";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();

  const handleSearch = async (keyword: string) => {
    if (!keyword) return;
    router.push(`/home/search/result?query=${keyword}`);
  };

  return (
    <SearchBarLabel
      direction="vertical"
      placeholder="공고·지역·단지를 검색해보세요"
      className="rounded-3xl"
      variant={"capsule"}
      onEnter={handleSearch}
    />
  );
};
