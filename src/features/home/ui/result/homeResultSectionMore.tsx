import { DownButton } from "@/src/assets/icons/button";

interface HomeResultSectionMoreProps {
  total: number;
  limit: number;
}

export const HomeResultSectionMore = ({ total, limit }: HomeResultSectionMoreProps) => {
  if (total <= limit) return null;

  return (
    <button className="flex w-full items-center justify-center rounded-b-xl bg-white p-3 text-center text-xs text-gray-400">
      <p>더보기</p>
      <span>
        <DownButton width={15} height={15} />
      </span>
    </button>
  );
};
