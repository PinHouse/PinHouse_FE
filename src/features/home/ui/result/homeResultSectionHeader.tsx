import { SEARCH_CATEGORY_CONFIG, SearchCategory } from "@/src/widgets/homeSection";

interface HomeResultSectionHeaderProps {
  category: SearchCategory;
  count: number;
}

export const HomeResultSectionHeader = ({ category, count }: HomeResultSectionHeaderProps) => {
  const config = SEARCH_CATEGORY_CONFIG[category];

  return (
    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
      <span>{config.icon}</span>
      <span>{config.label}</span>
      <span className="text-gray-400">{count}</span>
    </div>
  );
};
