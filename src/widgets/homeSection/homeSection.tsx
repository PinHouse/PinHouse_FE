"use client";

import Link from "next/link";
import { Search } from "@/src/assets/icons/home";
import { PinhouseLogo } from "@/src/assets/icons/logo/pinHouseLogo";
import { HomeScreenHomeIcon } from "@/src/assets/icons/home/home";
import { HomeScreenTask } from "@/src/assets/icons/home/homeScreenTask";
import { LeftButton } from "@/src/assets/icons/button";
import { useNoticeInfinite } from "@/src/entities/home/hooks/homeHooks";
import { HomeScreenLogo } from "@/src/assets/icons/home/homeScreenLogo";

const PERSONAL_SHORTCUTS = [
  {
    id: "tour",
    title: "나에게 맞는 방 둘러보기",
    description: "예산·거리·주변 환경을 기반으로\n나의 조건에 맞는 방을 탐색해 보세요",
    icon: <HomeScreenHomeIcon />,
    button: <LeftButton width={25} />,
  },
  {
    id: "save-condition",
    title: "자격진단 하러가기",
    description: "나이·소득·자산·결혼 여부에 따른 조건을\n자격진단으로 맞는 공고를 확인해 보세요",
    icon: <HomeScreenTask />,
    button: <LeftButton width={25} />,
  },
] as const;

export const HomeSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-greyscale-grey-25 pb-[140px] text-greyscale-grey-900">
      <div className="flex flex-col pb-6 pt-8">
        <div className="px-4">
          <HomeHeader />
          <HomeHero userName="홍길동" />
        </div>
        <div className="flex flex-col gap-3 border-b-8 border-greyscale-grey-50 px-4">
          <QuickStatsList />
          <ActionCardList />
        </div>
        <div className="border-b-8 border-greyscale-grey-50 p-4">
          <PersonalShortcutList />
        </div>
        <div className="p-5">
          <UrgentNoticeList />
        </div>
      </div>

      {/* <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[768px] -translate-x-1/2 px-5 pb-6">
        <Link
          href="/listings/search"
          className="flex items-center justify-center rounded-2xl bg-primary-blue-400 py-4 text-base font-semibold text-white shadow-md-16"
        >
          공고 탐색 바로가기
        </Link>
      </div> */}

      {/* <QuickSearchResultBottomSheet
        open={isBottomSheetOpen}
        onOpenChange={setBottomSheetOpen}
        cards={recommendCards}
        title={count => `빠른탐색 추천 방 ${count}개`}
        titleHighlight={count => `${count}개`}
        titleHighlightColor="text-primary-blue-400"
      /> */}
    </section>
  );
};

const HomeHeader = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <HomeScreenLogo /> <PinhouseLogo className="h-7 w-auto" />
      </div>
      <div className="flex items-center gap-3">
        <button aria-label="검색">
          <Search />
        </button>
        {/* <button aria-label="알림">
          <Alram />
        </button> */}
        {/* <button aria-label="메뉴">
          <Hambarger />
        </button> */}
      </div>
    </header>
  );
};

const HomeHero = ({ userName }: { userName: string }) => {
  return (
    <section className="flex items-center justify-between rounded-3xl px-1 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary-blue-400">{userName}님 안녕하세요</p>
        <p className="text-xl font-bold leading-tight text-greyscale-grey-900">
          {userName}님에게 맞는 임대주택을
          <br />
          확인해 보세요
        </p>
      </div>
      <div className="relative h-16 w-16 rounded-full bg-primary-blue-50">
        <span className="absolute inset-0 flex items-center justify-center text-2xl text-primary-blue-400">
          ✨
        </span>
      </div>
    </section>
  );
};

