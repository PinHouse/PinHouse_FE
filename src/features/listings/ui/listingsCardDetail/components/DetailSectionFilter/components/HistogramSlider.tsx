"use client";

import { cn } from "@/lib/utils";
import { RefObject } from "react";

type Props = {
  minLabel?: string;
  maxLabel?: string;
  disabled: boolean;
  handleDepositChange: (value: string) => void;
  activeIndex: number;
  deposit: string;
  handleLeftPct: number;
  normalized: number[];
  maxlength: number;
  histogramRef: RefObject<HTMLDivElement | null>;
};

export const HistogramSlider = ({
  minLabel = "500만",
  maxLabel = "1천만",
  disabled,
  handleDepositChange,
  activeIndex,
  deposit,
  handleLeftPct,
  normalized,
  maxlength,
  histogramRef,
}: Props) => {
  return (
    <div className="w-full">
      {/* 히스토그램 */}
      <div className="relative h-[120px] w-full" ref={histogramRef}>
        {!disabled && (
          <div
            className="absolute bottom-[100%] mb-2"
            style={{
              left: `${handleLeftPct}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className={`relative rounded-md bg-black px-2 py-1 text-xs text-white ${
                activeIndex === 20 ? "-translate-x-1/4" : ""
              }`}
            >
              {deposit}
              {activeIndex === 20 ? (
                <span
                  className="absolute top-full border-4 border-transparent border-t-black"
                  style={{
                    left: `${handleLeftPct}%`,
                    transform: "translateX(-150%)",
                  }}
                />
              ) : (
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black" />
              )}
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-[2px]">
          {normalized.map((height, index) => (
            <span
              key={index}
              className={cn(
                "flex-1 rounded-t transition-colors",
                disabled
                  ? "bg-gray-200"
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
          className={cn("absolute bottom-0")}
          style={{
            left: `${handleLeftPct}%`,
            transform: "translate(-50%, 50%)",
          }}
        >
          <div
            className={cn(
              "h-[12px] w-[12px] rounded-full border-2 border-blue-500 bg-white",
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
        max={maxlength}
        value={activeIndex}
        onChange={e => handleDepositChange(e.target.value)}
        className="absolute inset-x-0 bottom-0 z-20 h-[32px] w-full cursor-pointer opacity-0"
      />
    </div>
  );
};
