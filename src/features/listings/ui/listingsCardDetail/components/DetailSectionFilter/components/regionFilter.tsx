import { REGION_CHECKBOX } from "@/src/features/listings/model";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";

export const RegionFilter = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full gap-4">
        {REGION_CHECKBOX.map(item => (
          <label className="flex cursor-pointer items-center gap-2" key={item.key}>
            <Checkbox />
            <span className="text-sm">{item.value}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
