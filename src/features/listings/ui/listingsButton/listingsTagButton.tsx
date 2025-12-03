"use client";
import { DownButton } from "@/src/assets/icons/button";
import { FilterOption } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { useFilterSheetStore } from "../../model";
import { useRouter } from "next/navigation";

export const ListingTagButton = ({ label, count }: { label: FilterOption; count: number }) => {
  const openSheet = useFilterSheetStore(state => state.openSheet);
  const router = useRouter();

  const handleClick = async () => {
    await router.push(`/listings?tab=${label.key}`, { scroll: false });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => openSheet(), 200);
      });
    });
  };
  return (
    <TagButton size="sm" onClick={handleClick} variant={"ghost"}>
      <div className="flex gap-1 text-xs">
        <p>{label.label}</p>
        <p className="text-text-brand">{count}</p>
      </div>
      <div className="mr-[-5px] flex shrink-0">
        <DownButton className="h-5 w-4" />
      </div>
    </TagButton>
  );
};
