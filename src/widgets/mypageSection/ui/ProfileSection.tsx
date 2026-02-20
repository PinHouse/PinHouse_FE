"use client";

import { useMypageUser } from "@/src/features/mypage/hooks";
import {
  MYPAGE_ERROR_TEXT,
  MYPAGE_LOADING_DESCRIPTION,
  MYPAGE_PROFILE_HEADER_TITLE,
  MYPAGE_PROFILE_LOADING_TITLE,
} from "@/src/features/mypage/model/mypageConstants";
import { ProfileForm } from "@/src/features/mypage/ui";
import { PageTransition } from "@/src/shared/ui/animation/pageTransition";
import { ErrorState } from "@/src/shared/ui/errorState";
import { DefaultHeader } from "@/src/shared/ui/header";
import { LoadingState } from "@/src/shared/ui/loadingState";

/**
 * 마이페이지 프로필 화면 위젯
 * - useMypageUser 호출 및 로딩/에러 처리
 * - ProfileForm 렌더
 */
export const ProfileSection = () => {
  const { data, isLoading, isError } = useMypageUser();

  if (isLoading) {
    return (
      <LoadingState
        title={MYPAGE_PROFILE_LOADING_TITLE}
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
    <div className="flex min-h-screen flex-col bg-white">
      <PageTransition>
        <header
          className="relative flex items-center px-5 py-4"
          aria-label={MYPAGE_PROFILE_HEADER_TITLE}
        >
          <DefaultHeader title={MYPAGE_PROFILE_HEADER_TITLE} path="/mypage/settings" />
        </header>
        <div className="border-b border-greyscale-grey-25"></div>
        <div className="px-5 py-6">
          <ProfileForm user={data} />
        </div>
      </PageTransition>
    </div>
  );
};
