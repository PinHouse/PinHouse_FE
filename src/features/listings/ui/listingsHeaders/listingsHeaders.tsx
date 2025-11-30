"use client";
import { Search } from "@/src/assets/icons/home";
import { useRouter } from "next/navigation";

export const ListingsHeaders = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="text-md flex-1 font-pretendard font-bold leading-tight tracking-[0]">
        공고 탐색
      </div>
      <Search className="ml-2 text-gray-600" onClick={() => router.push("/listings/search")} />
    </div>
  );
};
