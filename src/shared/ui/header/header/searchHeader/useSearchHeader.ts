// shared/hooks/useSearchHeader.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type UseSearchHeaderProps = {
  resultPath: string;
  clearPath: string;
  queryKey: string;
  mainUrl: string;
  onSearch: (keyword: string) => void;
  debounceMs: number;
};

export const useSearchHeader = ({
  resultPath,
  clearPath,
  queryKey,
  mainUrl,
  onSearch,
  debounceMs,
}: UseSearchHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get(queryKey) ?? "";
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const submitSearch = useCallback(
    (value: string) => {
      if (!value.trim()) return;
      onSearch(value); // 최근검색어 저장은 즉시
      router.push(`${resultPath}?${queryKey}=${encodeURIComponent(value)}`);
    },
    [onSearch, queryKey, resultPath, router]
  );

  //필요한 기능인지는 모르겠으나 일단 주석
  // const search = (value: string) => {
  //   submitSearch(value);
  // };

  const searchDebounced = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      submitSearch(value);
    }, debounceMs);
  };

  const clear = () => router.push(clearPath);
  const goMain = () => router.push(mainUrl);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { keyword, searchDebounced, clear, goMain };
};
