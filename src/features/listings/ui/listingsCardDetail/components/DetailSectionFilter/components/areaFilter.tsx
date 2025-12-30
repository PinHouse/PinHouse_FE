import { cn } from "@/lib/utils";
import { useListingDetailNoticeSheet } from "@/src/entities/listings/hooks/useListingDetailSheetHooks";
import { AreaTypeResponse, DistrictResponse } from "@/src/entities/listings/model/type";
import { REGION_CHECKBOX } from "@/src/features/listings/model";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";

export const AreaFilter = () => {
  const { id } = useParams() as { id: string };
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const { data } = useListingDetailNoticeSheet<AreaTypeResponse>({
    id: id,
    url: "area",
  });
  const typeCodes = data?.typeCodes;

  const onTagValueChange = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  if (!typeCodes) return <Spinner title="지역 탐색중..." description="잠시만 기다려주세요" />;
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="-mx-5 border-b pb-3">
        <div className="flex w-full gap-4 px-5">
          {REGION_CHECKBOX.map(item => (
            <>
              {item.key !== "pinpoint" && (
                <label key={item.key} className="flex cursor-pointer items-center gap-2">
                  <Checkbox />
                  <span className="text-sm">{item.value}</span>
                </label>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {typeCodes.map((typeCode, index) => (
          <div key={typeCode + String(index)}>
            <div>
              <div>
                <Tag
                  onClick={() => onTagValueChange(typeCode)}
                  label={typeCode}
                  selected={selectedRegions.includes(typeCode)}
                />
              </div>
            </div>
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
