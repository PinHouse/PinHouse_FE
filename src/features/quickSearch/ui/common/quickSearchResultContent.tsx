"use client";

import { useRef, useState, MouseEvent } from "react";
import { QuickSearchRecommendCard } from "./quickSearchRecommendCard";
import { QuickSearchRecommendCardProps } from "./quickSearchRecommendCard";

interface QuickSearchResultContentProps {
  /** 카드 데이터 리스트 */
  cards: Omit<QuickSearchRecommendCardProps, "className">[];
  /** 매칭 결과 헤더 문구 (기본값: "매칭 결과 추천 방 {count}개") */
  title?: string | ((count: number) => string);
  /** 강조할 텍스트 범위 (기본값: "{count}개") */
  titleHighlight?: string | ((count: number) => string);
  /** 강조 텍스트 색상 클래스 (기본값: "text-greyscale-grey-900") */
  titleHighlightColor?: string;
}

export const QuickSearchResultContent = ({
  cards,
  title,
  titleHighlight,
  titleHighlightColor = "text-greyscale-grey-900",
}: QuickSearchResultContentProps) => {
  // 헤더 문구 생성
  const getTitleText = () => {
    if (title === undefined) {
      return `매칭 결과 추천 방 ${cards.length}개`;
    }
    if (typeof title === "function") {
      return title(cards.length);
    }
    return title;
  };

  // 강조할 텍스트 범위 가져오기
  const getHighlightText = () => {
    if (titleHighlight === undefined) {
      return `${cards.length}개`;
    }
    if (typeof titleHighlight === "function") {
      return titleHighlight(cards.length);
    }
    return titleHighlight;
  };

  // 텍스트에서 지정된 범위를 강조하여 렌더링
  const renderTitleWithHighlight = () => {
    const text = getTitleText();
    const highlightText = getHighlightText();

    // 강조할 텍스트가 없으면 그대로 반환
    if (!highlightText) {
      return text;
    }

    // 강조할 텍스트의 시작 인덱스 찾기
    const highlightIndex = text.indexOf(highlightText);

    // 강조할 텍스트가 없으면 그대로 반환
    if (highlightIndex === -1) {
      return text;
    }

    // 텍스트를 세 부분으로 나누기: 앞부분, 강조 부분, 뒷부분
    const beforeHighlight = text.substring(0, highlightIndex);
    const highlight = text.substring(highlightIndex, highlightIndex + highlightText.length);
    const afterHighlight = text.substring(highlightIndex + highlightText.length);

    return (
      <>
        {beforeHighlight && <span>{beforeHighlight}</span>}
        <span className={titleHighlightColor}>{highlight}</span>
        {afterHighlight && <span>{afterHighlight}</span>}
      </>
    );
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 마우스 드래그 핸들러 (가로 스크롤용)
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절 (2배)
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // 터치 드래그 핸들러 (모바일 스와이프용)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* 매칭 결과 헤더 */}
      <div className="px-5 pb-4 pt-6">
        <h3 className="text-base font-bold text-greyscale-grey-500">
          {renderTitleWithHighlight()}
        </h3>
      </div>

      {/* 스크롤 가능한 카드 리스트 영역 */}
      <div
        ref={scrollContainerRef}
        className={`no-scrollbar flex-1 touch-pan-x overflow-x-auto overflow-y-hidden pb-6 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-stretch gap-4 px-5">
          {cards.map((card, index) => (
            <QuickSearchRecommendCard key={index} {...card} className="h-full" />
          ))}
          {/* 마지막 카드 뒤 여백을 위한 빈 공간 */}
          <div className="min-w-[10px] flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};
