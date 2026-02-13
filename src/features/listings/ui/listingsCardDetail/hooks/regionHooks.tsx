import { cn } from "@/lib/utils";
import { TagButton } from "@/src/shared/ui/button/tagButton";

export const Tag = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
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
