import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind class 병합 유틸
 * - clsx: 조건부 클래스
 * - twMerge: Tailwind 중복 클래스 우선순위 처리
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
