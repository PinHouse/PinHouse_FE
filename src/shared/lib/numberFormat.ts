/**
 * 숫자 포맷팅 유틸 함수
 * - formatNumber: 숫자를 3자리마다 쉼표로 포맷
 * - formatToKorean: 숫자를 한글 단위로 변환 (백, 천, 만, 백만, 천만, 억, 조 단위 지원)
 */

/**
 * 숫자를 3자리마다 쉼표로 포맷
 * @param value - 변환할 숫자 (문자열 또는 숫자)
 * @returns 포맷된 문자열 (예: "1,000,000")
 * @example
 * formatNumber("1000000") // "1,000,000"
 * formatNumber(1000000) // "1,000,000"
 */
export const formatNumber = (value: string | number): string => {
  if (!value && value !== 0) return "";
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "";
  return num.toLocaleString("ko-KR");
};

/**
 * 숫자를 한글로 변환 (백, 천, 만, 백만, 천만, 억, 조 단위 지원)
 * @param value - 변환할 숫자 (문자열 또는 숫자)
 * @param suffix - 단위 뒤에 붙일 접미사 (기본값: "원")
 * @returns 한글 단위로 변환된 문자열
 * @example
 * formatToKorean("1000000") // "100만원"
 * formatToKorean("10000000") // "1천만원"
 * formatToKorean("100000000") // "1억원"
 */
export const formatToKorean = (value: string | number, suffix: string = "원"): string => {
  if (!value) return "";
  const num = typeof value === "string" ? Number(value) : value;
  if (num === 0 || isNaN(num)) return "";

  const result: string[] = [];
  let remaining = num;

  // 조 단위 (1,000,000,000,000)
  if (remaining >= 1000000000000) {
    const cho = Math.floor(remaining / 1000000000000);
    if (cho > 0) {
      result.push(`${cho}조`);
    }
    remaining = remaining % 1000000000000;
  }

  // 억 단위 (100,000,000)
  if (remaining >= 100000000) {
    const eok = Math.floor(remaining / 100000000);
    if (eok > 0) {
      result.push(`${eok}억`);
    }
    remaining = remaining % 100000000;
  }

  // 만 단위 (10,000)
  if (remaining >= 10000) {
    const man = Math.floor(remaining / 10000);
    if (man > 0) {
      result.push(`${man}만`);
    }
    remaining = remaining % 10000;
  }

  // 만 미만 단위 (일반 숫자)
  if (remaining > 0) {
    result.push(String(remaining));
  }

  return result.join(" ") + suffix;
};
