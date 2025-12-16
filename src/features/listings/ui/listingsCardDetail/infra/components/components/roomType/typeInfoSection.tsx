import { LeftButton } from "@/src/assets/icons/button";

type TypeInfoSectionProps = {
  onPrev: () => void;
  onNext: () => void;
};

export const TypeInfoSection = ({ onPrev, onNext }: TypeInfoSectionProps) => {
  return (
    <>
      <button
        aria-label="이전 타입"
        onClick={onPrev}
        // className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
      >
        <LeftButton className="size-5" />
      </button>
      <button
        aria-label="다음 타입"
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
      >
        <LeftButton className="size-5 rotate-180" />
      </button>
    </>
  );
};
