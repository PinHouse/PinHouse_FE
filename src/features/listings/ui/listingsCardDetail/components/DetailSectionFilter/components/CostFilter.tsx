"use client";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";
import { Input } from "@/src/shared/ui/input/deafult";
import { HistogramSlider } from "./HistogramSlider";
import { useCostFilter } from "@/src/features/listings/ui/listingsCardDetail/hooks/costHooks";

export const CostFilter = () => {
  const {
    avgCostLabel,
    histogramMaxLabel,
    histogramMinLabel,
    isManualDeposit,
    maxDeposit,
    maxMonthPay,
    activeIndex,
    deposit,
    normalized,
    handleLeftPct,
    maxlength,
    sliderRef,
    handleDepositChange,
    handleDepositChangeText,
    handleManualDepositChange,
    handleManualToggle,
  } = useCostFilter();

  return (
    <div className="flex h-full flex-col bg-white">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold leading-[140%] tracking-[-0.01em] text-greyscale-grey-900">
            보증금 최대 금액
          </p>
          <p className="text-xs font-medium leading-[150%] tracking-[-0.01em] text-greyscale-grey-400">
            이 공고의 평균 보증금은{" "}
            <span className="font-semibold text-primary-blue-400">{avgCostLabel}</span> 입니다.
          </p>
        </div>

        <div className="rounded-2xl px-2 pb-6 pt-5">
          <div className="relative h-[120px] w-full">
            <HistogramSlider
              minLabel={histogramMinLabel}
              maxLabel={histogramMaxLabel}
              disabled={isManualDeposit}
              handleDepositChange={handleDepositChange}
              activeIndex={activeIndex}
              deposit={deposit}
              normalized={normalized}
              handleLeftPct={handleLeftPct}
              maxlength={maxlength}
              histogramRef={sliderRef}
            />
          </div>
        </div>

        <label className="flex items-center gap-2">
          <Checkbox checked={isManualDeposit} onCheckedChange={handleManualToggle} />
          <span className="text-sm font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-900">
            보증금 직접입력
          </span>
        </label>

        <div className="flex flex-col gap-2">
          <Input
            size="default"
            variant="default"
            value={maxDeposit === "" ? "0" : maxDeposit}
            disabled={!isManualDeposit}
            inputMode="numeric"
            onChange={handleDepositChangeText}
            className="text-lg font-semibold leading-[140%] tracking-[-0.01em]"
          />
          <p className="text-xs font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-400">
            {maxDeposit}만원
          </p>
        </div>
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
              onChange={handleManualDepositChange}
              value={maxMonthPay}
              inputMode="numeric"
              className="text-lg font-semibold leading-[140%] tracking-[-0.01em]"
            />
            <p className="text-xs font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-400">
              {maxMonthPay} 만원
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
