"use client";
import { cn } from "@/lib/utils";
import { DownButton } from "@/src/assets/icons/button";
import { useEnvtagStore } from "@/src/entities/tag/envTag";
import { TagButton } from "@/src/shared/ui/button/tagButton";

export const ListingTagButton = ({ label }: { label: string }) => {
  const { envTag, toggleEnvtag } = useEnvtagStore();
  const isSelected = envTag.includes(label);

  const handleClick = () => {
    toggleEnvtag(label);
  };

  return (
    <TagButton
      size="sm"
      onClick={handleClick}
      variant={"ghost"}
      // className={cn(
      //   "rounded-full border px-3 py-1 text-sm font-medium transition-all",
      //   isSelected
      //     ? "border-primary bg-button-light text-white"
      //     : "border-gray-200 bg-gray-100 text-gray-700"
      // )}
    >
      <div className="text-xs">{label}</div>
      <div className="ml-1 mr-[-5px] flex shrink-0">
        <DownButton className="h-5 w-4" />
      </div>
    </TagButton>
  );
};
