export type ListingCompareItem = {
  id: string;
  roomType: string; // 대학생, 청년, 신혼부부 등
  complexName: string; // 단지명
  distanceText: string; // 거리 정보
  priceText: string; // 보증금/월세
  optionText: string; // 면적/옵션
  tags: string[]; // 인프라 태그
};

export type ListingCompareCardProps = {
  id: string;
  roomTypeLabel: string;
  title: string;
  distance: string;
  price: string;
  option: string;
  tags: string[];
};

export const mapCompareItemToCardProps = (item: ListingCompareItem): ListingCompareCardProps => ({
  id: item.id,
  roomTypeLabel: item.roomType,
  title: item.complexName,
  distance: item.distanceText,
  price: item.priceText,
  option: item.optionText,
  tags: item.tags,
});

export const ListingCompareCard = ({
  id,
  roomTypeLabel,
  title,
  distance,
  price,
  option,
  tags,
}: ListingCompareCardProps) => {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-white">
      <div className="relative h-[92px] w-full rounded-t-lg bg-greyscale-grey-100">
        {/* <button className="absolute right-2 top-2 rounded-full bg-white p-1 shadow">📌</button> */}
      </div>
      <div className="p-3">
        <span className="mb-1 inline-block text-xs font-medium text-greyscale-grey-500">
          {roomTypeLabel}
        </span>

        <div className="mb-1 flex items-center justify-between">
          <p className="line-clamp-1 text-sm font-semibold">{title}</p>
          <button className="text-greyscale-grey-400">⋮</button>
        </div>
        <p className="line-clamp-1 text-xs text-greyscale-grey-500">{distance}</p>
        <p className="line-clamp-1 text-xs text-greyscale-grey-500">{option}</p>
        <div className="mt-2 grid grid-cols-[64px_64px] gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-md border border-greyscale-grey-200 py-[2px] text-center text-xs text-greyscale-grey-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
