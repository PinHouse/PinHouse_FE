import { cn } from "@/lib/utils";
import { useListingDetailNoticeSheet } from "@/src/entities/listings/hooks/useListingDetailSheetHooks";
import { DistrictResponse } from "@/src/entities/listings/model/type";
import {
  REGION_CHECKBOX,
  useListingDetailCountStore,
  useListingDetailFilter,
} from "@/src/features/listings/model";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ListingCardDetailOut } from "@/src/features/listings/ui/listingsCardDetail/button/button";

export const RegionFilter = () => {
  const { id } = useParams() as { id: string };
  const regionType = useListingDetailFilter(state => state.region);
  const setRegion = useListingDetailFilter(state => state.toggleRegionType);
  const { filteredCount } = useListingDetailCountStore();
  const { data } = useListingDetailNoticeSheet<DistrictResponse>({
    id: id,
    url: "districts",
  });
  const districts = data?.districts;
  const onTagValueChange = (region: string) => {
    setRegion(region);
  };

  if (!districts) return <Spinner title="지역 탐색중..." description="잠시만 기다려주세요" />;
  return (
    <div className="flex h-full flex-col gap-5 overflow-hidden">
      <div className="-mx-5 border-b pb-3">
        <div className="flex w-full gap-4 px-5">
          {REGION_CHECKBOX.map(item => (
            <label key={item.key} className="flex cursor-pointer items-center gap-2">
              <Checkbox />
              <span className="text-sm">{item.value}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        {districts.map((district, index) => (
          <div key={district + String(index)}>
            <h3 className="mb-3 text-sm font-bold text-text-secondary">{district.city}</h3>
            {district.districts.map((region, index) => (
              <div key={region + String(index)}>
                <div>
                  <Tag
                    onClick={() => onTagValueChange(region)}
                    label={region}
                    selected={regionType.includes(region)}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

const Tag = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  console.log(selected);
  return (
    <>
      <TagButton
        key={label}
        size="xs"
        variant="chipSelected"
        className={cn(
          "border border-greyscale-grey-100 p-3.5 text-xs font-bold text-greyscale-grey-400",
          selected ? "bg-button-light text-text-inverse" : "bg-gray-100 text-text-secondary"
        )}
        onClick={onClick}
      >
        {label}
      </TagButton>
    </>
  );
};
