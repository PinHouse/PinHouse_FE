"use client";
import { requestOAuthLogin } from "@/src/shared/api/endpoints";
import { OAuthProviderType } from "@/src/features/auth-login/model";

export default function useLogin() {
  const handleOuth2Login = (provider: OAuthProviderType) => {
    try {
      requestOAuthLogin(provider);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleOuth2Login,
  };
}
