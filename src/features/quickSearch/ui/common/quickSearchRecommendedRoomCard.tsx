"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/src/shared/lib/headlessUi";

export interface QuickSearchRecommendedRoomCardProps {
  id: string;
  thumbnailUrl?: string | null;
  name: string;
  supplier?: string;
  location?: string;
  price?: string;
  tags?: string[];
  onClick?: (id: string) => void;
  className?: string;
}

export const QuickSearchRecommendedRoomCard = ({
  id,
  thumbnailUrl,
  name,
  supplier,
  location,
  price,
  tags,
  onClick,
  className,
}: QuickSearchRecommendedRoomCardProps) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div className={cn("flex w-full cursor-pointer flex-col", className)} onClick={handleClick}>
      {/* 이미지 영역 */}
      <div className="flex w-[35%] flex-col overflow-hidden rounded-l-xl bg-greyscale-grey-25">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-greyscale-grey-50">
            <span className="text-xs text-greyscale-grey-400">이미지 없음</span>
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="flex w-[65%] flex-col justify-between gap-2 p-4">
        <div className="flex flex-col gap-1">
          {supplier && <p className="text-xs font-medium text-greyscale-grey-500">{supplier}</p>}
          <h3 className="line-clamp-1 text-sm font-bold text-greyscale-grey-900">{name}</h3>
          {location && <p className="text-xs text-greyscale-grey-500">{location}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          {price && <p className="text-sm font-bold text-primary-blue-400">{price}</p>}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-md bg-primary-blue-25 px-2 py-0.5 text-xs font-medium text-primary-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* 공고바로가기 버튼 */}
      <Button variant="solid" theme="mainBlue" size="lg" radius="sm" className="w-full">
        공고바로가기
      </Button>
    </div>
  );
};
