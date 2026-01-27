import { SearchCategory } from "@/src/entities/home/model/type";
import { SEARCH_CATEGORY_CONFIG } from "../../hooks/hooks";

interface HomeResultSectionHeaderProps {
  category: SearchCategory;
  count: number;
}

export const HomeResultSectionHeader = ({ category, count }: HomeResultSectionHeaderProps) => {
  if (!category) return null;
  const config = SEARCH_CATEGORY_CONFIG[category];

  return (
    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
      <span>{config.icon}</span>
      <span>{config.label}</span>
      <span className="text-gray-400">{count}</span>
    </div>
  );
};
