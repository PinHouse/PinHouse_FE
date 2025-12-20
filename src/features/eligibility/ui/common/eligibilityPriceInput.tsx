"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/src/shared/ui/input/deafult";
import { formatNumber, formatToKorean } from "@/src/shared/lib/numberFormat";

export interface EligibilityPriceInputProps {
  /** 제목 */
  title: string;
  /** 부제목/설명 */
  description?: string;
  /** 필수 입력 여부 (true면 제목 옆에 점 표시) */
  required?: boolean;
  /** 에러 상태 (true면 Input에 error variant 적용) */
  error?: boolean;
  /** 입력값 (controlled) */
  value?: string;
  /** 기본값 (uncontrolled) */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 포커스 핸들러 */
  onFocus?: () => void;
  /** 블러 핸들러 */
  onBlur?: () => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 추가 클래스명 */
  className?: string;
}

export const EligibilityPriceInput = ({
  title,
  description,
  required = false,
  error = false,
  value: controlledValue,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  placeholder = "금액을 입력해 주세요",
  className,
}: EligibilityPriceInputProps) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || "");
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 허용
    const numericValue = e.target.value.replace(/[^0-9]/g, "");

    if (isControlled) {
      onChange?.(numericValue);
    } else {
      setInternalValue(numericValue);
      onChange?.(numericValue);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <div className={cn("flex w-full flex-col", className)}>
      {/* 제목 및 부제목 */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-0.5">
          <h3 className="text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-900">
            {title}
          </h3>
          {required && <div className="h-1.5 w-1.5 self-start rounded-full bg-primary-blue-300" />}
        </div>
        {description && (
          <p className="text-xs font-medium leading-[140%] tracking-[-0.02em] text-primary-blue-300">
            {description}
          </p>
        )}
      </div>

      {/* Input 영역 */}
      <div className="mt-3 flex flex-col gap-1.5">
        <Input
          type="text"
          inputMode="numeric"
          variant={error ? "error" : "default"}
          value={formatNumber(currentValue)}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "h-12 rounded-lg py-3 pl-5 text-base font-medium leading-[140%] tracking-[-0.01em]"
          )}
        />

        {/* 한글 표기 label (항상 표시) */}
        <p
          className={cn(
            "pl-5 text-xs font-medium leading-[140%]",
            error
              ? "text-danger-400"
              : isFocused
                ? "text-primary-blue-300"
                : "text-greyscale-grey-500"
          )}
        >
          {currentValue === "0" ? "0원" : currentValue ? formatToKorean(currentValue) : "원"}
        </p>
      </div>
    </div>
  );
};