const QuickStatsList = () => {
  return (
    <div className="relative flex items-center rounded-2xl bg-white px-4 py-6">
      {/* LEFT */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-1 text-xs text-greyscale-grey-500">
          <span>📍</span>
          <span>핀포인트</span>
        </div>

        <button className="flex items-center gap-1 text-lg font-semibold">
          핀포인트명
          <span className="text-greyscale-grey-400">▼</span>
        </button>
      </div>

      {/* DIVIDER */}
      <span className="pointer-events-none absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-greyscale-grey-200" />

      {/* RIGHT */}
      <div className="flex flex-1 flex-col items-start gap-1 pl-6">
        <div className="flex items-center gap-1 text-xs text-greyscale-grey-500">
          <span>⏱</span>
          <span>최대시간</span>
        </div>

        <button className="flex items-center gap-1 text-lg font-semibold">
          00시간 00분
          <span className="text-greyscale-grey-400">▼</span>
        </button>
      </div>
    </div>
  );
};

const ActionCardList = () => {
  return (
    <div className="mb-4 flex gap-4">
      <div className="flex min-h-[88px] flex-1 flex-col justify-between rounded-lg bg-primary-blue-300 px-4 py-3">
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-bold leading-tight opacity-[0.7]">핀포인트 기준</p>
          <div className="flex items-center justify-center">아이콘</div>
        </div>

        <p className="text-xl font-bold leading-tight text-white">00건</p>
      </div>

      <div
        className="flex min-h-[88px] flex-1 flex-col justify-between rounded-lg px-4 py-3"
        style={{ background: "#FFBA18" }}
      >
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-bold leading-tight opacity-[0.7]">자격진단 기준</p>

          <div className="flex items-center justify-center">아이콘</div>
        </div>

        <div className="flex gap-2 text-xl leading-tight">
          <p className="font-bold text-white">00건</p>
          <span
            className="flex items-center rounded-xl bg-greyscale-grey-25 p-1 text-xs font-bold"
            style={{ color: "#FFBA18" }}
          >
            <p>0% 완료</p>
          </span>
        </div>
      </div>
    </div>
  );
};

const PersonalShortcutList = () => {
  return (
    <section className="flex flex-col gap-3 rounded-3xl">
      {PERSONAL_SHORTCUTS.map(item => (
        <button
          key={item.id}
          className="flex items-center gap-2 rounded-2xl border border-greyscale-grey-50 bg-white p-4 text-left"
          type="button"
        >
          <div>{item.icon}</div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-greyscale-grey-900">{item.title}</p>
            <p className="whitespace-pre-line text-xs text-greyscale-grey-500">
              {item.description}
            </p>
          </div>

          <span className="flex flex-1 justify-end text-lg text-greyscale-grey-400">
            <div className="rotate-180">{item.button}</div>
          </span>
        </button>
      ))}
    </section>
  );
};

const UrgentNoticeList = () => {
  const { data } = useNoticeInfinite();
  const contents = data?.pages?.flatMap(page => page.content) ?? [];

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-greyscale-grey-900">마감임박 공고</p>
          {/* <p className="text-xs text-greyscale-grey-500">따끈한 공고를 놓치지 마세요</p> */}
        </div>
        <Link href="/listings" className="text-xs font-semibold text-primary-blue-300">
          전체보기
        </Link>
      </div>

      {/* <div className="flex flex-col gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {URGENT_NOTICES.map(item => (
          <div key={item.id} className="min-w-[220px] rounded-3xl bg-white p-4 shadow-md-16">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary-blue-300">{item.dueText}</span>
              <span className="text-xs text-greyscale-grey-400">{item.status}</span>
            </div>
            <h4 className="mt-2 text-base font-bold text-greyscale-grey-900">{item.complexName}</h4>
            <p className="mt-1 text-xs text-greyscale-grey-500">{item.region}</p>
            <button
              type="button"
              className="mt-3 w-full rounded-xl border border-primary-blue-50 py-2 text-sm font-semibold text-primary-blue-400"
            >
              공고 보러가기
            </button>
          </div>
        ))}
      </div> */}
    </section>
  );
};
