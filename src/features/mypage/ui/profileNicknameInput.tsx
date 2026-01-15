"use client";

import { cn } from "@/src/shared/lib/utils";
import { Input } from "@/src/shared/ui/input/deafult/input";

export interface ProfileNicknameInputProps {
  /** 닉네임 값 */
  value: string;
  /** 변경 핸들러 */
  onChange: (value: string) => void;
  /** 최대 글자수 */
  maxLength?: number;
  /** 추가 클래스명 */
  className?: string;
}

export const ProfileNicknameInput = ({
  value,
  onChange,
  maxLength = 10,
  className,
}: ProfileNicknameInputProps) => {
  const currentLength = value.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      onChange(inputValue);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-base font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
        닉네임
      </label>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="닉네임"
        className="h-12 rounded-lg px-4 text-base font-medium leading-[140%] tracking-[-0.01em]"
      />
      <div className="pl-5 text-left text-sm font-medium leading-[140%] tracking-[-0.02em] text-greyscale-grey-500">
        {currentLength}/{maxLength}
      </div>
    </div>
  );
};
