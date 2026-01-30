import { http, HttpResponse } from 'msw';
import { IResponse } from '@/src/shared/types';
import { setMockAuthCookie } from './utils';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.pinhouse.cloud/v1';
const oAuthBaseURL = process.env.NEXT_PUBLIC_OAUTH2 || baseURL;

/**
 * MSW 핸들러 정의
 * 개발 환경에서 백엔드 API를 Mock 처리합니다.
 */
export const handlers = [
  // OAuth 카카오 로그인
  http.get(`${oAuthBaseURL}/kakao`, () => {
    const mockTempUserId = `mock-kakao-${Date.now()}`;
    const callbackUrl = `/signup?state=${mockTempUserId}`;
    console.log('[Mock API] OAuth 카카오 로그인 요청 - 리다이렉트:', callbackUrl);
    return HttpResponse.redirect(callbackUrl, 302);
  }),

  // OAuth 네이버 로그인
  http.get(`${oAuthBaseURL}/naver`, () => {
    const mockTempUserId = `mock-naver-${Date.now()}`;
    const callbackUrl = `/signup?state=${mockTempUserId}`;
    console.log('[Mock API] OAuth 네이버 로그인 요청 - 리다이렉트:', callbackUrl);
    return HttpResponse.redirect(callbackUrl, 302);
  }),

  // 온보딩 완료 (회원가입) API
  // POST /users?tempKey=mock-kakao-1769671978332
  http.post(`${baseURL}/users`, async ({ request }) => {
    const url = new URL(request.url);
    const tempKey = url.searchParams.get('tempKey');
    
    // 요청 body 파싱
    const body = await request.json().catch(() => ({}));
    
    console.log('[Mock API] 온보딩 완료 요청:', { tempKey, body });
    
    // Mock 응답 생성
    const mockResponse: IResponse<{
      userId: string;
      onboardingCompleted: boolean;
    }> = {
      success: true,
      code: 200,
      message: '회원가입이 완료되었습니다.',
      data: {
        userId: tempKey ? `user-${tempKey}` : 'mock-user-id',
        onboardingCompleted: true,
      },
    };
    
    // Mock 모드에서 인증 쿠키 설정
    setMockAuthCookie();
    
    return HttpResponse.json(mockResponse);
  }),

  // 인증 토큰 갱신 API
  http.put(`${baseURL}/auth`, () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: '토큰 갱신 성공',
      data: {},
    });
  }),

  // 인증 상태 확인 API (JWT 토큰 검증)
  // GET /auth
  http.get(`${baseURL}/auth`, () => {
    console.log('[Mock API] 인증 상태 확인 요청');
    return HttpResponse.json({
      success: true,
      code: 200,
      message: '인증 성공',
      data: true, // useAuthHook에서 response.data를 확인하므로 true 반환
    });
  }),

  // 인증 상태 확인 API (필요한 경우)
  http.get(`${baseURL}/auth/status`, () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: '성공',
      data: {
        authenticated: true,
        user: {
          id: 'mock-user-id',
          name: 'Mock User',
        },
      },
    });
  }),

  // 핀포인트 설정(생성) API
  // POST /pinpoints
  http.post(`${baseURL}/pinpoints`, async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    
    console.log('[Mock API] 핀포인트 설정 요청:', body);
    console.log('[Mock API] 요청 URL:', request.url);
    
    // Mock 응답 생성 (인증 없이도 성공하도록 처리)
    const mockResponse: IResponse<{
      address: string;
      name: string;
      first: boolean;
    }> = {
      success: true,
      code: 200,
      message: '핀포인트가 설정되었습니다.',
      data: {
        address: (body as any).address || '서울시 강남구',
        name: (body as any).name || '내 집',
        first: (body as any).first ?? false,
      },
    };
    
    console.log('[Mock API] 핀포인트 설정 응답:', mockResponse);
    return HttpResponse.json(mockResponse);
  }),

  // 핀포인트 목록 조회 API
  http.get(`${baseURL}/pinpoints`, () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: '성공',
      data: {
        userName: 'Mock User',
        pinPoints: [
          {
            id: 'mock-pinpoint-1',
            name: '내 집',
            address: '서울시 강남구',
            latitude: 37.5665,
            longitude: 126.978,
          },
        ],
      },
    });
  }),
];

