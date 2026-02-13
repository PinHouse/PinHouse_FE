import { OAuthProviderType } from "@/src/shared/types";

export type { OAuthProviderType };

/** 로그인폼 */
export interface ILoginFormProps {
  onOuth2Login: (provider: OAuthProviderType) => void;
}
