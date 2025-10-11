"use client";
import { LoginFormProps } from "../model/auth.cilent.type";
import { UseLoginInput } from "./loginInput";

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="flex flex-col justify-center gap-8">
      <UseLoginInput
        label="이메일"
        type="email"
        placeholder="example@email.com"
        value={email && email}
        onChange={onEmailChange}
      />

      <UseLoginInput
        label="비밀번호"
        type="password"
        placeholder="••••••••"
        value={password && password}
        onChange={onPasswordChange}
      />

      <button
        onClick={onSubmit}
        className="font-suit bg-button-light text-button-text hover:bg-button-hover active:bg-button-active disabled:bg-button-muted w-full rounded-lg py-3 text-lg font-semibold transition-all duration-200"
      >
        {"로그인"}
        {/* {isLoading ? "로그인 중..." : "로그인"} */}
      </button>
    </div>
  );
}
