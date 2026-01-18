"use client";

import { TagButton } from "@/src/shared/ui/button/tagButton";

export interface CategorySectionProps {
  title: string;
  options: readonly string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}

export const QuickSearchCategorySection = ({
  title,
  options,
  selectedItems,
  onToggle,
}: CategorySectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-900">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => {
          const isSelected = selectedItems.includes(option);
          return (
            <TagButton
              key={option}
              variant={isSelected ? "chipSelected" : "chip"}
              size="md"
              onClick={() => onToggle(option)}
            >
              {option}
            </TagButton>
          );
        })}
      </div>
    </div>
  );
};
