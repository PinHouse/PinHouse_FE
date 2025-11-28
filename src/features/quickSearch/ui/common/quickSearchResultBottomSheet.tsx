"use client";

import { useRef, useState, MouseEvent, useEffect } from "react";
import { BottomSheet, BottomSheetContent, BottomSheetTitle } from "@/src/shared/lib/headlessUi";
import { QuickSearchRecommendCard } from "./quickSearchRecommendCard";
import { QuickSearchRecommendCardProps } from "./quickSearchRecommendCard";

interface QuickSearchResultBottomSheetProps {
  /** BottomSheet 열림 상태 */
  open?: boolean;
  /** BottomSheet 열림/닫힘 핸들러 */
  onOpenChange?: (open: boolean) => void;
  /** 카드 데이터 리스트 */
  cards: Omit<QuickSearchRecommendCardProps, "className">[];
  /** 매칭 결과 헤더 문구 (기본값: "매칭 결과 추천 방 {count}개") */
  title?: string | ((count: number) => string);
  /** 강조할 텍스트 범위 (기본값: "{count}개") */
  titleHighlight?: string | ((count: number) => string);
  /** 강조 텍스트 색상 클래스 (기본값: "text-greyscale-grey-900") */
  titleHighlightColor?: string;
}

export const QuickSearchResultBottomSheet = ({
  open = true,
  onOpenChange,
  cards,
  title,
  titleHighlight,
  titleHighlightColor = "text-greyscale-grey-900",
}: QuickSearchResultBottomSheetProps) => {
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isDraggingDown, setIsDraggingDown] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragTranslateY, setDragTranslateY] = useState(0);
  const [isDraggingUp, setIsDraggingUp] = useState(false);
  const [dragUpStartY, setDragUpStartY] = useState(0);
  const [dragUpTranslateY, setDragUpTranslateY] = useState(0);

  // BottomSheet가 열릴 때 dragTranslateY 리셋
  useEffect(() => {
    if (open) {
      setDragTranslateY(0);
      setDragUpTranslateY(0);
    }
  }, [open]);

  // 컨텐츠 높이 측정 (드래그 닫기/열기 기능을 위해 필요)
  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.getBoundingClientRect().height;
        setContentHeight(height);
      }
    };

    if (open) {
      const timer = setTimeout(updateContentHeight, 100);
      const resizeObserver = new ResizeObserver(updateContentHeight);
      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
      }

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    }
  }, [open, cards]);

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

  // BottomSheet 드래그 핸들러 (닫기/열기용)
  const handleBottomSheetDragStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsDraggingDown(true);
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
    setDragTranslateY(0);
  };

  const handleBottomSheetDragMove = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDraggingDown) return;
    e.preventDefault();
    let clientY: number;
    if ("touches" in e) {
      clientY = e.touches[0]?.clientY || dragStartY;
    } else {
      clientY = e.clientY;
    }
    const deltaY = clientY - dragStartY; // 아래로 드래그하면 양수
    // 아래로만 드래그 가능, 최대값은 컨텐츠 높이만큼
    const newTranslateY = Math.max(0, Math.min(contentHeight, deltaY));
    setDragTranslateY(newTranslateY);
  };

  const handleBottomSheetDragEnd = () => {
    setIsDraggingDown(false);
    // 드래그 거리가 컨텐츠 높이의 30% 이상이면 닫기
    const threshold = contentHeight * 0.3;
    if (dragTranslateY >= threshold) {
      onOpenChange?.(false);
      setDragTranslateY(0); // 닫을 때도 리셋
    } else {
      setDragTranslateY(0); // 원래 위치로 복귀
    }
    setDragStartY(0);
  };

  const handleBottomSheetHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 드래그가 아닌 클릭인 경우에만 닫기
    if (!isDraggingDown && dragTranslateY === 0) {
      e.stopPropagation();
      onOpenChange?.(false);
    }
  };

  // 작은 핸들 드래그 핸들러 (열기용)
  const handleSmallHandleDragStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsDraggingUp(true);
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragUpStartY(clientY);
    setDragUpTranslateY(0);
  };

  const handleSmallHandleDragMove = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDraggingUp) return;
    e.preventDefault();
    let clientY: number;
    if ("touches" in e) {
      clientY = e.touches[0]?.clientY || dragUpStartY;
    } else {
      clientY = e.clientY;
    }
    const deltaY = dragUpStartY - clientY; // 위로 드래그하면 양수
    // 위로만 드래그 가능, 최대값은 컨텐츠 높이만큼
    const newTranslateY = Math.max(0, Math.min(contentHeight, deltaY));
    setDragUpTranslateY(newTranslateY);
  };

  const handleSmallHandleDragEnd = () => {
    setIsDraggingUp(false);
    // 드래그 거리가 컨텐츠 높이의 30% 이상이면 열기
    const threshold = contentHeight * 0.3;
    if (dragUpTranslateY >= threshold) {
      onOpenChange?.(true);
    }
    setDragUpTranslateY(0);
    setDragUpStartY(0);
  };

  const handleSmallHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 드래그가 아닌 클릭인 경우에만 열기
    if (!isDraggingUp && dragUpTranslateY === 0) {
      e.stopPropagation();
      // dragTranslateY 리셋하고 열기
      setDragTranslateY(0);
      onOpenChange?.(true);
    }
  };

  return (
    <>
      {/* 닫힌 상태일 때 작은 핸들 */}
      {!open && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex cursor-grab items-center justify-center rounded-t-3xl bg-white py-3 shadow-[0px_-16px_24px_-10px_rgba(48,111,255,0.15)] active:cursor-grabbing"
          onTouchStart={handleSmallHandleDragStart}
          onTouchMove={handleSmallHandleDragMove}
          onTouchEnd={handleSmallHandleDragEnd}
          onMouseDown={handleSmallHandleDragStart}
          onMouseMove={handleSmallHandleDragMove}
          onMouseUp={handleSmallHandleDragEnd}
          onMouseLeave={handleSmallHandleDragEnd}
          onClick={handleSmallHandleClick}
          style={{
            transform: `translateY(${dragUpTranslateY > 0 ? -dragUpTranslateY : 0}px)`,
            transition: isDraggingUp ? "none" : "transform 0.3s ease-out",
          }}
        >
          <div className="h-1 w-12 rounded-full bg-greyscale-grey-200" />
        </div>
      )}
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <BottomSheetContent
          className="p-0"
          style={{
            transform: `translateY(${dragTranslateY}px)`,
            transition: isDraggingDown ? "none" : "transform 0.3s ease-out",
          }}
          showOverlay={false}
        >
          {/* 접근성을 위한 숨겨진 제목 */}
          <BottomSheetTitle className="sr-only">빠른 검색 결과</BottomSheetTitle>
          {/* 드래그 핸들 영역 */}
          <div
            className="flex cursor-grab items-center justify-center py-2 active:cursor-grabbing"
            onTouchStart={handleBottomSheetDragStart}
            onTouchMove={handleBottomSheetDragMove}
            onTouchEnd={handleBottomSheetDragEnd}
            onMouseDown={handleBottomSheetDragStart}
            onMouseMove={handleBottomSheetDragMove}
            onMouseUp={handleBottomSheetDragEnd}
            onMouseLeave={handleBottomSheetDragEnd}
            onClick={handleBottomSheetHandleClick}
          >
            <div className="h-1 w-12 rounded-full bg-greyscale-grey-200" />
          </div>
          <div ref={contentRef} className="flex flex-col">
            {/* 매칭 결과 헤더 */}
            <div className="px-5 pb-4 pt-6">
              <h3 className="text-base font-bold text-greyscale-grey-500">
                {renderTitleWithHighlight()}
              </h3>
            </div>
            {/* 스크롤 가능한 카드 리스트 영역 */}
            <div
              ref={scrollContainerRef}
              className={`no-scrollbar touch-pan-x overflow-x-auto overflow-y-hidden pb-6 ${
                isDragging ? "cursor-grabbing select-none" : "cursor-grab"
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
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
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
};
