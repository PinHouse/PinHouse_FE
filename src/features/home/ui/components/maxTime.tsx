import { Slider } from "@/src/shared/ui/slider";
import { useHomeMaxTime } from "../../model/homeStore";

export const MaxTimeSliderBox = () => {
  const { maxTime, setMaxTime } = useHomeMaxTime();

  const onSliderValueChange = (values: number[]) => {
    const [nextValue] = values;
    if (typeof nextValue === "number") {
      setMaxTime(nextValue);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between px-4 py-8">
      <div>
        <p className="mb-4 text-base text-gray-700">
          핀포인트로부터 <span className="font-semibold text-blue-600">{maxTime}분 이내</span>
        </p>

        <div className="mb-2">
          <Slider
            min={0}
            max={120}
            step={10}
            labelSuffix="분"
            value={[maxTime]}
            onValueChange={onSliderValueChange}
          />
        </div>
      </div>
    </div>
  );
};
