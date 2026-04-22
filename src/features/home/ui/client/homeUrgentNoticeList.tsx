"use client";

import { cn } from "@/lib/utils";
import { LeftButton } from "@/src/assets/icons/button";
import { HomeContentsCard } from "@/src/features/home/ui/client/homeContentsCard";
import { ListingNoSearchResult } from "@/src/features/listings";
import { Button } from "@/src/shared/lib/headlessUi";
import {
  useUrgentNoticeListHooks,
  useUrgentNoticeListRouterHooks,
} from "@/src/features/home/ui/homeUseHooks";

export const UrgentNoticeListClient = () => {
  const { contents, dataCount, isFetchingNextPage, isError, fetchNextPage } =
    useUrgentNoticeListHooks();
  const { pageRouter } = useUrgentNoticeListRouterHooks();
  const hasContent = !dataCount;

  return (
    <section className={cn("flex flex-col")}>
      <div className="flex items-center justify-between pt-4">
        <div>
          <p className="mb-3 text-lg font-bold text-greyscale-grey-900">
            {hasContent ? "마감임박 공고" : "공지 리스트"}
          </p>
        </div>
        <div
          className="min-w-auto hover: flex items-center text-xs font-semibold text-greyscale-grey-400 hover:cursor-pointer"
          onClick={pageRouter}
        >
          <span>전체보기</span>
          <LeftButton width={15} height={15} className="rotate-180" />
        </div>
      </div>

      <div className="flex flex-col">
        {hasContent ? (
          <HomeContentsCard data={contents} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center pb-[24px]">
            <ListingNoSearchResult
              text={
                "조건에 맞는 공고를 찾지 못했어요. <br />핀포인트를 변경하거나 전체 공고를 확인해보세요."
              }
            />
          </div>
        )}

        <div className="relative z-10 -mt-12 flex justify-center">
          <button
            type="button"
            onClick={pageRouter}
            className="text-mainBlue text-sm font-semibold"
          >
            공고리스트로 이동하기
          </button>
        </div>
      </div>

      {isFetchingNextPage && <div className="text-center text-sm text-gray-400">불러오는 중..</div>}

      {isError && (
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <div>
            <ListingNoSearchResult
              text={
                "정보를 가져오지 못했어요 <br />네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요."
              }
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="solid"
              size="sm"
              theme="mainBlue"
              onClick={() => fetchNextPage()}
              className="px-5"
            >
              다시하기
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};
