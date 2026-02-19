"use client";
import { ListingUnion } from "@/src/entities/listings/model/type";
import { ListingBookMark } from "./listingsBookMark";
import { HighlightCenteredText, HouseICons, HouseRental } from "../../hooks/listingsHooks";
import { formatApplyPeriod } from "@/src/shared/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { normalizeListing } from "../../model";

export const ListingContentsCard = <T extends ListingUnion>({ data }: { data: T[] }) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";
  const router = useRouter();
  const path = usePathname().includes("/search");

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
            className="active: flex h-[112px] min-h-[100px] w-full rounded-xl border bg-blue-50 hover:cursor-pointer"
            onClick={() => handleRouter(normalized.id)}
          >
            <div className="border-r-1 flex w-[35%] flex-col rounded-l-xl rounded-bl-xl bg-bgColor-mute pl-1 pt-2">
              <div className="flex min-w-0 items-center gap-2">
                <ListingBookMark item={normalized.type} border="border" />
                <p className="min-w-0 flex-1 truncate text-xs font-semibold text-greyscale-grey-800">
                  {normalized.supplier}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <HouseICons {...normalized} />
              </div>
            </div>

            <div className="flex w-[65%] flex-col gap-2 rounded-br-xl rounded-tr-xl bg-white py-3 pl-4 pr-[10px]">
              <div onClick={e => e.stopPropagation()}>
                <HouseRental
                  {...normalized}
                  query={path ? "listingSearchInfinite" : "listingListInfinite"}
                />
              </div>

              <div className="max-w-full">
                <p className="truncate text-sm font-semibold leading-tight">
                  <HighlightCenteredText text={normalized.name} keyword={keyword} />
                </p>
              </div>

              <div className="max-w-full">
                <p className="text-sm leading-tight text-greyscale-grey-400">모집일정</p>
                <p className="text-sm leading-tight text-greyscale-grey-400">
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
