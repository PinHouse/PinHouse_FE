"use client";
import { cn } from "@/lib/utils";
import { LeftButton } from "@/src/assets/icons/button";
import { useNoticeInfinite } from "@/src/entities/home/hooks/homeHooks";
import { HomeContentsCard } from "@/src/features/home";
import { ListingNoSearchResult, ListingsContent } from "@/src/features/listings";
import { Button } from "@/src/shared/lib/headlessUi";
import { useRouteStore } from "../model/homeStore";
import { useRouter } from "next/navigation";
import { useListingsFilterStore } from "../../listings/model";

export const UrgentNoticeList = () => {
  const { data, isFetchingNextPage, isError, fetchNextPage } = useNoticeInfinite();
  const contents = data?.pages?.flatMap(page => page.content) ?? [];
  const dataCount = contents.length === 0;
  const region = data?.pages?.flatMap(page => page.region) ?? [];
  const { setSortType } = useListingsFilterStore();
  const router = useRouter();
  const { setPrevPath } = useRouteStore();

  const pageRouter = () => {
    setPrevPath("/home");
    setSortType("마감임박순");
    router.push("/listings");
  };

  return (
    // <section className={cn("flex flex-col", contents.length >= 2 ? "pb-[55px]" : "")}>
    <section className={cn("flex flex-col")}>
      <div className="flex items-center justify-between pt-4">
        <div>
          <p className="mb-3 text-lg font-bold text-greyscale-grey-900">
            {isError || dataCount ? "공고 리스트" : "마감임박 공고"}
          </p>
        </div>
        <div
          className="min-w-auto flex items-center text-xs font-semibold text-greyscale-grey-400"
          onClick={pageRouter}
        >
          <span>전체보기</span>
          {/* <span>{region}</span> */}
          <LeftButton width={15} height={15} className="rotate-180" />
        </div>
      </div>

      <div className="flex flex-col">
        {isError || dataCount ? (
          <ListingsContent viewSet={false} />
        ) : (
          <HomeContentsCard data={contents} />
        )}
      </div>

      {isFetchingNextPage && (
        <div className="text-center text-sm text-gray-400">불러오는 중...</div>
      )}

      {isError && (
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <div>
            <ListingNoSearchResult text="정보를 가져오지 못했어요 <br /> 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요." />
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="solid"
              size="sm"
              theme="mainBlue"
              onClick={() => fetchNextPage()}
              className="px-5"
            >
              재시도
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};
