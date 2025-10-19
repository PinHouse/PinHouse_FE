export type OAuthProviderType = "KAKAO" | "NAVER";

/*로그인폼*/
export interface ILoginFormProps {
  onOuth2Login: (provider: OAuthProviderType) => void;
}
