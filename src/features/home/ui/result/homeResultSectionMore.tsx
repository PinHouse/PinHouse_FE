import { DownButton } from "@/src/assets/icons/button";

interface HomeResultSectionMoreProps {
  total: number;
  limit: number;
  expanded: boolean;
  onToggle: (category: string) => void;
  category: string;
}

export const HomeResultSectionMore = ({
  total,
  limit,
  category,
  expanded,
  onToggle,
}: HomeResultSectionMoreProps) => {
  // 필요하면 다시 활성화
  // if (total <= limit) return null;

  return (
    <button
      onClick={() => onToggle(category)}
      className="flex w-full items-center justify-center gap-1 rounded-b-xl bg-white p-3 text-xs text-gray-400"
    >
      <p>{expanded ? "접기" : "더보기"}</p>
      <span className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
        <DownButton width={15} height={15} />
      </span>
    </button>
  );
};
