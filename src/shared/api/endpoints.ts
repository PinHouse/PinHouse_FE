import { OAuthProviderType } from "@/src/features/auth-login/model/auth.cilent.type";

const oAuthRequestUrl: string = process.env.NEXT_PUBLIC_OAUTH2 || "Empty_Oauth_Request_Url";

const authorizeUrl: Record<OAuthProviderType, string> = {
  KAKAO: `${oAuthRequestUrl}/kakao`,
  NAVER: `${oAuthRequestUrl}/naver`,
};

/**
 * provider의 authorize 페이지로 이동하는 함수
 * @param provider
 */
export const requestOAuthLogin = (provider: OAuthProviderType) => {
  window.open(authorizeUrl[provider], "_blank");
};

/**
 * oauth 로그인
 * @param code
 * @param provider
 * @param fcmToken
 */
// export const oauthLogin = async ({ code, provider, fcmToken }: IAuthData) => {
//   return http.post<IAuthResponse, IAuthData>("/oauth", { code, provider });
// };

/**
 * 로그아웃
 */
// export const oauthLogout = async () => {
//   return http.delete("/auth");
// };
