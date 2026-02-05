import { Skeleton } from "@/src/shared/ui/skeleton/skeleton";

const ITEMS = 3;

export const PinpointRowBoxSkeleton = () => {
  return (
    <div className="flex flex-col pt-4">
      <ul className="flex flex-col divide-y">
        {Array.from({ length: ITEMS }).map((_, index) => (
          <li key={index} className="p-2">
            <div className="mb-1 flex min-h-[22px] items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <Skeleton className="mb-2 h-4 w-3/4" />
          </li>
        ))}
      </ul>
    </div>
  );
};
