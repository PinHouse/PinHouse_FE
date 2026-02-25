import { useCallback, useMemo } from "react";
import { useGlobalPageNation } from "@/src/entities/home/hooks/homeHooks";
import { GlobalSearchItem, SearchCategory } from "@/src/entities/home/model/type";

type UseHomeResultsDataProps = {
  category: SearchCategory;
  q: string;
  items: GlobalSearchItem[];
  isExpanded: boolean;
};

export const useHomeResultsData = ({ category, q, items, isExpanded }: UseHomeResultsDataProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGlobalPageNation<GlobalSearchItem>({
      q,
      category,
      enabled: isExpanded,
    });

  const serverItems = useMemo<GlobalSearchItem[]>(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => (Array.isArray(page.content) ? page.content : []));
  }, [data]);

  const visibleItems = useMemo(
    () => (isExpanded ? [...items, ...serverItems] : items),
    [isExpanded, items, serverItems]
  );

  return {
    visibleItems,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

type UseHomeResultToggleProps = {
  category: SearchCategory;
  isExpanded: boolean;
  setExpandedCategory: (category: SearchCategory | null) => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

export const useHomeResultToggle = ({
  category,
  isExpanded,
  setExpandedCategory,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseHomeResultToggleProps) => {
  const onToggle = useCallback(async () => {
    if (!isExpanded) {
      setExpandedCategory(category);
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
      return;
    }

    // setExpandedCategory(null);
  }, [isExpanded, setExpandedCategory, category, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { onToggle };
};
