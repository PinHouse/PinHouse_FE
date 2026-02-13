"use client";

import { cn } from "@/src/shared/lib/utils";
import { Input } from "@/src/shared/ui/input/deafult/input";

export interface ProfileNicknameInputProps {
  /** 닉네임 값 */
  value: string;
  /** 변경 핸들러 */
  onChange: (value: string) => void;
  /** blur 시 호출 */
  onBlur?: () => void;
  /** 저장 중 여부 (라벨 옆 스피너 표시) */
  isSaving?: boolean;
  /** 최대 글자수 */
  maxLength?: number;
  /** 추가 클래스명 */
  className?: string;
}

export const ProfileNicknameInput = ({
  value,
  onChange,
  onBlur,
  isSaving = false,
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
      <div className="flex items-center gap-1.5">
        <label className="text-base font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
          닉네임
        </label>
        {isSaving && (
          <span
            className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-greyscale-grey-300 border-t-transparent"
            aria-hidden
          />
        )}
      </div>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder="닉네임"
        className="h-12 rounded-lg px-4 text-base font-medium leading-[140%] tracking-[-0.01em]"
      />
      <div className="pl-5 text-left text-sm font-medium leading-[140%] tracking-[-0.02em] text-greyscale-grey-500">
        {currentLength}/{maxLength}
      </div>
    </div>
  );
};
