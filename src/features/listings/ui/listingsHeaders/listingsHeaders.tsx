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
      {/* <div
        className="flex flex-[2] items-center rounded-2xl border border-gray-200 bg-white p-1.5 pl-3"
        onClick={() => router.push("/listings/search")}
      >
        <input
          className="w-full font-pretendard text-xs font-bold leading-tight tracking-[0] outline-none placeholder:text-gray-400"
          placeholder="공고명을 검색해보세요"
        />
        <Search className="ml-2 text-gray-600" />
      </div> */}
      <Search className="ml-2 text-gray-600" onClick={() => router.push("/listings/search")} />
    </div>
  );
};
