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
        className="hover:bg-button-hover w-full rounded-lg bg-button-light py-3 font-suit text-lg font-semibold text-button-text transition-all duration-200 active:bg-button-active disabled:bg-button-muted"
      >
        {"로그인"}
        {/* {isLoading ? "로그인 중..." : "로그인"} */}
      </button>

      <div className="text-md flex justify-center gap-4 text-sm font-[500] text-text-secondary">
        <p>이메일 찾기</p>
        <p className="text-text-tertiary">|</p>
        <p>비밀번호 찾기</p>
      </div>
    </div>
  );
}
