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

/**
 * @param address 피포인트 이름
 * @returns 핀포인트 이름 이나 핀포인트 이름을 지역이름 으로 할시 구를 기준으로 줄넘기기
 */

export const splitAddress = (address: string): [string, string] => {
  const idx = address.indexOf("구");
  if (idx === -1) {
    return [address, ""];
  }
  return [address.slice(0, idx + 1), address.slice(idx + 1).trim()];
};

/**
 * @param time 0분 ~ 120분
 * @returns 분단위 데이터 60분 부터 1시간 00분 으로 리턴
 */
export const transTime = (time: number) => {
  const storeTime = time;

  if (storeTime < 60) {
    return `0시간 ${storeTime}분`;
  }

  const hours = Math.floor(storeTime / 60);
  const restMinutes = storeTime % 60;

  if (restMinutes === 0) {
    return `${hours}시간 00분`;
  }

  return `${hours}시간 ${restMinutes}분`;
};
