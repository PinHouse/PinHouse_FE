import { Particle } from "./particle";
import { PinCircle } from "./pinCircle";

export const PinCelebration = () => {
  return (
    <div className="relative h-[200px] w-[220px]">
      <Particle className="absolute inset-0" width={220} height={200} />
      <div className="absolute inset-0 flex items-center justify-center">
        <PinCircle />
      </div>
    </div>
  );
};
