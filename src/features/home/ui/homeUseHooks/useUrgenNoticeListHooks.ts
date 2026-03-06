import { useRouter } from "next/navigation";
import { useRouteStore } from "@/src/features/home/model/homeStore";
import { useNoticeInfinite } from "@/src/entities/home/hooks/homeHooks";

/**
 * @returns 긴급 공고 더보기 이동 라우터 핸들러
 */
export const useUrgentNoticeListRouterHooks = () => {
  const router = useRouter();
  const { setPrevPath } = useRouteStore();

  /** @description 이전 경로를 홈으로 저장 후 마감임박 목록으로 이동 */
  const pageRouter = () => {
    setPrevPath("/home");
    router.push("/listings?sortType=deadline");
  };

  return {
    pageRouter,
  };
};

/**
 * @returns 긴급 공고 리스트 조회 상태 및 페이징 핸들러
 */
export const useUrgentNoticeListHooks = () => {
  const { data, isFetchingNextPage, isError, fetchNextPage } = useNoticeInfinite();
  const contents = data?.pages?.flatMap(page => page.content) ?? [];
  const dataCount = contents.length === 0;

  return {
    data,
    contents,
    dataCount,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  };
};
