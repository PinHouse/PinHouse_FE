"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

import { XButton } from "@/src/assets/icons/button";
import { Input } from "@/src/shared/ui/input/deafult";

interface ChooseRoomSizeProps {
  className?: string;
  onMinChange?: (value: string) => void;
  onMaxChange?: (value: string) => void;
}

const ChooseRoomSize = ({ className, onMinChange, onMaxChange }: ChooseRoomSizeProps) => {
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<"min" | "max" | null>(null);

  const formatNumber = (value: string): string => {
    if (!value) return "";
    return Number(value).toLocaleString("ko-KR");
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setMinValue(value);
    onMinChange?.(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setMaxValue(value);
    onMaxChange?.(value);
  };

  const clearMinValue = () => {
    setMinValue("");
    onMinChange?.("");
  };

  const clearMaxValue = () => {
    setMaxValue("");
    onMaxChange?.("");
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* 최소 평수 입력 */}
      <div className="flex items-center gap-3">
        <label className="whitespace-nowrap text-base font-medium text-greyscale-grey-900">
          최소
        </label>
        <div className="relative flex-1">
          <Input
            type="text"
            inputMode="numeric"
            value={formatNumber(minValue)}
            onChange={handleMinChange}
            onFocus={() => setFocusedInput("min")}
            onBlur={() => setFocusedInput(null)}
            placeholder="0"
            className={cn(
              "h-auto rounded-lg px-4 py-3 text-lg font-medium",
              focusedInput === "min"
                ? "border-[1.5px] border-primary-blue-300"
                : "border-greyscale-grey-75",
              minValue ? "text-greyscale-grey-900" : "text-greyscale-grey-300"
            )}
          />
          {minValue && (
            <button
              onClick={clearMinValue}
              className="text-greyscale-grey-400 hover:text-greyscale-grey-600 absolute right-4 top-1/2 -translate-y-1/2"
            >
              <XButton></XButton>
            </button>
          )}
        </div>
        <span className="whitespace-nowrap text-base font-normal text-greyscale-grey-500">
          평 부터
        </span>
      </div>

      {/* 최대 평수 입력 */}
      <div className="flex items-center gap-3">
        <label className="whitespace-nowrap text-base font-medium text-greyscale-grey-900">
          최대
        </label>
        <div className="relative flex-1">
          <Input
            type="text"
            inputMode="numeric"
            value={formatNumber(maxValue)}
            onChange={handleMaxChange}
            onFocus={() => setFocusedInput("max")}
            onBlur={() => setFocusedInput(null)}
            placeholder="00"
            className={cn(
              "h-auto rounded-lg px-4 py-3 text-lg font-medium",
              focusedInput === "max"
                ? "border-[1.5px] border-primary-blue-300"
                : "border-greyscale-grey-75",
              maxValue ? "text-greyscale-grey-900" : "text-greyscale-grey-300"
            )}
          />
          {maxValue && (
            <button
              onClick={clearMaxValue}
              className="text-greyscale-grey-400 hover:text-greyscale-grey-600 absolute right-4 top-1/2 -translate-y-1/2"
            >
              <XButton></XButton>
            </button>
          )}
        </div>
        <span className="whitespace-nowrap text-base font-normal text-greyscale-grey-500">
          평 까지
        </span>
      </div>
    </div>
  );
};

export default ChooseRoomSize;
