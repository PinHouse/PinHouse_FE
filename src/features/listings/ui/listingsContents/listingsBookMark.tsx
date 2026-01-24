import { Toggle } from "@/src/shared/lib/headlessUi/bookMark/bookMark";

export const ListingBookMark = ({ item, border }: { item: string; border: string }) => {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className={`data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 ${border}`}
    >
      <p className="text-xs">{item}</p>
    </Toggle>
  );
};

export const ListingBgBookMark = ({
  item,
  bg,
  text,
  border = "none",
}: {
  item: string;
  bg: string;
  text: string;
  border: string;
}) => {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className={`data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 ${bg} ${text} ${border} rounded-sm px-1`}
    >
      <p className="text-xs">{item}</p>
    </Toggle>
  );
};
