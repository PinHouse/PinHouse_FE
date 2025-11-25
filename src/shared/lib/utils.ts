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

/**
 * @param str 년,월,일 포맷형 데이터
 * @returns YYYY.MM.DD 또는 YYYY.MM.DD - YYYY.MM.DD 형식의 문자열
 */
export const formatApplyPeriod = (str: string) => {
  if (!str) return "";

  // 2025년 5월 11일 → 2025.05.11
  const toDotFormat = (dateStr: string) => {
    const regex = /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/;
    const match = dateStr.match(regex);
    if (!match) return dateStr;

    const [, year, month, day] = match;
    return `${year}.${month.padStart(2, "0")}.${day.padStart(2, "0")}`;
  };

  // “2025년 5월 11일 ~ 2025년 6월 3일”
  if (str.includes("~")) {
    const [start, end] = str.split("~").map(s => s.trim());
    return `${toDotFormat(start)} - ${toDotFormat(end)}`;
  }

  // 단일 날짜만 있을 때
  return toDotFormat(str);
};
