"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { quickSearchStepCardContentMap } from "@/src/features/quickSearch/model";
import { QuickSearchSection } from "@/src/widgets/quickSearchSection/ui/quickSearchSection";
import { useQuickSearchHistory } from "@/src/features/quickSearch/hooks/useQuickSearchHistory";
import { Modal } from "@/src/shared/ui/modal/default";
import { Spinner } from "@/src/shared/ui/spinner/default";

type QuickSearchPageClientProps = {
  type: string;
};

export function QuickSearchPageClient({ type }: QuickSearchPageClientProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const content = quickSearchStepCardContentMap[type as keyof typeof quickSearchStepCardContentMap];
  const { data: historyData, isLoading, isSuccess } = useQuickSearchHistory();

  useEffect(() => {
    if (type === "init" && isSuccess && historyData) {
      if (historyData.existed === false) {
        router.push("/quicksearch/choosePinPoint");
      } else {
        setShowModal(true);
      }
    }
  }, [type, isSuccess, historyData, router]);

  const handleButtonClick = (buttonIndex: number) => {
    if (buttonIndex === 0) {
      setShowModal(false);
      router.push("/quicksearch/choosePinPoint");
    } else {
      setShowModal(false);
      const historyId = historyData?.id;
      router.push(historyId ? `/quicksearch/result?historyId=${historyId}` : "/quicksearch/result");
    }
  };

  if (type !== "init" && !content) return <div>잘못된 접근입니다.</div>;

  if (type === "init") {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      );
    }

    return <Modal open={showModal} type="quickSearchEnterCheck" onButtonClick={handleButtonClick} />;
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
