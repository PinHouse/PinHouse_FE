import { useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_DETAIL_SECTION,
  DETAIL_FILTERS,
  getAllFilterIcon,
  useDetailFilterSheetStore,
} from "../../../model";

import { TagButton } from "@/src/shared/ui/button/tagButton";
import { DownButton } from "@/src/assets/icons/button";

export const ListingsCardDetailFilterBar = () => {
  const router = useRouter();
  const openSheet = useDetailFilterSheetStore(state => state.openSheet);
  const searchParams = useSearchParams();

  const onOpenAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("section")) {
      params.set("section", DEFAULT_DETAIL_SECTION);
    }
    router.push(`?${params.toString()}`, { scroll: false });
    openSheet();
  };

  const onSelectSection = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", key);
    router.push(`?${params.toString()}`, { scroll: false });
    openSheet();
  };

  return (
    <section className="overflow-x-auto border-greyscale-grey-75 py-3 scrollbar-hide">
      <div className="flex min-w-max items-center gap-2 border-y border-b-[11px] border-y-gray-200 border-b-greyscale-grey-25 pb-2 pl-5 pr-5 pt-2">
        <div className="flex-shrink-0" onClick={onOpenAllFilters}>
          {getAllFilterIcon(false)}
        </div>

        {DETAIL_FILTERS.map(item => (
          <TagButton
            key={item.key}
            size="sm"
            variant={"ghost"}
            className="h-9 gap-1 rounded-3xl"
            onClick={() => onSelectSection(item.key)}
          >
            <div className="flex gap-1 text-sm font-bold text-gray-500">
              <p>{item.label}</p>
              {/* <p className="text-text-brand">{count === 0 ? null : count}</p> */}
            </div>
            <div className="mr-[-5px] flex shrink-0">
              <DownButton className="h-5 w-4" />
            </div>
          </TagButton>
        ))}
      </div>
    </section>
  );
};
