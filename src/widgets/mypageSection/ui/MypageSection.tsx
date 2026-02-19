"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FootPrintIcon from "@/src/assets/icons/mypage/footPrintIcon";
import MapPinIcon from "@/src/assets/icons/mypage/mapPinIcon";
import RecentIcon from "@/src/assets/icons/mypage/recentIcon";
import PinsetIcon from "@/src/assets/icons/mypage/pinsetIcon";
import { useMypageUser } from "@/src/features/mypage/hooks";
import {
  MYPAGE_ERROR_TEXT,
  MYPAGE_LABEL_INTEREST_ENV,
  MYPAGE_LABEL_PINPOINTS,
  MYPAGE_LABEL_RECENT_ADS,
  MYPAGE_LABEL_SAVED_LIST,
  MYPAGE_LOADING_DESCRIPTION,
  MYPAGE_LOADING_TITLE,
  MYPAGE_SECTION_MY_ACTIVITY,
  MYPAGE_SECTION_MY_INFO,
} from "@/src/features/mypage/model/mypageConstants";
import {
  MypageMenuSection,
  MyPageHeader,
  PinReportSection,
  UserInfoCard,
} from "@/src/features/mypage/ui";
import { useDiagnosisLatest } from "@/src/features/eligibility/hooks/useDiagnosisLatest";
import { useDiagnosisResultStore } from "@/src/features/eligibility/model/diagnosisResultStore";
import { ErrorState } from "@/src/shared/ui/errorState";
import { LoadingState } from "@/src/shared/ui/loadingState";
import { Modal } from "@/src/shared/ui/modal/default/modal";
import { PageTransition } from "@/src/shared/ui/animation/pageTransition";

/**
 * 마이페이지 메인 화면 위젯
 * - useMypageUser 호출 및 로딩/에러 처리
 * - 섹션 배치 및 라우팅
 */
export const MypageSection = () => {
  const { data, isLoading, isError } = useMypageUser();
  const { data: diagnosisLatest } = useDiagnosisLatest();
  const setDiagnosisResult = useDiagnosisResultStore(s => s.setResult);
  const router = useRouter();
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);

  const openEligibilityModal = () => setEligibilityModalOpen(true);
  const handleModalConfirm = () => {
    setEligibilityModalOpen(false);
    router.push("/eligibility");
  };
  const handleRediagnosis = () => {
    router.push("/eligibility");
  };
  const handleViewDetail = () => router.push("/eligibility/result/final");

  useEffect(() => {
    if (diagnosisLatest) {
      setDiagnosisResult(diagnosisLatest, {
        incomeLevel: diagnosisLatest.incomeLevel,
      });
    }
  }, [diagnosisLatest, setDiagnosisResult]);

  if (isLoading) {
    return (
      <LoadingState
        title={MYPAGE_LOADING_TITLE}
        description={MYPAGE_LOADING_DESCRIPTION}
        className="flex h-full min-h-screen items-center justify-center"
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        text={MYPAGE_ERROR_TEXT}
        className="flex h-full min-h-screen flex-col items-center justify-center px-5"
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-greyscale-grey-25 px-5">
      <PageTransition>
        <MyPageHeader />
        <div className="flex flex-col gap-5 pb-6">
          <UserInfoCard user={data} onSettingsClick={() => router.push("/mypage/settings")} />

          <PinReportSection
            diagnosisResult={diagnosisLatest}
            onDiagnosisClick={openEligibilityModal}
            onRediagnosisClick={handleRediagnosis}
            onViewDetailClick={diagnosisLatest ? handleViewDetail : undefined}
          />

          <Modal
            type="eligibilityDiagnosisGo"
            open={eligibilityModalOpen}
            showCloseButton
            onClose={() => setEligibilityModalOpen(false)}
            onButtonClick={handleModalConfirm}
          />

          <MypageMenuSection
            title={MYPAGE_SECTION_MY_INFO}
            items={[
              {
                icon: <FootPrintIcon />,
                label: MYPAGE_LABEL_INTEREST_ENV,
                onClick: () => {
                  alert("관심 주변 환경 설정 미구현 상태");
                },
              },
              {
                icon: <MapPinIcon />,
                label: MYPAGE_LABEL_PINPOINTS,
                onClick: () => router.push("/mypage/pinpoints"),
              },
            ]}
          />

          <MypageMenuSection
            title={MYPAGE_SECTION_MY_ACTIVITY}
            items={[
              {
                icon: <PinsetIcon />,
                label: MYPAGE_LABEL_SAVED_LIST,
                onClick: () => {
                  alert("저장 목록 이동 미구현 상태");
                },
              },
              {
                icon: <RecentIcon />,
                label: MYPAGE_LABEL_RECENT_ADS,
                onClick: () => {
                  alert("최근 본 공고 이동 미구현 상태");
                },
              },
            ]}
          />
        </div>
      </PageTransition>
    </div>
  );
};
