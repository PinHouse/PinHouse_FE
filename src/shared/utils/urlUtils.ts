/**
 * URL에서 state 파라미터의 OAUTH2_TEMP_USER 값을 추출하는 함수
 * @param state - "OAUTH2_TEMP_USER:uuid" 형태의 문자열
 * @returns UUID 값 또는 null
 */
export const extractTempUserId = (state: string | null): string | null => {
  if (!state) return null;
  
  // "OAUTH2_TEMP_USER:" 접두사 제거
  const prefix = 'OAUTH2_TEMP_USER:';
  if (state.startsWith(prefix)) {
    return state.substring(prefix.length);
  }
  
  return null;
};
