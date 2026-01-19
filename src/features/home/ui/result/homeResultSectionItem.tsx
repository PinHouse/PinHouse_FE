import { cn } from "@/lib/utils";
import { SearchItem } from "@/src/widgets/homeSection";

interface HomeResultSectionItemsProps {
  items: SearchItem[];
  limit?: number;
}

export const HomeResultSectionItems = ({ items, limit = 5 }: HomeResultSectionItemsProps) => {
  return (
    <ul className="rounded-xl bg-white px-3">
      {items.slice(0, limit).map(item => (
        <li
          key={item.id}
          className={cn(
            "flex items-center justify-between gap-2 p-3",
            items.length === 1 ? "border-none" : "border-b"
          )}
        >
          <p className="line-clamp-1 text-sm">{item.title}</p>

          <span className="shrink-0 rounded bg-gray-100 px-2 py-[2px] text-xs text-gray-600">
            {item.supplyType}
          </span>
        </li>
      ))}
    </ul>
  );
};
