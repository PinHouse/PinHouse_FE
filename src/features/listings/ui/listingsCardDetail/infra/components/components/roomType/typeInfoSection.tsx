import { cn } from "@/lib/utils";
import { LeftButton } from "@/src/assets/icons/button";

type TypeInfoSectionProps = {
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
  currentIndex: number;
};

export const TypeInfoSection = ({ onPrev, onNext, isLast, currentIndex }: TypeInfoSectionProps) => {
  return (
    <>
      <button
        aria-label="이전 타입"
        onClick={onPrev}
        disabled={currentIndex === 0}
        // className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
        className="absolute left-2 top-1/2 -translate-y-1/2"
      >
        <LeftButton
          className={cn(
            "size-5",
            currentIndex === 0 ? "text-greyscale-grey-200" : "text-greyscale-grey-900"
          )}
        />
      </button>
      <button
        aria-label="다음 타입"
        onClick={onNext}
        disabled={!isLast}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        <LeftButton
          className={cn(
            "size-5 rotate-180",
            isLast ? "text-greyscale-grey-900" : "text-greyscale-grey-200"
          )}
        />
      </button>
    </>
  );
};
