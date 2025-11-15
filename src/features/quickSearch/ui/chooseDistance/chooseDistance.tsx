"use client";

import { useState } from "react";
import { Slider } from "@/src/shared/lib/headlessUi/slider/slider";

interface ChooseDistanceProps {
  min?: number;
  max?: number;
  defaultValue?: number;
}

const ChooseDistance = ({ min = 0, max = 120, defaultValue = 60 }: ChooseDistanceProps) => {
  const [value, setValue] = useState<number[]>([defaultValue]);

  // 텍스트 생성: "핀포인트 로부터 {value}분 이내"
  const prefix = "핀포인트 로부터 ";

  const valueText = `${value[0]}분 이내`;

  return (
    <div className="flex flex-col gap-6">
      {/* 동적 텍스트 */}
      <p className="text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-700">
        {prefix}
        <span className="font-bold text-primary-blue-400">{valueText}</span>
      </p>

      {/* 슬라이더 */}
      <div className="flex flex-col gap-[0.625rem]">
        <Slider
          min={min}
          max={max}
          step={1}
          value={value}
          onValueChange={setValue}
          className="w-full"
        />
        {/* 최소/최대값 라벨 */}
        <div className="flex justify-between text-xs font-semibold leading-[100%] tracking-[-0.01em] text-greyscale-grey-500">
          <span>{min}분</span>
          <span>{max}분</span>
        </div>
      </div>
    </div>
  );
};

export default ChooseDistance;
