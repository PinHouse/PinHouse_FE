"use client";
import { requestOAuthLogin } from "@/src/shared/api/endpoints";
import { ChangeEvent, useState } from "react";

export default function useLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setEmail(target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setPassword(target.value);
  };

  const handleLogin = async () => {
    try {
      await requestOAuthLogin("KAKAO");
      //await new Promise(res => setTimeout(res, 1000));
    } catch (error) {
      console.log(error);
    } finally {
      return "end";
    }
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
}
