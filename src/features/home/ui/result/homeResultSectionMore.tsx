import { DownButton, UpButton } from "@/src/assets/icons/button";
import { SearchCategory } from "@/src/entities/home/model/type";

interface HomeResultSectionMoreProps {
  onToggle: (category: SearchCategory) => void;
  category: SearchCategory;
  canLoadMore?: boolean; // undefined 가능
  isFetchingNextPage: boolean;
  nextPage: boolean;
}

export const HomeResultSectionMore = ({
  category,
  canLoadMore,
  onToggle,
  nextPage,
  isFetchingNextPage,
}: HomeResultSectionMoreProps) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(category)}
      disabled={!canLoadMore || isFetchingNextPage}
      className="flex w-full items-center justify-center gap-1 rounded-b-xl bg-white p-3 text-xs text-gray-400"
    >
      {canLoadMore ? (
        <>
          <p>{"더보기"}</p>
          <span className="rotate-180 transition-transform">
            {nextPage ? <UpButton width={15} height={15} /> : <DownButton width={15} height={15} />}
          </span>
        </>
      ) : (
        <p>{"데이터가 없습니다."}</p>
      )}
    </button>
  );
};
