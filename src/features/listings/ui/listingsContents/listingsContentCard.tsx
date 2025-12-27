"use client";
import { ListingUnion } from "@/src/entities/listings/model/type";
import { ListingBookMark } from "./listingsBookMark";
import { HighlightCenteredText, HouseICons, HouseRental } from "../../hooks/listingsHooks";
import { formatApplyPeriod } from "@/src/shared/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { normalizeListing } from "../../model";

export const ListingContentsCard = <T extends ListingUnion>({ data }: { data: T[] }) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";
  const router = useRouter();

  const handleRouter = (id: string) => {
    router.push(`/listings/${id}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {data?.map(item => {
        const normalized = normalizeListing(item);

        return (
          <div
            key={normalized.id}
            className="flex h-[112px] min-h-[100px] w-full rounded-xl border"
          >
            <div className="border-r-1 flex w-[35%] flex-col rounded-l-xl rounded-bl-xl bg-bgColor-mute pl-1 pt-2">
              <div className="flex justify-start gap-1">
                <ListingBookMark item={normalized.type} border="border" />
                <p className="truncate text-xs font-semibold text-greyscale-grey-800">
                  {normalized.supplier}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <HouseICons {...normalized} />
              </div>
            </div>

            <div className="flex w-[65%] flex-col justify-start gap-2 pb-3 pl-4 pr-4 pt-2">
              <div className="flex items-baseline gap-2">
                <HouseRental {...normalized} />
              </div>
              <div className="max-w-full">
                <p
                  className="truncate text-sm font-semibold"
                  onClick={() => handleRouter(normalized.id)}
                >
                  <HighlightCenteredText text={normalized.name} keyword={keyword} />
                </p>
              </div>
              <div className="max-w-full">
                <p className="text-sm text-greyscale-grey-400">모집일정</p>
                <p className="text-sm text-greyscale-grey-400">
                  {formatApplyPeriod(normalized.applyPeriod)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
