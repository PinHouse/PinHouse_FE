"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/src/shared/ui/input/deafult";
import { formatNumber, formatToKorean } from "@/src/shared/lib/numberFormat";

interface ChooseBudgetProps {
  className?: string;
  onDepositChange?: (value: string) => void;
  onRentChange?: (value: string) => void;
}

const ChooseBudget = ({ className, onDepositChange, onRentChange }: ChooseBudgetProps) => {
  const [depositValue, setDepositValue] = useState<string>("");
  const [rentValue, setRentValue] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<"deposit" | "rent" | null>(null);

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
    <div className={cn("flex w-full flex-col pt-10", className)}>
      <div className="flex flex-col">
        <h3 className="text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-900">
          보증금 최대 금액
        </h3>
        <div className="mt-3 flex flex-col gap-1.5">
          <Input
            type="text"
            inputMode="numeric"
            value={formatNumber(depositValue)}
            onChange={handleDepositChange}
            onFocus={() => setFocusedInput("deposit")}
            onBlur={() => setFocusedInput(null)}
            placeholder="0"
            className={cn(
              "h-12 rounded-lg py-3 pl-5 text-base font-medium leading-[140%] tracking-[-0.01em]",
              focusedInput === "deposit"
                ? "border-[1.5px] border-primary-blue-300"
                : "border-greyscale-grey-75",
              depositValue ? "text-black" : "text-greyscale-grey-300"
            )}
          />
          <p className="pl-5 text-xs font-medium leading-[140%] text-greyscale-grey-500">
            {formatToKorean(depositValue)}
          </p>
        </div>
        <div className="mt-[1.75rem] grid grid-cols-4 gap-3">
          <button
            onClick={() => addToDeposit(1000000)}
            className="hover:bg-primary-blue-100 flex h-8 items-center justify-center rounded-lg bg-primary-blue-25 py-1.5 text-sm font-medium leading-[140%] text-primary-blue-300 transition-colors"
          >
            +1백
          </button>
          <button
            onClick={() => addToDeposit(5000000)}
            className="hover:bg-primary-blue-100 flex h-8 items-center justify-center rounded-lg bg-primary-blue-25 py-1.5 text-sm font-medium leading-[140%] text-primary-blue-300 transition-colors"
          >
            +5백
          </button>
          <button
            onClick={() => addToDeposit(10000000)}
            className="hover:bg-primary-blue-100 flex h-8 items-center justify-center rounded-lg bg-primary-blue-25 py-1.5 text-sm font-medium leading-[140%] text-primary-blue-300 transition-colors"
          >
            +1천
          </button>
          <button
            onClick={() => addToDeposit(50000000)}
            className="hover:bg-primary-blue-100 flex h-8 items-center justify-center rounded-lg bg-primary-blue-25 py-1.5 text-sm font-medium leading-[140%] text-primary-blue-300 transition-colors"
          >
            +5천
          </button>
        </div>
      </div>
      {/* Border */}
      <div className="-mx-5 my-10 h-[3px] border-t border-greyscale-grey-50" />

      {/* 월 임대료 최대 금액 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-900">
          월 임대료 최대 금액
        </h3>
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
              "h-12 rounded-lg py-3 pl-5 text-base font-medium leading-[140%] tracking-[-0.01em]",
              focusedInput === "rent"
                ? "border-[1.5px] border-primary-blue-300"
                : "border-greyscale-grey-75",
              rentValue ? "text-black" : "text-greyscale-grey-300"
            )}
          />
          <p className="pl-5 text-xs font-medium leading-[140%] text-greyscale-grey-500">
            {formatToKorean(rentValue)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseBudget;
