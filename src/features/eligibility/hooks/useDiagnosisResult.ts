"use client";

import { useCallback, useState } from "react";
import { useEligibilityStore } from "../model/eligibilityStore";
import { postDiagnosis } from "../api/diagnosisApi";
import { mapEligibilityToDiagnosisRequest } from "../api/mapEligibilityToDiagnosisRequest";
import type { DiagnosisResultData } from "../api/diagnosisTypes";

export function useDiagnosisResult() {
  const data = useEligibilityStore();
  const [result, setResult] = useState<DiagnosisResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const body = mapEligibilityToDiagnosisRequest(data);
      const response = await postDiagnosis<DiagnosisResultData, typeof body>(body);
      const resultData = response.data as DiagnosisResultData | undefined;
      if (resultData != null) {
        setResult(resultData);
        return resultData;
      }
      setResult(null);
      return null;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      setResult(null);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  return { result, isLoading, error, submit };
}
