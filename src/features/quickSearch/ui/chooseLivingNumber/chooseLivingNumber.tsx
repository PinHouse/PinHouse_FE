"use client";

import { Button } from "@/src/shared/ui/button/deafult";
import { useQuickSearchStore } from "@/src/features/quickSearch/hooks/quickSearchStore";
import { cn } from "@/lib/utils";

const LIVING_NUMBER_OPTIONS = ["1명", "2명", "3명", "4명 이상"] as const;

const ChooseLivingNumber = () => {
  const { livingNumber, setLivingNumber } = useQuickSearchStore();

  return (
    <div className="flex flex-col gap-3">
      {LIVING_NUMBER_OPTIONS.map(option => {
        const isSelected = livingNumber === option;
        return (
          <Button
            key={option}
            variant={isSelected ? "quicksearch" : "outline"}
            size="lg"
            radius="sm"
            text="md"
            className={cn(
              "w-full justify-start",
              !isSelected &&
                "border-greyscale-grey-200 text-greyscale-grey-700 bg-greyscale-grey-50"
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
