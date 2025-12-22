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
const WON_UNIT = 10000;

export const HISTOGRAM_VALUES = [
  30, 50, 80, 90, 100, 90, 100, 90, 80, 90, 100, 110, 100, 110, 90, 80, 60, 50, 40, 30, 20,
];

const formatNumber = (value: number) => value.toLocaleString("ko-KR");
const toKRW = (valueInMan: number) => valueInMan * WON_UNIT;

export const CostFilter = () => {
  const [deposit, setDeposit] = useState(formatNumber(toKRW(DEPOSIT_DEFAULT)));
  const [activeIndex, setActiveIndex] = useState(DEPOSIT_STEP);

  const [isManualDeposit, setIsManualDeposit] = useState(false);
  const [manualDepositInput, setManualDepositInput] = useState(
    formatNumber(toKRW(DEPOSIT_DEFAULT))
  );

  const maxValue = Math.max(...HISTOGRAM_VALUES);
  const normalized = useMemo(
    () => HISTOGRAM_VALUES.map(v => (v / maxValue) * 100),
    [HISTOGRAM_VALUES, maxValue]
  );
  const handleLeftPct = (activeIndex / (HISTOGRAM_VALUES.length - 1)) * 100;
  const maxlength = HISTOGRAM_VALUES.length - 1;

  const handleDepositChange = (values: string) => {
    const nextValue = Number(values);
    setActiveIndex(nextValue);

    setDeposit(formatNumber(toKRW(nextValue * 50)));
    setManualDepositInput(formatNumber(toKRW(nextValue * 50)));
  };

  const handleManualDepositChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const numericValue = Number(rawValue.replace(/[^0-9]/g, ""));
    setManualDepositInput(rawValue === "" ? "" : formatNumber(numericValue));
  };

  const handleManualToggle = (checked: boolean | "indeterminate") => {
    const nextValue = checked === true;
    setIsManualDeposit(nextValue);
    if (!nextValue) {
      setManualDepositInput(deposit);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
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
            <HistogramSlider
              minLabel={DEPOSIT_MIN + "만"}
              maxLabel={DEPOSIT_MAX + "만"}
              disabled={isManualDeposit}
              handleDepositChange={handleDepositChange}
              activeIndex={activeIndex}
              deposit={deposit}
              normalized={normalized}
              handleLeftPct={handleLeftPct}
              maxlength={maxlength}
            />
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
              {manualDepositInput}
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
              value={deposit}
              inputMode="numeric"
              className="text-lg font-semibold leading-[140%] tracking-[-0.01em]"
            />
            <p className="text-xs font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-400">
              {deposit} 만원
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
