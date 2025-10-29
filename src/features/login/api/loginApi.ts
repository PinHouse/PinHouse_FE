import { OAuthProviderType } from "@/src/features/login/model/auth.cilent.type";

// 백엔드에서 제공하는 OAuth 엔드포인트
const oAuthRequestUrl: string = process.env.NEXT_PUBLIC_OAUTH2 || "Empty_Oauth_Request_Url";

// Provider별 백엔드 엔드포인트 매핑
const authorizeUrl: Record<OAuthProviderType, string> = {
  KAKAO: `${oAuthRequestUrl}/kakao`,
  NAVER: `${oAuthRequestUrl}/naver`,
};

/**
 * 소셜 로그인 요청 함수
 * @param provider - 로그인할 소셜 플랫폼
 */
export const requestOAuthLogin = (provider: OAuthProviderType) => {
  try {
    const url = authorizeUrl[provider];
    // 현재 탭에서 이동하기 위해 window.location.replace 사용
    window.location.replace(url);
  } catch (error) {
    console.error(`${provider} 로그인 요청 실패:`, error);
    throw error;
  }
};
