"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

import { XButton } from "@/src/assets/icons/button";
import { Input } from "@/src/shared/ui/input/deafult";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";

interface ChooseRoomSizeProps {
  className?: string;
  onMinChange?: (value: string) => void;
  onMaxChange?: (value: string) => void;
}

type SizeType = "min" | "max";

const ChooseRoomSize = ({ className, onMinChange, onMaxChange }: ChooseRoomSizeProps) => {
  const { minSize, maxSize, setMinSize, setMaxSize } = useQuickSearchStore();
  const [focusedInput, setFocusedInput] = useState<SizeType | null>(null);

  const formatNumber = (value: string): string => {
    if (!value) return "";
    return Number(value).toLocaleString("ko-KR");
  };

  // store의 숫자 값을 문자열로 변환 (표시용)
  const minValue = useMemo(() => (minSize > 0 ? String(minSize) : ""), [minSize]);
  const maxValue = useMemo(() => (maxSize > 0 ? String(maxSize) : ""), [maxSize]);

  // 공통 핸들러 생성 함수
  const createHandlers = (type: SizeType) => {
    const currentValue = type === "min" ? minValue : maxValue;
    const setSize = type === "min" ? setMinSize : setMaxSize;
    const onChange = type === "min" ? onMinChange : onMaxChange;

    return {
      value: currentValue,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, "");
        const numValue = inputValue ? Number(inputValue) : 0;
        setSize(numValue);
        onChange?.(inputValue);
      },
      handleClear: () => {
        setSize(0);
        onChange?.("");
      },
    };
  };

  const minHandlers = createHandlers("min");
  const maxHandlers = createHandlers("max");

  // 유효성 검증: max가 min보다 작으면 에러
  const hasValidationError = minSize > 0 && maxSize > 0 && maxSize < minSize;
  const errorMessage = hasValidationError ? "최대 평수는 최소 평수보다 크거나 같아야 합니다" : null;

  const sizeInputs = [
    {
      type: "min" as const,
      label: "최소",
      placeholder: "0",
      suffix: "평 부터",
      handlers: minHandlers,
    },
    {
      type: "max" as const,
      label: "최대",
      placeholder: "00",
      suffix: "평 까지",
      handlers: maxHandlers,
    },
  ] as const;

  return (
    <div className="flex w-full flex-col gap-4">
      {sizeInputs.map(({ type, label, placeholder, suffix, handlers }) => (
        <div key={type} className="flex items-center gap-3">
          <label className="whitespace-nowrap text-base font-medium text-greyscale-grey-900">
            {label}
          </label>
          <div className="relative flex-1">
            <Input
              type="text"
              inputMode="numeric"
              value={formatNumber(handlers.value)}
              onChange={handlers.handleChange}
              onFocus={() => setFocusedInput(type)}
              onBlur={() => setFocusedInput(null)}
              placeholder={placeholder}
              className={cn(
                "h-[3rem] rounded-lg px-4 py-3 text-lg font-medium",
                focusedInput === type
                  ? "border-[1.5px] border-primary-blue-300"
                  : "border-greyscale-grey-75",
                handlers.value ? "text-greyscale-grey-900" : "text-greyscale-grey-300",
                hasValidationError && type === "max" ? "border-red-500" : ""
              )}
            />
            {handlers.value && (
              <button
                onClick={handlers.handleClear}
                className="hover:text-greyscale-grey-600 absolute right-4 top-1/2 -translate-y-1/2 text-greyscale-grey-400"
              >
                <XButton />
              </button>
            )}
          </div>
          <span className="whitespace-nowrap text-base font-normal text-greyscale-grey-700">
            {suffix}
          </span>
        </div>
      ))}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default ChooseRoomSize;
