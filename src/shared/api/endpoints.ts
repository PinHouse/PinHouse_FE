import { OAuthProvider } from "../types/auth";
import { http } from "./http";

const redirectUrl: string = process.env.NEXT_PUBLIC_REDIRECT_URL || "Empty_Redirect_Url";
const kakaoKey: string = process.env.NEXT_PUBLIC_KAKAO || "Empty_Key";
const naverKey: string = process.env.NEXT_PUBLIC_NAVER || "Empty_Key";
const authorizeUrl: Record<OAuthProvider, string> = {
  KAKAO: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoKey}&redirect_uri=${redirectUrl}`,
  NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverKey}&redirect_uri=${redirectUrl}`,
};

/**
 * provider의 authorize 페이지로 이동하는 함수
 * @param provider
 */
export const requestOAuthLogin = (provider: OAuthProvider) => {
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
