// shared/hooks/useSearchHeader.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type UseSearchHeaderProps = {
  /** @resultPath 검색 결과 페이지 경로 */
  resultPath: string;
  /** @clearPath 검색어 초기화 시 이동 경로 */
  clearPath: string;
  /** @queryKey URL 쿼리 키 */
  queryKey: string;
  /** @mainUrl 메인 이동 경로 */
  mainUrl: string;
  /** @onSearch 검색어 저장/추가 처리 콜백 */
  onSearch: (keyword: string) => void;
  /** @debounceMs 디바운스 지연 시간(ms) */
  debounceMs: number;
};

/**
 * @resultPath 검색 결과 페이지 경로
 * @clearPath 검색어 초기화 시 이동 경로
 * @queryKey URL 쿼리 키
 * @mainUrl 메인 이동 경로
 * @onSearch 검색어 저장/추가 처리 콜백
 * @debounceMs 디바운스 지연 시간(ms)
 * @returns 검색어 상태와 검색/초기화/메인 이동 핸들러
 */
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

  /**
   * @value 검색할 원본 입력값
   */
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

  /**
   * @value 검색할 입력값
   */
  const searchDebounced = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      submitSearch(value);
    }, debounceMs);
  };

  /** @description 검색어 입력을 초기화 경로로 이동 */
  const clear = () => router.push(clearPath);
  /** @description 메인 경로로 이동 */
  const goMain = () => router.push(mainUrl);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { keyword, searchDebounced, clear, goMain };
};
