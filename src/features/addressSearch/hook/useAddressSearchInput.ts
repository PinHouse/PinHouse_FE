"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useAddressStore } from "@/src/entities/address";

/**
 * 주소 검색 화면의 input(핀포인트 명) 값 제어
 * - inputValue가 있으면 해당 값을 input에 반영하고, 없으면 스토어 pinPoint 사용
 */
export function useAddressSearchInput(inputValue?: string) {
  const { address, pinPoint, setPinPoint } = useAddressStore();
  const [localValue, setLocalValue] = useState(inputValue ?? "");

  useEffect(() => {
    if (inputValue !== undefined) {
      setLocalValue(inputValue);
    }
  }, [inputValue]);

  const onPinPointChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setPinPoint(next);
    if (inputValue !== undefined) {
      setLocalValue(next);
    }
  };

  const inputDisplayValue = inputValue !== undefined ? localValue : pinPoint;

  return {
    address,
    inputDisplayValue,
    onPinPointChange,
  };
}
