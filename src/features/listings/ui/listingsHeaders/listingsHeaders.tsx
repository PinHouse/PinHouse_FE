"use client";

import { SearchLine } from "@/src/assets/icons/home";
import { useRouter } from "next/navigation";

export const ListingsHeaders = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 font-pretendard text-lg-19 font-bold leading-tight tracking-[0]">
        공고 탐색
      </div>
      <SearchLine className="ml-2 text-gray-600" onClick={() => router.push("/listings/search")} />
    </div>
  );
};
