"use client";

import { useState } from "react";
import { Button } from "@/src/shared/lib/headlessUi";
import { cn } from "@/lib/utils";
import { PinIcon } from "@/src/assets/icons/quickSearch/pinIcon";

export interface QuickSearchRecommendCardProps {
  /** 상단 태그 (예: "대학생") */
  tag?: string;
  /** 단지 이름 */
  complexName: string;
  /** 핀포인트 거리 (시간) */
  distanceHours: number;
  /** 핀포인트 거리 (분) */
  distanceMinutes: number;
  /** 보증금 (만원) */
  deposit: number;
  /** 월임대료 (만원) */
  monthlyRent: number;
  /** 전용면적 (m²) */
  exclusiveArea: number;
  /** 모집호수 */
  recruitmentUnits: number;
  /** 인프라 태그 리스트 */
  infrastructureTags: string[];
  /** 평면도 이미지 URL */
  floorPlanImage?: string;
  /** 평면도 이미지 alt 텍스트 */
  floorPlanAlt?: string;
  /** 공고 바로가기 버튼 클릭 핸들러 */
  onGoToAnnouncement?: () => void;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
  /** 즐겨찾기 클릭 핸들러 */
  onFavoriteClick?: () => void;
  /** 즐겨찾기 상태 */
  isFavorite?: boolean;
  /** 추가 클래스명 */
  className?: string;
}

export const QuickSearchRecommendCard = ({
  tag,
  complexName,
  distanceHours,
  distanceMinutes,
  deposit,
  monthlyRent,
  exclusiveArea,
  recruitmentUnits,
  infrastructureTags,
  floorPlanImage,
  floorPlanAlt = "평면도",
  onGoToAnnouncement,
  onClick,
  onFavoriteClick,
  isFavorite: isFavoriteProp,
  className,
}: QuickSearchRecommendCardProps) => {
  // 즐겨찾기 상태 관리 (내부 상태 또는 prop)
  const [internalFavorite, setInternalFavorite] = useState(false);
  const isControlled = isFavoriteProp !== undefined;
  const isFavorite = isControlled ? isFavoriteProp : internalFavorite;

  const handleFavoriteClick = () => {
    if (isControlled) {
      // Controlled: 부모에서 상태 관리
      onFavoriteClick?.();
    } else {
      // Uncontrolled: 내부에서 토글
      setInternalFavorite(prev => !prev);
      onFavoriteClick?.();
    }
  };

  // 인프라 태그 컴포넌트
  const InfrastructureTag = ({ label }: { label: string }) => (
    <span className="rounded-md bg-greyscale-grey-50 px-2 py-1 text-xs-10 font-medium text-greyscale-grey-500">
      {label}
    </span>
  );

  const InfrastructureTags = () => {
    if (infrastructureTags.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1">
        {infrastructureTags.map((tag, index) => (
          <InfrastructureTag key={index} label={tag} />
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex min-w-[200px] flex-col gap-2", className)}>
      {/* 카드 영역*/}
      {/* 평면도 이미지 + 상단 태그/핀 아이콘 오버레이 */}
      <div className="flex flex-col rounded-lg border border-greyscale-grey-75">
        <div className="relative h-32 w-full overflow-hidden rounded-t-lg bg-greyscale-grey-50 p-4">
          {floorPlanImage ? (
            <img src={floorPlanImage} alt={floorPlanAlt} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-sm text-greyscale-grey-400">평면도 이미지</span>
            </div>
          )}
          {/* 상단: 태그 + 핀 아이콘 (이미지 위에 오버레이) */}
          <div className="absolute left-0 top-0 z-10 flex w-full items-center justify-between p-3">
            {tag && (
              <span className="flex items-center justify-center rounded border border-greyscale-grey-100 bg-white px-1 py-[3px] text-xs font-medium text-greyscale-grey-700">
                {tag}
              </span>
            )}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                handleFavoriteClick();
              }}
              className="cursor-pointer"
              aria-label="즐겨찾기"
            >
              <PinIcon isFill={isFavorite} className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col gap-1">
            {/* 단지 이름 */}
            <h3 className="line-clamp-1 text-base font-bold leading-[140%] text-greyscale-grey-900">
              {complexName}
            </h3>
            {/* 핀포인트 거리 */}
            <div className="text-sm text-greyscale-grey-700">
              핀포인트 거리{" "}
              <span className="font-bold text-primary-blue-400">
                {distanceHours}시간 {distanceMinutes.toString().padStart(2, "0")}분
              </span>
            </div>
          </div>

          {/* 정보 섹션 (좌우 패딩 16px) */}
          <div className="flex flex-col gap-1">
            {/* 보증금/월임대료 */}
            <div className="text-xs font-normal leading-[120%] tracking-[-0.01em] text-greyscale-grey-500">
              보증금 {deposit}만원 | 월임대료 {monthlyRent}만원
            </div>
            {/* 전용면적/모집호수 */}
            <div className="text-xs font-normal leading-[120%] tracking-[-0.01em] text-greyscale-grey-500">
              전용면적 {exclusiveArea}m² | 모집호수 {recruitmentUnits}호
            </div>
          </div>
          {/* 인프라 태그들 */}
          <InfrastructureTags />
        </div>
      </div>
      {/* 공고 바로가기 버튼 */}
      {onGoToAnnouncement && (
        <Button
          variant="solid"
          size="md"
          theme="subBlue"
          onClick={e => {
            e.stopPropagation();
            onGoToAnnouncement();
          }}
          className="w-full"
        >
          공고 바로가기
        </Button>
      )}
    </div>
  );
};
