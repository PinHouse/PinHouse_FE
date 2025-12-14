"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface QuickSearchResultHeaderProps {
  /** 다시하기 버튼 클릭 핸들러 */
  onRetry?: () => void;
  /** 탐색 메뉴 클릭 핸들러 */
  onSearchMenuClick?: () => void;
}

export const QuickSearchResultHeader = ({
  onRetry,
  onSearchMenuClick,
}: QuickSearchResultHeaderProps) => {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // 기본 동작: 빠른 검색 초기화 후 첫 단계로 이동
      router.push("/quicksearch/init");
    }
  };

  const handleSearchMenuClick = () => {
    if (onSearchMenuClick) {
      onSearchMenuClick();
    } else {
      // 기본 동작: 탐색 메뉴로 이동 (예: /listings)
      router.push("/listings");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white px-5 pb-6 pt-10">
      {/* 일러스트 영역 (나중에 실제 일러스트로 교체) */}
      <div className="mb-6 flex h-40 w-full items-center justify-center">
        {/* TODO: 파티 풀러를 든 핀 캐릭터 일러스트 추가 */}
        <div className="flex h-40 w-40 items-center justify-center rounded-lg bg-greyscale-grey-50">
          <span className="text-sm text-greyscale-grey-400">일러스트 영역</span>
        </div>
      </div>

      {/* 제목 */}
      <h1 className="mb-2 text-center text-2xl font-bold leading-tight text-greyscale-grey-900">
        조건 탐색 결과가 나왔어요
      </h1>

      {/* 부제목 */}
      <h2 className="mb-4 text-center text-xl font-bold leading-tight text-greyscale-grey-900">
        추천 방을 확인해 보세요!
      </h2>

      {/* 안내 텍스트 */}
      <p className="mb-8 text-center text-sm leading-relaxed text-greyscale-grey-500">
        정확한 탐색은{" "}
        <button
          onClick={handleSearchMenuClick}
          className="font-medium text-primary-blue-400 underline underline-offset-2"
        >
          탐색 메뉴
        </button>
        에서 진행해 보세요
      </p>

      {/* 다시하기 버튼 */}
      <button
        onClick={handleRetry}
        className="flex items-center gap-1 text-base font-medium text-primary-blue-400"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>다시하기</span>
      </button>
    </div>
  );
};
