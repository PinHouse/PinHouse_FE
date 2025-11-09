// app/listings/search/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftButton } from "@/src/assets/icons/button/arrowLeft";

export const SearchForm = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex gap-2 border-b pb-2">
        <ArrowLeftButton
          onClick={() => router.back()}
          className="cursor-pointer hover:cursor-pointer"
        />
        <input
          className="font-pretendard flex-1 text-sm outline-none placeholder:text-gray-400"
          placeholder="공고명을 검색해보세요"
          autoFocus
        />
      </div>
    </div>
  );
};
