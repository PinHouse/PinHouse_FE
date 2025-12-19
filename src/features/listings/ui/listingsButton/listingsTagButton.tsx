"use client";
import { DownButton } from "@/src/assets/icons/button";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { useFilterSheetStore } from "../../model";
import { useRouter } from "next/navigation";

type BaseLabel = {
  key: string;
  label: string;
};

export const ListingTagButton = ({
  label,
  count,
  param,
}: {
  label: BaseLabel;
  count: number | null;
  param: string;
}) => {
  const openSheet = useFilterSheetStore(state => state.openSheet);
  const router = useRouter();

  const handleClick = async () => {
    await router.push(`/listings?${param}=${label.key}`, { scroll: false });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => openSheet(), 200);
      });
    });
  };
  return (
    <TagButton size="sm" onClick={handleClick} variant={"ghost"} className="h-9 gap-1 rounded-3xl">
      <div className="flex gap-1 text-sm font-bold text-gray-500">
        <p>{label.label}</p>
        <p className="text-text-brand">{count === 0 ? null : count}</p>
      </div>
      <div className="mr-[-5px] flex shrink-0">
        <DownButton className="h-5 w-4" />
      </div>
    </TagButton>
  );
};
