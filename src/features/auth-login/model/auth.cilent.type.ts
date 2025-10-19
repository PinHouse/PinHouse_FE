export type OAuthProviderType = "KAKAO" | "NAVER";

/*로그인폼*/
export interface LoginFormProps {
  onOuth2Login: (provider: OAuthProviderType) => void;
}
