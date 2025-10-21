"use client";
import { cn } from "@/src/shared/lib/utils";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { TagProps } from "@/src/shared/ui/button/tagButton/types";
import { useState } from "react";

export const OnbaordingTagButton = ({ label }: TagProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(prev => !prev); // 토글
  };

  return (
    <TagButton
      size="sm"
      onClick={handleClick}
      className={cn(
        "rounded-full border px-3 py-1 text-sm font-medium transition-all",
        isSelected
          ? "border-primary bg-button-light text-white"
          : "border-gray-200 bg-gray-100 text-gray-700"
      )}
    >
      {label}
    </TagButton>
  );
};
