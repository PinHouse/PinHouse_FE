"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { Slider } from "@/src/shared/ui/slider";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";
import { Input } from "@/src/shared/ui/input/deafult";
import { cn } from "@/src/shared/lib/utils";
import { HistogramSlider } from "./components/HistogramSlider";

const DEPOSIT_MIN = 500; // 만원
const DEPOSIT_MAX = 1000; // 만원
const DEPOSIT_DEFAULT = 750;
const DEPOSIT_STEP = 10;
const MONTHLY_RENT_DEFAULT = 505_500;
const WON_UNIT = 10000;

export const HISTOGRAM_VALUES = [
  30, 50, 80, 90, 100, 90, 100, 90, 80, 90, 100, 110, 100, 110, 90, 80, 60, 50, 40, 30,
];
const formatNumber = (value: number) => value.toLocaleString("ko-KR");
const toKRW = (valueInMan: number) => valueInMan * WON_UNIT;

export const CostFilter = () => {
  const [deposit, setDeposit] = useState(DEPOSIT_DEFAULT);
  const [isManualDeposit, setIsManualDeposit] = useState(false);
  const [manualDepositInput, setManualDepositInput] = useState(
    formatNumber(toKRW(DEPOSIT_DEFAULT))
  );
  const [monthlyRent, setMonthlyRent] = useState(formatNumber(MONTHLY_RENT_DEFAULT));

  const sliderValue = useMemo(() => [deposit], [deposit]);

  const activeBarIndex = useMemo(() => {
    const ratio = (deposit - DEPOSIT_MIN) / (DEPOSIT_MAX - DEPOSIT_MIN);
    return Math.round(ratio * (HISTOGRAM_VALUES.length - 1));
  }, [deposit]);

  const handleDepositChange = (values: number[]) => {
    const [nextValue] = values;
    console.log(nextValue);
    if (typeof nextValue === "number") {
      setDeposit(nextValue);
      setManualDepositInput(formatNumber(toKRW(nextValue)));
    }
  };

  const handleManualDepositChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const numericValue = Number(rawValue.replace(/[^0-9]/g, ""));
    setManualDepositInput(rawValue === "" ? "" : formatNumber(numericValue));

    if (!Number.isNaN(numericValue) && numericValue > 0) {
      const toMan = Math.round(numericValue / WON_UNIT);
      const clamped = Math.min(DEPOSIT_MAX, Math.max(DEPOSIT_MIN, toMan));
      setDeposit(clamped);
    }
  };

  const handleManualToggle = (checked: boolean | "indeterminate") => {
    const nextValue = checked === true;
    setIsManualDeposit(nextValue);
    if (!nextValue) {
      setManualDepositInput(formatNumber(toKRW(deposit)));
    }
  };

  const handleMonthlyRentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setMonthlyRent(numericValue === "" ? "" : formatNumber(Number(numericValue)));
  };

  const histogramBarClass = (index: number) => {
    if (isManualDeposit) {
      return "bg-greyscale-grey-100";
    }
    return index <= activeBarIndex ? "bg-primary-blue-300" : "bg-[#E1E3F6]";
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold leading-[140%] tracking-[-0.01em] text-greyscale-grey-900">
            보증금 최대 금액
          </p>
          <p className="text-xs font-medium leading-[150%] tracking-[-0.01em] text-greyscale-grey-400">
            이 공고의 평균 보증금은{" "}
            <span className="font-semibold text-primary-blue-400">750만원</span> 입니다.
          </p>
        </div>

        <div className="rounded-2xl px-4 pb-6 pt-5">
          <div className="relative h-[120px] w-full">
            {/* <HistogramSlider
              values={HISTOGRAM_VALUES}
              minLabel="500만"
              maxLabel="1천만"
              disabled={isManualDeposit}
            /> */}
            <div className="absolute inset-x-0 bottom-6 flex w-full items-end gap-[3px]">
              {HISTOGRAM_VALUES.map((height, index) => (
                <span
                  key={`histogram-${index}`}
                  className={cn("flex-1 rounded-t transition-[height]", histogramBarClass(index))}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>

            <Slider
              min={DEPOSIT_MIN}
              max={DEPOSIT_MAX}
              step={DEPOSIT_STEP}
              value={sliderValue}
              disabled={isManualDeposit}
              onValueChange={handleDepositChange}
              className="absolute inset-x-0 bottom-3 [&>div:last-child]:hidden"
            />
          </div>

          <div className="mt-2 flex justify-between text-xs font-semibold leading-[100%] tracking-[-0.01em] text-greyscale-grey-400">
            <span>500만</span>
            <span>1천만</span>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <Checkbox checked={isManualDeposit} onCheckedChange={handleManualToggle} />
          <span className="text-sm font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-900">
            직접입력
          </span>
        </label>

        {isManualDeposit && (
          <div className="flex flex-col gap-2">
            <Input
              size="default"
              variant="default"
              value={manualDepositInput}
              inputMode="numeric"
              onChange={handleManualDepositChange}
              className="text-lg font-semibold leading-[140%] tracking-[-0.01em]"
            />
            <p className="text-xs font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-400">
              500만 5,000원
            </p>
          </div>
        )}
      </section>

      <div className="mt-6 border-t border-greyscale-grey-50" />

      <section className="pt-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold leading-[140%] tracking-[-0.01em] text-greyscale-grey-900">
              월 임대료 최대 금액
            </p>
            <Input
              size="default"
              variant="default"
              value={monthlyRent}
              inputMode="numeric"
              onChange={handleMonthlyRentChange}
              className="text-lg font-semibold leading-[140%] tracking-[-0.01em]"
            />
            <p className="text-xs font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-400">
              50만 5,500원
            </p>
          </div>
        </div>
      </section>

      <div className="mt-auto pt-8">
        <button
          type="button"
          className="w-full rounded-xl bg-greyscale-grey-900 py-4 text-base font-semibold leading-[140%] tracking-[-0.01em] text-white"
        >
          00개의 단지가 있어요
        </button>
      </div>
    </div>
  );
};
