import { TagButton } from "@/src/shared/ui/button/tagButton";
import { DETAIL_FILTERS, getAllFilterIcon } from "../../../model";
import { ListingTagButton } from "../../listingsButton/listingsTagButton";

export const ListingsCardDetailFilterBar = () => {
  return (
    <section className="overflow-x-auto border-greyscale-grey-75 py-3 scrollbar-hide">
      <div className="flex min-w-max items-center gap-2 border-y border-b-[11px] border-y-gray-200 border-b-greyscale-grey-25 pb-2 pl-5 pr-5 pt-2">
        {getAllFilterIcon(false)}
        {DETAIL_FILTERS.map(item => (
          <div key={item.key} className="flex-shrink-0">
            <ListingTagButton label={item} count={null} />
          </div>
        ))}
      </div>
    </section>
  );
};
