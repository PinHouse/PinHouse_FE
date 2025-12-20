"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SurveyButton } from "@/src/shared/ui/button/surveyButton";

export type EligibilityOption = {
  id: string;
  label: string;
};

export type EligibilityDirection = "horizontal" | "vertical";

export interface EligibilityOptionSelectorProps {
  /** 제목 */
  title: string;
  /** 부제목 */
  description?: string;
  /** 선택 가능한 옵션 리스트 */
  options: EligibilityOption[];
  /** 보여주는 방향 (horizontal: 가로, vertical: 세로) */
  direction?: EligibilityDirection;
  /** 멀티셀렉트 최대 개수 (undefined면 단일 선택) */
  multiselect?: number;
  /** 필수 질문 여부 (true면 제목 옆에 점 표시) */
  required?: boolean;
  /** 선택된 옵션 ID 리스트 (제어 컴포넌트용) */
  selectedIds?: string[];
  /** 선택 변경 핸들러 */
  onChange?: (selectedIds: string[]) => void;
  /** 추가 클래스명 */
  className?: string;
}

export const EligibilityOptionSelector = ({
  title,
  description,
  options,
  direction = "vertical",
  multiselect,
  required = false,
  selectedIds: controlledSelectedIds,
  onChange,
  className,
}: EligibilityOptionSelectorProps) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);

  // 제어 컴포넌트인지 비제어 컴포넌트인지 판단
  const isControlled = controlledSelectedIds !== undefined;
  const selectedIds = isControlled ? controlledSelectedIds : internalSelectedIds;

  const handleOptionClick = (optionId: string) => {
    let newSelectedIds: string[];

    if (multiselect === undefined) {
      // 단일 선택
      newSelectedIds = selectedIds.includes(optionId) ? [] : [optionId];
    } else {
      // 멀티셀렉트
      if (selectedIds.includes(optionId)) {
        // 이미 선택된 경우 제거
        newSelectedIds = selectedIds.filter(id => id !== optionId);
      } else {
        // 선택되지 않은 경우 추가 (최대 개수 제한)
        if (selectedIds.length < multiselect) {
          newSelectedIds = [...selectedIds, optionId];
        } else {
          // 최대 개수에 도달한 경우, 가장 오래된 선택을 제거하고 새로 추가
          newSelectedIds = [...selectedIds.slice(1), optionId];
        }
      }
    }

    if (!isControlled) {
      setInternalSelectedIds(newSelectedIds);
    }
    onChange?.(newSelectedIds);
  };

  const isHorizontal = direction === "horizontal";

  return (
    <div className={cn("flex w-full flex-col gap-3.5", className)}>
      {/* 제목 및 부제목 */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-0.5">
          <h3 className="text-base font-semibold leading-[136%] tracking-[-0.02em] text-greyscale-grey-900">
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
      <div className={cn("flex gap-2", isHorizontal ? "flex-row" : "flex-col")}>
        {options.map(option => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <SurveyButton
              key={option.id}
              title={option.label}
              pressed={isSelected}
              onPressedChange={() => handleOptionClick(option.id)}
              className={cn("pl-5 text-sm", isHorizontal ? "flex-1" : "w-full")}
            />
          );
        })}
      </div>
    </div>
  );
};
