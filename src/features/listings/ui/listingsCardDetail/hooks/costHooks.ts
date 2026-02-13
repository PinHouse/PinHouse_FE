import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from "react";
import { useParams } from "next/navigation";
import { useListingDetailNoticeSheet } from "@/src/entities/listings/hooks/useListingDetailSheetHooks";
import { CostResponse } from "@/src/entities/listings/model/type";
import { useListingDetailFilter } from "@/src/features/listings/model";

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

export const useCostFilter = () => {
  const [activeIndex, setActiveIndex] = useState(DEPOSIT_STEP);
  const { id } = useParams() as { id: string };
  const { data } = useListingDetailNoticeSheet<CostResponse>({
    id,
    url: "cost",
  });
  const DEPOSIT_MIN = data?.minPrice ?? 0;
  const DEPOSIT_MAX = data?.maxPrice ?? 0;
  const AVG_COST = data?.avgPrice ?? 0;
  const [isManualDeposit, setIsManualDeposit] = useState(false);
  const { setMaxDeposit, maxDeposit, maxMonthPay, setMaxMonthPay } = useListingDetailFilter();
  const [handleDepositInput, setHandleDepositInput] = useState("0");
  const [deposit, setDeposit] = useState("0");

  const sliderRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const normalized = useMemo(() => {
    const maxValue = Math.max(...HISTOGRAM_VALUES);
    return HISTOGRAM_VALUES.map(v => (v / maxValue) * 100);
  }, []);

  const barCount = normalized.length;
  const totalGap = GAP * (barCount - 1);
  const barWidth = barCount ? Math.max(0, (containerWidth - totalGap) / barCount) : 0;
  const handleLeftPx = barWidth * activeIndex + GAP * activeIndex + barWidth / 2;
  const handleLeftPct = containerWidth ? (handleLeftPx / containerWidth) * 100 : 0;
  const maxlength = HISTOGRAM_VALUES.length - 1;

  const histogramMinLabel = `${formatNumber(toKRW(DEPOSIT_MIN))} 만`;
  const histogramMaxLabel = `${formatNumber(toKRW(DEPOSIT_MAX))} 만`;
  const avgCostLabel = data ? `${formatNumber(toKRW(AVG_COST))}만원` : "정보 없음";

  const getDepositByIndex = useCallback(
    (index: number) => {
      if (DEPOSIT_MAX <= DEPOSIT_MIN) return DEPOSIT_MIN;
      const step = (DEPOSIT_MAX - DEPOSIT_MIN) / MAX_INDEX;
      return Math.round(DEPOSIT_MIN + step * index);
    },
    [DEPOSIT_MAX, DEPOSIT_MIN]
  );

  const getIndexByDepositValue = useCallback(
    (value: number) => {
      if (DEPOSIT_MAX <= DEPOSIT_MIN) return 0;
      const ratio = (value - DEPOSIT_MIN) / (DEPOSIT_MAX - DEPOSIT_MIN);
      const clamped = Math.min(1, Math.max(0, ratio));
      return Math.round(clamped * MAX_INDEX);
    },
    [DEPOSIT_MAX, DEPOSIT_MIN]
  );

  useLayoutEffect(() => {
    if (!sliderRef.current) return;
    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!data) return;
    const baseDeposit = data.avgPrice ?? data.minPrice ?? 0;
    const formatted = formatNumber(toKRW(baseDeposit));
    setDeposit(formatted);
    setActiveIndex(getIndexByDepositValue(baseDeposit));
  }, [data, getIndexByDepositValue]);

  useEffect(() => {
    if (!isManualDeposit) {
      setMaxDeposit(deposit);
    } else {
      setMaxDeposit(handleDepositInput === "" ? "0" : handleDepositInput);
    }
  }, [deposit, handleDepositInput, isManualDeposit, setMaxDeposit]);

  const handleDepositChange = useCallback(
    (value: string) => {
      const index = Number(value);
      if (Number.isNaN(index)) return;
      setActiveIndex(index);
      const depositValue = getDepositByIndex(index);
      setDeposit(formatNumber(toKRW(depositValue)));
    },
    [getDepositByIndex]
  );

  const handleDepositChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    if (values === "") {
      setHandleDepositInput("");
      return;
    }
    const numericValue = Number(values.replace(/[^0-9]/g, ""));
    setHandleDepositInput(formatNumber(toKRW(numericValue)));
  }, []);

  const handleManualDepositChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value;
      const numericValue = Number(rawValue.replace(/[^0-9]/g, ""));
      setMaxMonthPay(rawValue === "" ? "" : formatNumber(numericValue));
    },
    [setMaxMonthPay]
  );

  const handleManualToggle = useCallback(
    (checked: boolean | "indeterminate") => {
      const nextValue = checked === true;
      setIsManualDeposit(nextValue);
      if (nextValue) {
        setHandleDepositInput(maxDeposit || "0");
      }
    },
    [maxDeposit]
  );

  return {
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
  };
};
