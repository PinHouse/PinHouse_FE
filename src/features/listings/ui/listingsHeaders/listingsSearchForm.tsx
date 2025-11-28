// app/listings/search/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LeftButton } from "@/src/assets/icons/button";
import { useSearchState } from "@/src/shared/hooks/store";

export const SearchForm = () => {
  const router = useRouter();
  const { resetQuery } = useSearchState();
  const searchParams = useSearchParams();

  const handleRouter = () => {
    router.push(`/listings`);
    resetQuery();
  };

  return (
    <div className="items-cente relative flex p-2">
      <LeftButton onClick={handleRouter} className="h-6 w-6 cursor-pointer" />
      <p className="font-suit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
        검색
      </p>
    </div>
  );
};
