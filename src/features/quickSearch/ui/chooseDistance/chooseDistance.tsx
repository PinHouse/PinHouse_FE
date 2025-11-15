"use client";

import { useState } from "react";
import { Slider } from "@/src/shared/ui/slider";

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
      <Slider
        min={min}
        max={max}
        step={1}
        value={value}
        onValueChange={setValue}
        labelSuffix="분"
      />
    </div>
  );
};

export default ChooseDistance;
