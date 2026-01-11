import { cn } from "@/lib/utils";
import { useNoticeInfinite } from "@/src/entities/home/hooks/homeHooks";
import { HomeContentsCard } from "@/src/features/home";
import { ListingNoSearchResult } from "@/src/features/listings";
import { Button } from "@/src/shared/lib/headlessUi";
import Link from "next/link";

export const UrgentNoticeList = () => {
  const { data, isFetchingNextPage, isError, hasNextPage, fetchNextPage } = useNoticeInfinite();
  const contents = data?.pages?.flatMap(page => page.content) ?? [];

  return (
    <section className={cn("flex flex-col", contents.length >= 2 ? "pb-[55px]" : "")}>
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-3 text-lg font-bold text-greyscale-grey-900">마감임박 공고</p>
        </div>
        <Link href="/listings" className="text-xs font-semibold text-primary-blue-300">
          전체보기
        </Link>
      </div>

      <div className="flex flex-col">
        <HomeContentsCard data={contents} />
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

      {/* {!hasNextPage && !isError && data && (
        <div className="mt-1 text-center text-sm text-gray-400">더 이상 데이터가 없습니다.</div>
      )} */}
    </section>
  );
};
