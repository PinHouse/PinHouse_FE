/**
 * Mock 모드 활성화 여부 확인
 */
export const isMockMode = (): boolean => {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_USE_MOCK_OAUTH === 'true'
  );
};

/**
 * Mock 모드에서 인증 쿠키 설정
 * 브라우저에서 직접 쿠키를 설정합니다.
 */
export const setMockAuthCookie = () => {
  if (!isMockMode() || typeof document === 'undefined') {
    return;
  }

  // 기존 쿠키 제거
  document.cookie = 'is_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  
  // 새 쿠키 설정
  document.cookie = 'is_auth=true; path=/; max-age=86400; SameSite=Lax'; // 24시간
  console.log('[Mock] 인증 쿠키 설정 완료');
};

