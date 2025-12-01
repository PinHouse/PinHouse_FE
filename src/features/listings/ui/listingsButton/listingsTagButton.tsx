"use client";
import { DownButton } from "@/src/assets/icons/button";
import { useEnvtagStore } from "@/src/entities/tag/envTag";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { useListingsFilterStore } from "../../model";

export const ListingTagButton = ({ label, count }: { label: string; count: number }) => {
  const { envTag, toggleEnvtag } = useEnvtagStore();

  const handleClick = () => {
    toggleEnvtag(label);
  };

  return (
    <TagButton size="sm" onClick={handleClick} variant={"ghost"}>
      <div className="flex gap-1 text-xs">
        <p>{label}</p>
        <p className="text-text-brand">{count}</p>
      </div>
      <div className="mr-[-5px] flex shrink-0">
        <DownButton className="h-5 w-4" />
      </div>
    </TagButton>
  );
};
