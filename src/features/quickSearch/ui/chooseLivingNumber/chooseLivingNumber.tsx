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
        const isSelected = livingNumber === Number(option.replace("명 이상", "").replace("명", ""));
        return (
          <Button
            key={option}
            variant="solid"
            theme="mainBlue"
            size="lg"
            radius="sm"
            className={cn(
              "h-[3.625rem] justify-start rounded-lg bg-greyscale-grey-50 pl-5 text-greyscale-grey-700 hover:bg-primary-blue-300 hover:text-white",
              isSelected &&
                "bg-primary-blue-300 text-white hover:bg-primary-blue-300 hover:text-white"
            )}
            onClick={() =>
              setLivingNumber(
                isSelected ? 0 : Number(option.replace("명 이상", "").replace("명", ""))
              )
            }
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};

export default ChooseLivingNumber;
