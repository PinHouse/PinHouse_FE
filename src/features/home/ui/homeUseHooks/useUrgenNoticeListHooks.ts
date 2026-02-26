import { useRouter } from "next/navigation";
import { useRouteStore } from "@/src/features/home/model/homeStore";
import { useNoticeInfinite } from "@/src/entities/home/hooks/homeHooks";

export const useUrgentNoticeListRouterHooks = () => {
  const router = useRouter();
  const { setPrevPath } = useRouteStore();

  const pageRouter = () => {
    setPrevPath("/home");
    router.push("/listings?sortType=deadline");
  };

  return {
    pageRouter,
  };
};

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
