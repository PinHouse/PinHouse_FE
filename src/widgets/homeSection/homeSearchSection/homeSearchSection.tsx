"use client";
import { LeftButton } from "@/src/assets/icons/button";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { useRouter } from "next/navigation";

export const HomeSerachSection = () => {
  const router = useRouter();

  const handleRouter = () => {
    router.push("/home");
  };

  const handleSearch = async (keyword: string) => {
    if (!keyword) return;
    router.push(`/home/search/result?query=${keyword}`);
  };

  return (
    <div className="items-cente flex items-center gap-2 p-5">
      <LeftButton
        onClick={handleRouter}
        className="h-8 w-8 cursor-pointer text-greyscale-grey-400"
      />
      <SearchBarLabel
        direction="vertical"
        placeholder="공고·지역·단지를 검색해보세요"
        className="rounded-3xl"
        variant={"capsule"}
        onEnter={handleSearch}
      />
    </div>
  );
};
