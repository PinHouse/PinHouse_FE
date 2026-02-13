"use client";

import { Spinner } from "@/src/shared/ui/spinner/default";

export interface LoadingStateProps {
  /** 로딩 제목 */
  title?: string;
  /** 로딩 설명 */
  description?: string;
  /** 최소 높이 (기본: 화면 전체) */
  className?: string;
}

/**
 * 공용 로딩 UI
 * 섹션/전체 화면 로딩 시 사용
 */
export const LoadingState = ({
  title = "로딩 중",
  description = "잠시만 기다려주세요.",
  className,
}: LoadingStateProps) => {
  return (
    <div
      className={
        className ?? "flex h-full min-h-[200px] items-center justify-center"
      }
    >
      <Spinner title={title} description={description} />
    </div>
  );
};
