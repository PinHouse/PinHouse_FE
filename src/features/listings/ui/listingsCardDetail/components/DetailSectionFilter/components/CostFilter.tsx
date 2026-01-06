"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent } from "react";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";
import { Input } from "@/src/shared/ui/input/deafult";
import { HistogramSlider } from "./HistogramSlider";
import { useParams } from "next/navigation";
import { useListingDetailNoticeSheet } from "@/src/entities/listings/hooks/useListingDetailSheetHooks";
import { CostResponse } from "@/src/entities/listings/model/type";
import { useListingDetailCountStore, useListingDetailFilter } from "@/src/features/listings/model";

const DEPOSIT_STEP = 10;
const WON_UNIT = 1;
const GAP = 2;
const BAR_COUNT = 21;
const MAX_INDEX = BAR_COUNT - 1;

export const HISTOGRAM_VALUES = [
  10, 13, 15, 16, 17, 15, 14, 13, 14, 15, 16, 17, 18, 15, 12, 10, 14, 13, 12, 11, 10,
];

const formatNumber = (value: number) => {
  const normalized = Number.isFinite(value) ? value : 0;
  return Math.round(normalized).toLocaleString("ko-KR");
};
const toKRW = (valueInMan: number) => valueInMan * WON_UNIT;

export const CostFilter = () => {
  const [activeIndex, setActiveIndex] = useState(DEPOSIT_STEP);
  const { id } = useParams() as { id: string };
  const { data } = useListingDetailNoticeSheet<CostResponse>({
    id: id,
    url: "cost",
  });
  const DEPOSIT_MIN = data?.minPrice ?? 0;
  const DEPOSIT_MAX = data?.maxPrice ?? 0;
  const AVG_COST = data?.avgPrice ?? 0;
  const [isManualDeposit, setIsManualDeposit] = useState(false);
  const { setMaxDeposit, maxDeposit, maxMonthPay, setMaxMonthPay } = useListingDetailFilter();
  const [handleDepositInput, setHandleDepositInput] = useState("0");
  const [deposit, setDeposit] = useState("0");
  const { filteredCount } = useListingDetailCountStore();

  // 슬라이더 인덱스를 가격 범위에 맞춰 실제 보증금 값으로 변환
  const getDepositByIndex = (index: number) => {
    if (DEPOSIT_MAX <= DEPOSIT_MIN) return DEPOSIT_MIN;
    const step = (DEPOSIT_MAX - DEPOSIT_MIN) / MAX_INDEX;
    return Math.round(DEPOSIT_MIN + step * index);
  };

  // 보증금 값을 현재 범위에 맞는 슬라이더 인덱스로 역변환
  const getIndexByDepositValue = (value: number) => {
    if (DEPOSIT_MAX <= DEPOSIT_MIN) return 0;
    const ratio = (value - DEPOSIT_MIN) / (DEPOSIT_MAX - DEPOSIT_MIN);
    const clamped = Math.min(1, Math.max(0, ratio));
    return Math.round(clamped * MAX_INDEX);
  };

  const sliderRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const maxValue = Math.max(...HISTOGRAM_VALUES);
  const normalized = HISTOGRAM_VALUES.map(v => (v / maxValue) * 100);
  const barCount = normalized.length;

  // 히스토그램 컨테이너 폭 변화에 맞춰 막대 폭/위치 재계산
  useLayoutEffect(() => {
    if (!sliderRef.current) return;
    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, []);

  // 전체 gap/막대 폭 계산 후 슬라이더 핸들의 픽셀/퍼센트 위치 산출
  const totalGap = GAP * (barCount - 1);
  const barWidth = barCount ? Math.max(0, (containerWidth - totalGap) / barCount) : 0;
  const handleLeftPx = barWidth * activeIndex + GAP * activeIndex + barWidth / 2;
  const handleLeftPct = containerWidth ? (handleLeftPx / containerWidth) * 100 : 0;
  const maxlength = HISTOGRAM_VALUES.length - 1;

  // API 데이터가 도착하면 평균값을 기준으로 슬라이더·입력 초기화
  useEffect(() => {
    if (!data) return;
    const baseDeposit = data.avgPrice ?? data.minPrice ?? 0;
    const formatted = formatNumber(toKRW(baseDeposit));
    setDeposit(formatted);
    setActiveIndex(getIndexByDepositValue(baseDeposit));
  }, [AVG_COST, DEPOSIT_MIN, DEPOSIT_MAX, data]);

  useEffect(() => {
    if (!isManualDeposit) {
      setMaxDeposit(deposit);
    } else {
      setMaxDeposit(handleDepositInput);
    }
  }, [deposit, handleDepositInput]);

  // 슬라이더 인덱스를 실 보증금으로 변환
  const handleDepositChange = (value: string) => {
    const index = Number(value);
    if (Number.isNaN(index)) return;
    setActiveIndex(index);
    const depositValue = getDepositByIndex(index);
    setDeposit(formatNumber(toKRW(depositValue)));
  };

  // 직접 입력 시 숫자만 추려서 포맷
  const handleDepositChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    const numericValue = Number(values.replace(/[^0-9]/g, ""));
    setHandleDepositInput(formatNumber(toKRW(numericValue)));
  };

  const handleManualDepositChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const numericValue = Number(rawValue.replace(/[^0-9]/g, ""));
    setMaxMonthPay(rawValue === "" ? "" : formatNumber(numericValue));
  };

  const handleManualToggle = (checked: boolean | "indeterminate") => {
    const nextValue = checked === true;
    setIsManualDeposit(nextValue);
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
            <span className="font-semibold text-primary-blue-400">
              {data ? `${formatNumber(toKRW(AVG_COST))}만원` : "정보 없음"}
            </span>{" "}
            입니다.
          </p>
        </div>

        <div className="rounded-2xl px-2 pb-6 pt-5">
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
            value={maxDeposit}
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

      <div className="mt-auto">
        <button
          type="button"
          className="w-full rounded-xl bg-greyscale-grey-900 py-4 text-base font-semibold leading-[140%] tracking-[-0.01em] text-white"
        >
          {filteredCount}개의 단지가 있어요
        </button>
      </div>
    </div>
  );
};
