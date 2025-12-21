"use client";

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

type Props = {
  values: number[];
  minLabel?: string;
  maxLabel?: string;
  disabled: boolean;
};

export const HistogramSlider = ({
  values,
  minLabel = "500만",
  maxLabel = "1천만",
  disabled,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(values.length * 0.45));
  const maxValue = Math.max(...values);
  const normalized = useMemo(() => values.map(v => (v / maxValue) * 100), [values, maxValue]);
  console.log(activeIndex);
  return (
    <div className="w-full">
      {/* 히스토그램 */}
      <div className="relative h-[120px] w-full">
        <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-[2px]">
          {normalized.map((height, index) => (
            <span
              key={index}
              className={cn(
                "flex-1 rounded-t transition-colors",
                disabled
                  ? "bg-gray-200" // ← 직접입력 시 색 (갈색)
                  : index <= activeIndex
                    ? "bg-primary-light"
                    : "bg-greyscale-grey-200"
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* 슬라이더 핸들 */}
        <div
          className={cn("absolute bottom-[-8px]")}
          style={{
            left: `${(activeIndex / (values.length - 1)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div
            className={cn(
              "h-5 w-5 rounded-full border-2 border-blue-500 bg-white",
              disabled ? "border-greyscale-grey-200" : "border-primary-light"
            )}
          />
        </div>
      </div>

      {/* 라벨 */}
      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>

      {/* Range Input (실제 조작) */}
      <input
        type="range"
        min={0}
        disabled={disabled}
        max={values.length - 1}
        value={activeIndex}
        onChange={e => setActiveIndex(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 z-20 h-[32px] w-full cursor-pointer opacity-0"
      />
    </div>
  );
};
