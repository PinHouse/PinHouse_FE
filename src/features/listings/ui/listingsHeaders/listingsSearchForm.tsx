// app/listings/search/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { LeftButton } from "@/src/assets/icons/button";

export const SearchForm = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex gap-2 pb-2">
        <LeftButton onClick={() => router.back()} className="cursor-pointer hover:cursor-pointer" />
        <p className="absolute left-1/2 -translate-x-1/2 font-suit font-bold">검색</p>
      </div>
    </div>
  );
};
