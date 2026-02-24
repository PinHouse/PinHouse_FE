import { cn } from "@/lib/utils";

import { HomeBgBookMark } from "./components/HomeBgBookMark";
import { GlobalSearchItem } from "@/src/entities/home/model/type";
import { HighlightCenteredText } from "@/src/features/listings/hooks/listingsHooks";

interface HomeResultSectionItemsProps {
  items: GlobalSearchItem[];
  limit?: number;
  q: string;
}

export const HomeResultSectionItems = ({ items, limit = 5, q }: HomeResultSectionItemsProps) => {
  return (
    <ul className="rounded-xl bg-white px-3">
      {items.slice(0, limit).map((item, index) => (
        <li
          key={item.id + index}
          className={cn(
            "flex items-center justify-between gap-2 p-3",
            items.length === 1 ? "border-none" : "border-b"
          )}
        >
          <div className="max-w-full">
            <p className="line-clamp-1 text-sm">
              <HighlightCenteredText text={item.title} keyword={q} range={30} />
            </p>
          </div>

          <HomeBgBookMark supplyType={item.supplyType} />
        </li>
      ))}
    </ul>
  );
};
