/**
 * MSW 초기화 함수
 * 개발 환경에서만 실행됩니다.
 */
export async function initMocks() {
  // 서버 사이드에서는 실행하지 않음
  if (typeof window === 'undefined') {
    return;
  }

  // 개발 환경에서만 실행
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Mock 모드가 활성화되어 있는지 확인
  if (process.env.NEXT_PUBLIC_USE_MOCK_OAUTH !== 'true') {
    return;
  }

  const { worker } = await import('./browser');
  
  await worker.start({
    onUnhandledRequest: 'bypass', // 핸들러가 없는 요청은 그대로 통과
  });

  console.log('[Mock] MSW가 활성화되었습니다.');
  console.log('[Mock] Base URL:', process.env.NEXT_PUBLIC_API_URL || 'https://api.pinhouse.cloud/v1');
}

