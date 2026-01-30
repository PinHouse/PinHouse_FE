// shared/hooks/useSearchHeader.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";

type UseSearchHeaderProps = {
  resultPath: string;
  clearPath: string;
  queryKey: string;
  mainUrl: string;
  onSearch: (keyword: string) => void;
};

export const useSearchHeader = ({
  resultPath,
  clearPath,
  queryKey,
  mainUrl,
  onSearch,
}: UseSearchHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get(queryKey) ?? "";

  const search = (value: string) => {
    if (!value) return;

    onSearch(value);
    router.push(`${resultPath}?${queryKey}=${encodeURIComponent(value)}`);
  };

  const clear = () => {
    router.push(clearPath);
  };

  const goMain = () => {
    router.push(mainUrl);
  };

  return {
    keyword,
    search,
    clear,
    goMain,
  };
};
