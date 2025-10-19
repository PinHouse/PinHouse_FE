"use client";
import { requestOAuthLogin } from "@/src/shared/api/endpoints";
import { OAuthProviderType } from "../model/auth.cilent.type";

export default function useLogin() {
  const handleOuth2Login = async (provider: OAuthProviderType) => {
    try {
      await requestOAuthLogin(provider);
    } catch (error) {
      console.log(error);
    } finally {
      return "end";
    }
  };

  return {
    handleOuth2Login,
  };
}
