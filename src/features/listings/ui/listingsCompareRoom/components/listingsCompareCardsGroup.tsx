import { UnitType } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { SheetState } from "../../../model";

type GroupUnit = {
  group: UnitType["group"];
};

export const ListingCompareCardGroup = ({ group }: GroupUnit) => {
  const visibleTags = group.slice(0, 2);
  const hiddenCount = group.length - visibleTags.length;

  return (
    <div className="group relative flex max-w-[85%] flex-wrap gap-1">
      {visibleTags.map(item => (
        <TagButton
          key={item}
          size="xxs"
          variant="ghost"
          className="rounded-md border bg-white text-xs font-bold text-greyscale-grey-400"
        >
          {item}
        </TagButton>
      ))}

      {hiddenCount > 0 && (
        <span className="cursor-default rounded-md border bg-white px-2 text-xs font-medium text-greyscale-grey-500">
          +{hiddenCount}
        </span>
      )}

      {hiddenCount > 0 && (
        <div className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden w-max max-w-[240px] rounded-md border bg-white p-2 shadow-lg group-hover:block">
          <div className="flex flex-wrap gap-1">
            {group.map(item => (
              <TagButton
                key={item}
                size="xxs"
                variant="ghost"
                className="rounded-md border bg-white text-xs font-bold text-greyscale-grey-400"
              >
                {item}
              </TagButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
