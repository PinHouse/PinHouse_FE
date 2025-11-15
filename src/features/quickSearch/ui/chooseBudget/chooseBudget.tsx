"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/src/shared/ui/input/deafult";

interface ChooseBudgetProps {
  className?: string;
  onDepositChange?: (value: string) => void;
  onRentChange?: (value: string) => void;
}

const ChooseBudget = ({ className, onDepositChange, onRentChange }: ChooseBudgetProps) => {
  const [depositValue, setDepositValue] = useState<string>("");
  const [rentValue, setRentValue] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<"deposit" | "rent" | null>(null);

  // 숫자를 3자리마다 쉼표로 포맷
  const formatNumber = (value: string): string => {
    if (!value) return "";
    return Number(value).toLocaleString("ko-KR");
  };

  // 숫자를 한글로 변환
  const formatToKorean = (value: string): string => {
    if (!value) return "";
    const num = Number(value);
    if (num === 0) return "";

    const units = ["", "만", "억", "조"];
    const result: string[] = [];

    let tempNum = num;
    let unitIndex = 0;

    while (tempNum > 0) {
      const part = tempNum % 10000;
      if (part > 0) {
        result.unshift(`${part.toLocaleString("ko-KR")}${units[unitIndex]}`);
      }
      tempNum = Math.floor(tempNum / 10000);
      unitIndex++;
    }

    return result.join(" ") + "원";
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setDepositValue(value);
    onDepositChange?.(value);
  };

  const handleRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setRentValue(value);
    onRentChange?.(value);
  };

  const addToDeposit = (amount: number) => {
    const newValue = String(Number(depositValue || "0") + amount);
    setDepositValue(newValue);
    onDepositChange?.(newValue);
  };

  const addToRent = (amount: number) => {
    const newValue = String(Number(rentValue || "0") + amount);
    setRentValue(newValue);
    onRentChange?.(newValue);
  };

  return (
    <div className={cn("flex w-full flex-col", className)}>
      {/* 보증금 최대 금액 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-greyscale-grey-900">보증금 최대 금액</h3>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            inputMode="numeric"
            value={formatNumber(depositValue)}
            onChange={handleDepositChange}
            onFocus={() => setFocusedInput("deposit")}
            onBlur={() => setFocusedInput(null)}
            placeholder="0"
            className={cn(
              "h-auto rounded-2xl px-6 py-5 text-4xl font-bold",
              focusedInput === "deposit"
                ? "border-[1.5px] border-primary-blue-300"
                : "border-greyscale-grey-75",
              depositValue ? "text-greyscale-grey-900" : "text-greyscale-grey-300"
            )}
          />
          <p className="text-greyscale-grey-400 px-2 text-xl font-normal">
            {formatToKorean(depositValue)}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => addToDeposit(1000000)}
            className="bg-primary-blue-50 hover:bg-primary-blue-100 rounded-xl px-6 py-4 text-xl font-semibold text-primary-blue-500 transition-colors"
          >
            +1백
          </button>
          <button
            onClick={() => addToDeposit(5000000)}
            className="bg-primary-blue-50 hover:bg-primary-blue-100 rounded-xl px-6 py-4 text-xl font-semibold text-primary-blue-500 transition-colors"
          >
            +5백
          </button>
          <button
            onClick={() => addToDeposit(10000000)}
            className="bg-primary-blue-50 hover:bg-primary-blue-100 rounded-xl px-6 py-4 text-xl font-semibold text-primary-blue-500 transition-colors"
          >
            +1천
          </button>
          <button
            onClick={() => addToDeposit(50000000)}
            className="bg-primary-blue-50 hover:bg-primary-blue-100 rounded-xl px-6 py-4 text-xl font-semibold text-primary-blue-500 transition-colors"
          >
            +5천
          </button>
        </div>
      </div>

      {/* Border */}
      <div className="bg-greyscale-grey-25 h-2 self-stretch border-t border-greyscale-grey-50" />

      {/* 월 임대료 최대 금액 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-greyscale-grey-900">월 임대료 최대 금액</h3>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            inputMode="numeric"
            value={formatNumber(rentValue)}
            onChange={handleRentChange}
            onFocus={() => setFocusedInput("rent")}
            onBlur={() => setFocusedInput(null)}
            placeholder="0"
            className={cn(
              "h-auto rounded-2xl px-6 py-5 text-4xl font-bold",
              focusedInput === "rent"
                ? "border-[1.5px] border-primary-blue-300"
                : "border-greyscale-grey-75",
              rentValue ? "text-greyscale-grey-900" : "text-greyscale-grey-300"
            )}
          />
          <p className="text-greyscale-grey-400 px-2 text-xl font-normal">
            {formatToKorean(rentValue)}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => addToRent(100000)}
            className="bg-primary-blue-50 hover:bg-primary-blue-100 rounded-xl px-6 py-4 text-xl font-semibold text-primary-blue-500 transition-colors"
          >
            +10만
          </button>
          <button
            onClick={() => addToRent(200000)}
            className="bg-primary-blue-50 hover:bg-primary-blue-100 rounded-xl px-6 py-4 text-xl font-semibold text-primary-blue-500 transition-colors"
          >
            +20만
          </button>
          <button
            onClick={() => addToRent(300000)}
            className="bg-primary-blue-50 hover:bg-primary-blue-100 rounded-xl px-6 py-4 text-xl font-semibold text-primary-blue-500 transition-colors"
          >
            +30만
          </button>
          <button
            onClick={() => addToRent(500000)}
            className="bg-primary-blue-50 hover:bg-primary-blue-100 rounded-xl px-6 py-4 text-xl font-semibold text-primary-blue-500 transition-colors"
          >
            +50만
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseBudget;
