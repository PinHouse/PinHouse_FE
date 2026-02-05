import { Button } from "@/src/shared/lib/headlessUi";
import { cn } from "@/lib/utils";

type PinpointSelectedButtonType = {
  mode: "pinpoints" | "maxTime";
  handleSetPinpoint: () => void;
};

export const PinpointSelectedButton = ({ mode, handleSetPinpoint }: PinpointSelectedButtonType) => {
  return (
    <div className="flex gap-3">
      <Button
        className={cn(
          "flex-1 border-greyscale-grey-100 bg-white text-sm font-medium text-gray-800",
          mode === "maxTime" ? "hidden" : "block"
        )}
        variant="outline"
        radius="sm"
        onClick={handleSetPinpoint}
      >
        핀포인트 설정
      </Button>
      <Button className="flex-1 bg-[#2E2A3B] text-sm font-medium text-white" radius="sm">
        저장하기
      </Button>
    </div>
  );
};
