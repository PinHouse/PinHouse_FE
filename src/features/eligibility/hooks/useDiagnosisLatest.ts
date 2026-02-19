"use client";

import { useQuery } from "@tanstack/react-query";
import { getDiagnosisLatest } from "../api/diagnosisApi";
import type { DiagnosisResultData } from "../api/diagnosisTypes";

const QUERY_KEY = ["diagnosis", "latest"];

/** 마이페이지 등에서 자격진단 최신 결과 조회 (GET /v2/diagnosis/latest) */
export function useDiagnosisLatest() {
  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await getDiagnosisLatest<DiagnosisResultData>();
      return (res?.data ?? null) as DiagnosisResultData | null;
    },
    retry: false,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
