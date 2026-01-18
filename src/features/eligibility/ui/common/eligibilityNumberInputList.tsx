"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/src/shared/ui/input/deafult";
import { formatNumber } from "@/src/shared/lib/numberFormat";

export interface EligibilityNumberInputOption {
  /** 옵션 ID */
  id: string;
  /** Input 앞에 표시할 텍스트 (prefix) */
  prefix?: string;
  /** Input 뒤에 표시할 텍스트 (postfix) */
  postfix?: string;
  /** 입력값 (controlled) */
  value?: string;
  /** 기본값 (uncontrolled) */
  defaultValue?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 값 변경 핸들러 */
  onChange?: (id: string, value: string) => void;
  /** 포커스 핸들러 */
  onFocus?: (id: string) => void;
  /** 블러 핸들러 */
  onBlur?: (id: string) => void;
}

export interface EligibilityNumberInputListProps {
  /** 제목 */
  title: string;
  /** 부제목/설명 */
  description?: string;
  /** 필수 입력 여부 (true면 제목 옆에 점 표시) */
  required?: boolean;
  /** 옵션 리스트 */
  options: EligibilityNumberInputOption[];
  /** 하단 강조 텍스트 (동적 값 포함 가능, ReactNode 지원) */
  summary?:
    | string
    | React.ReactNode
    | ((values: Record<string, string>) => string | React.ReactNode);
  /** 추가 클래스명 */
  className?: string;
}

export const EligibilityNumberInputList = ({
  title,
  description,
  required = false,
  options,
  summary,
  className,
}: EligibilityNumberInputListProps) => {
  const [internalValues, setInternalValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    options.forEach(option => {
      if (option.defaultValue) {
        initial[option.id] = option.defaultValue;
      }
    });
    return initial;
  });
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // 가장 긴 prefix 찾기
  const maxPrefixWidth = useMemo(() => {
    const prefixes = options.map(opt => opt.prefix || "").filter(Boolean);

    if (prefixes.length === 0) return 0;

    // 가장 긴 prefix의 문자 수를 기준으로 너비 계산

    const maxLength = Math.max(...prefixes.map(p => p.length));

    // 대략적인 픽셀 너비 계산 (폰트 크기 14px 기준)
    // text-sm = 14px, font-semibold는 약간 더 넓음
    // 한글 기준으로 대략 계산: 문자수 * 14px * 0.8
    return Math.ceil(maxLength * 14 * 0.8);
  }, [options]);

  const handleChange = (optionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 허용
    const numericValue = e.target.value.replace(/[^0-9]/g, "");

    const option = options.find(opt => opt.id === optionId);
    if (!option) return;

    if (option.value === undefined) {
      // uncontrolled
      setInternalValues(prev => ({ ...prev, [optionId]: numericValue }));
    }
    option.onChange?.(optionId, numericValue);
  };

  const handleFocus = (optionId: string, e: React.FocusEvent<HTMLInputElement>) => {
    setFocusedId(optionId);
    const option = options.find(opt => opt.id === optionId);
    option?.onFocus?.(optionId);
  };

  const handleBlur = (optionId: string, e: React.FocusEvent<HTMLInputElement>) => {
    setFocusedId(null);
    const option = options.find(opt => opt.id === optionId);
    option?.onBlur?.(optionId);
  };

  const getValue = (optionId: string): string => {
    const option = options.find(opt => opt.id === optionId);
    if (!option) return "";
    return option.value !== undefined ? option.value : internalValues[optionId] || "";
  };

  const allValues = options.reduce(
    (acc, option) => {
      acc[option.id] = getValue(option.id);
      return acc;
    },
    {} as Record<string, string>
  );

  const getSummaryContent = (): string | React.ReactNode => {
    if (!summary) return "";
    if (typeof summary === "function") {
      return summary(allValues);
    }
    return summary;
  };

  return (
    <div className={cn("flex w-full flex-col", className)}>
      {/* 제목 및 부제목 */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-0.5">
          <h3 className="text-base font-bold leading-[150%] tracking-[-0.023em] text-greyscale-grey-900">
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

      {/* 옵션 리스트 */}
      <div className="mt-2.5 flex flex-col gap-2">
        {options.map(option => {
          const value = getValue(option.id);
          const isFocused = focusedId === option.id;
          const isError = option.error || false;

          return (
            <div key={option.id} className="flex items-center gap-2.5">
              {/* Prefix */}
              {option.prefix && (
                <span
                  className="whitespace-nowrap text-sm font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-700"
                  style={{ minWidth: maxPrefixWidth > 0 ? `${maxPrefixWidth}px` : "auto" }}
                >
                  {option.prefix}
                </span>
              )}

              {/* Input */}
              <div className="relative flex-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  variant={isError ? "error" : "default"}
                  value={formatNumber(value)}
                  onChange={e => handleChange(option.id, e)}
                  onFocus={e => handleFocus(option.id, e)}
                  onBlur={e => handleBlur(option.id, e)}
                  placeholder={option.placeholder || "0"}
                  className={cn(
                    "h-10 rounded-lg py-2.5 pl-4 text-sm font-medium leading-[140%] tracking-[-0.01em]",
                    !isError && isFocused && "border-[1.5px] border-primary-blue-300",
                    value ? "text-black" : "text-greyscale-grey-300"
                  )}
                />
              </div>

              {/* Postfix */}
              {option.postfix && (
                <span className="whitespace-nowrap text-sm font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-700">
                  {option.postfix}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* 하단 강조 텍스트 */}
      {summary && (
        <div className="mt-3.5 flex items-center justify-center gap-1 rounded-lg bg-primary-blue-25 p-3 text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-700">
          {getSummaryContent()}
        </div>
      )}
    </div>
  );
};
