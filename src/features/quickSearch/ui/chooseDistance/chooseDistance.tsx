"use client";

import { useEffect, useMemo } from "react";
import { Slider } from "@/src/shared/ui/slider";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";

interface ChooseDistanceProps {
  min?: number;
  max?: number;
  defaultValue?: number;
}

const ChooseDistance = ({ min = 0, max = 120, defaultValue = 60 }: ChooseDistanceProps) => {
  const { transitTime, setTransitTime } = useQuickSearchStore();

  // store에 값이 있으면 그 값을 사용, 없으면 defaultValue 사용
  const currentValue = transitTime > 0 ? transitTime : defaultValue;
  const value = useMemo(() => [currentValue], [currentValue]);

  // 초기 마운트 시 store에 값이 없으면 defaultValue 저장
  useEffect(() => {
    if (transitTime === 0) {
      setTransitTime(defaultValue);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 슬라이더 값이 변경될 때마다 store에 저장
  const handleValueChange = (newValue: number[]) => {
    setTransitTime(newValue[0]);
  };

  // 텍스트 생성: "핀포인트 로부터 {value}분 이내"
  const valueText = `${currentValue}분 이내`;
  const prefix = "핀포인트 로부터 ";
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
        onValueChange={handleValueChange}
        labelSuffix="분"
      />
    </div>
  );
};

export default ChooseDistance;
