import { DownButton } from "@/src/assets/icons/button";
import { SearchCategory } from "@/src/entities/home/model/type";

interface HomeResultSectionMoreProps {
  expanded: boolean;
  onToggle: (category: SearchCategory) => void;
  category: SearchCategory;
  hasNextPage?: boolean; // undefined 가능
}

export const HomeResultSectionMore = ({
  category,
  expanded,
  onToggle,
  hasNextPage,
}: HomeResultSectionMoreProps) => {
  // // 아직 펼쳐지지 않았다면 버튼 자체를 숨김
  // if (!expanded) return null;

  return (
    <button
      type="button"
      onClick={() => onToggle(category)}
      className="flex w-full items-center justify-center gap-1 rounded-b-xl bg-white p-3 text-xs text-gray-400"
    >
      {hasNextPage ? (
        <>
          <p>{"더보기"}</p>
          <span className="rotate-180 transition-transform">
            <DownButton width={15} height={15} />
          </span>
        </>
      ) : (
        <p>{"데이터가 없습니다."}</p>
      )}
    </button>
  );
};
