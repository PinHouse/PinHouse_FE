"use client";

import { useQuickSearchStore } from "@/src/features/quickSearch/hooks/quickSearchStore";
import { cn } from "@/lib/utils";
import { Button } from "@/src/shared/lib/headlessUi";

const LIVING_NUMBER_OPTIONS = ["1명", "2명", "3명", "4명 이상"] as const;

const ChooseLivingNumber = () => {
  const { livingNumber, setLivingNumber } = useQuickSearchStore();

  return (
    <div className="flex flex-col gap-2">
      {LIVING_NUMBER_OPTIONS.map(option => {
        const isSelected = livingNumber === option;
        return (
          <Button
            key={option}
            variant={"outline"}
            size="lg"
            radius="sm"
            theme="grey"
            className={cn(
              "h-[3.625rem] justify-start border-none bg-greyscale-grey-50 py-[1.3125rem] leading-4 tracking-[-0.01em] text-greyscale-grey-700 hover:bg-greyscale-grey-50",
              isSelected &&
                "bg-primary-blue-300 text-white hover:bg-primary-blue-300 hover:text-white"
            )}
            onClick={() => setLivingNumber(isSelected ? null : option)}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};

export default ChooseLivingNumber;
