"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { quickSearchStepCardContentMap } from "@/src/features/quickSearch/model";
import { QuickSearchSection } from "@/src/widgets/quickSearchSection/ui/quickSearchSection";
import { useQuickSearchHistory } from "@/src/features/quickSearch/hooks/useQuickSearchHistory";
import { Modal } from "@/src/shared/ui/modal/default";
import { Spinner } from "@/src/shared/ui/spinner/default";

export default function QuickSearchPage() {
  const { type } = useParams() as { type: string };
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const content = quickSearchStepCardContentMap[type as keyof typeof quickSearchStepCardContentMap];
  const { data: historyData, isLoading, isSuccess } = useQuickSearchHistory();

  useEffect(() => {
    if (type === "init" && isSuccess && historyData) {
      if (historyData.existed === false) {
        // 이전 탐색 결과가 없으면 바로 다음 단계로 이동
        router.push("/quicksearch/choosePinPoint");
      } else {
        // 이전 탐색 결과가 있으면 모달 표시
        setShowModal(true);
      }
    }
  }, [type, isSuccess, historyData, router]);

  const handleButtonClick = (buttonIndex: number, buttonLabel: string) => {
    if (buttonIndex === 0) {
      // "새로 시작하기" 버튼
      setShowModal(false);
      router.push("/quicksearch/choosePinPoint");
    } else {
      // "결과보기" TODO: 결과 페이지로 이동
      setShowModal(false);
    }
  };

  if (type !== "init" && !content) return <div>잘못된 접근입니다.</div>;

  // init 타입이고 로딩 중이거나 모달을 표시해야 하는 경우
  if (type === "init") {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      );
    }

    return (
      <>
        {/* 빈 화면에 모달만 표시 */}
        <Modal open={showModal} type="quickSearchEnterCheck" onButtonClick={handleButtonClick} />
      </>
    );
  }

  return (
    <main className="flex h-full flex-col">
      <QuickSearchSection
        title={content.title}
        description={content.description}
        isFillAll={content.isFillAll}
        boldRange={Array.from(content.boldRange)}
        type={type as keyof typeof quickSearchStepCardContentMap}
        progress={content.progress}
      />
    </main>
  );
}
