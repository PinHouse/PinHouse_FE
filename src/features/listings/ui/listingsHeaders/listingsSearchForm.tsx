// app/listings/search/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LeftButton } from "@/src/assets/icons/button";
import { useSearchState } from "@/src/shared/hooks/store";

export const SearchForm = () => {
  const router = useRouter();
  const { resetQuery } = useSearchState();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";

  const handleRouter = () => {
    if (keyword === "") {
      router.push(`/listings`);
    } else {
      router.push(`/listings/search?query=`);
    }
    resetQuery();
  };

  return (
    <div>
      <div className="flex gap-2 pb-2">
        <LeftButton onClick={handleRouter} className="cursor-pointer hover:cursor-pointer" />
        <p className="absolute left-1/2 -translate-x-1/2 font-suit font-bold">검색</p>
      </div>
    </div>
  );
};
