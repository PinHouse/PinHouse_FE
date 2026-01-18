"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import type { PinPoint, PinPointMap } from "@/src/shared/ui/dropDown/deafult/type";

export interface EligibilitySelectOption {
  /** 옵션 키 */
  key: string;
  /** 옵션 표시값 */
  value: string;
  /** 옵션 설명 (선택) */
  description?: string;
}

export interface EligibilitySelectProps {
  /** 제목 */
  title: string;
  /** 부제목/설명 */
  description?: string;
  /** 필수 입력 여부 (true면 제목 옆에 점 표시) */
  required?: boolean;
  /** 선택 가능한 옵션 리스트 */
  options: EligibilitySelectOption[];
  /** 선택된 값 (controlled) */
  value?: string;
  /** 기본값 (uncontrolled) */
  defaultValue?: string;
  /** 플레이스홀더 (선택 안함 표시) */
  placeholder?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 값 변경 핸들러 */
  onChange?: (key: string, value: string) => void;
  /** 추가 클래스명 */
  className?: string;
}

export const EligibilitySelect = ({
  title,
  description,
  required = false,
  options,
  value: controlledValue,
  defaultValue,
  placeholder = "선택 안함",
  error = false,
  onChange,
  className,
}: EligibilitySelectProps) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || "");

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // "선택 안함" 옵션을 포함한 옵션 리스트 생성
  const optionsWithPlaceholder: EligibilitySelectOption[] = [
    { key: "", value: placeholder },
    ...options,
  ];

  // DropDown 컴포넌트가 요구하는 형식으로 데이터 변환
  const dropDownData: PinPointMap = {
    options: optionsWithPlaceholder as PinPoint[],
  };

  const handleChange = (selectedKey: string, selectedValue: string) => {
    if (!isControlled) {
      setInternalValue(selectedKey);
    }
    onChange?.(selectedKey, selectedValue);
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

      {/* Select 영역 */}
      <div className="mt-3">
        <DropDown
          variant="box"
          size="lg"
          types="options"
          data={dropDownData}
          onChange={handleChange}
          className={cn(error && "!border-danger-400", !currentValue && "text-greyscale-grey-300")}
        ></DropDown>
      </div>
    </div>
  );
};
