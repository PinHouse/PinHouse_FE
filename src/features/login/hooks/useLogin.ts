"use client";
import { requestOAuthLogin } from "@/src/features/login/api/loginApi";
import { OAuthProviderType } from "@/src/features/login/model";

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
