import { Skeleton } from "@/src/shared/ui/skeleton/skeleton";

export const ListingCompareCardSkeleton = () => {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-white p-3">
      <Skeleton className="mb-3 h-[140px] w-full rounded-lg" />

      <Skeleton className="mb-2 h-3 w-1/4" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-1 h-3 w-full" />
      <Skeleton className="mb-1 h-3 w-2/3" />

      <div className="mt-auto flex gap-1">
        <Skeleton className="h-5 w-12 rounded-md" />
        <Skeleton className="h-5 w-12 rounded-md" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>
    </article>
  );
};
