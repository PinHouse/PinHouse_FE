"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Alram, Hambarger, Search } from "@/src/assets/icons/home";
import { PinhouseLogo } from "@/src/assets/icons/logo/pinHouseLogo";
import {
  QuickSearchRecommendCardProps,
  QuickSearchResultBottomSheet,
} from "@/src/features/quickSearch";
import { cn } from "@/lib/utils";

const QUICK_STATS = [
  {
    id: "pinpoint",
    label: "핀포인트",
    value: "핀포인트 한남",
  },
  {
    id: "wish-time",
    label: "최대시간",
    value: "00시간 00분",
  },
] as const;

const ACTION_CARDS = [
  {
    id: "pinpoint-base",
    title: "핀포인트별 기준",
    subtitle: "핀포인트 기준 공고를 확인해보세요",
    badge: "임포인트별 기준",
    highlight: "00건",
    tag: "업데이트 중",
    theme: "primary" as const,
  },
  {
    id: "qualification-base",
    title: "자격조건 기준",
    subtitle: "내 자격조건에 맞는 공고를 모아봤어요",
    badge: "자격조건 기준",
    highlight: "00건",
    tag: "예상 경쟁률",
    theme: "warning" as const,
  },
] as const;

const PERSONAL_SHORTCUTS = [
  {
    id: "tour",
    title: "나에게 맞는 방 둘러보기",
    description: "내 조건에 맞는 공고를 알려드릴게요",
  },
  {
    id: "save-condition",
    title: "나의 조건 저장하기",
    description: "지원했던 조건을 저장해두고 비교해보세요",
  },
] as const;

const URGENT_NOTICES = [
  {
    id: "notice-1",
    complexName: "대한방 나비타운",
    region: "대전광역시 서구",
    dueText: "D-3",
    status: "공고 모집 중",
  },
  {
    id: "notice-2",
    complexName: "공공임대 고덕자이",
    region: "서울시 강동구",
    dueText: "D-1",
    status: "26평, 48세대",
  },
  {
    id: "notice-3",
    complexName: "행복주택 별빛채",
    region: "수원시 팔달구",
    dueText: "D-5",
    status: "경쟁률 4:1",
  },
] as const;

const RECOMMENDATION_CARDS: QuickSearchRecommendCardProps[] = [
  {
    tag: "대학생",
    complexName: "행복주택 별빛채 5단지",
    distanceHours: 0,
    distanceMinutes: 18,
    deposit: 1200,
    monthlyRent: 35,
    exclusiveArea: 59,
    recruitmentUnits: 50,
    infrastructureTags: ["편의점 2분", "지하철 도보 8분"],
  },
  {
    tag: "사회초년생",
    complexName: "공공임대 고덕자이",
    distanceHours: 0,
    distanceMinutes: 25,
    deposit: 1500,
    monthlyRent: 42,
    exclusiveArea: 74,
    recruitmentUnits: 72,
    infrastructureTags: ["초등학교", "대형마트"],
  },
  {
    tag: "신혼부부",
    complexName: "위례 행복주택 2블럭",
    distanceHours: 0,
    distanceMinutes: 31,
    deposit: 2200,
    monthlyRent: 55,
    exclusiveArea: 84,
    recruitmentUnits: 20,
    infrastructureTags: ["공원", "카페거리"],
  },
];

export const HomeSection = () => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(true);
  const recommendCards = useMemo(() => RECOMMENDATION_CARDS, []);

  return (
    <section className="relative min-h-screen w-full bg-greyscale-grey-25 pb-[140px] text-greyscale-grey-900">
      <div className="flex flex-col pb-6 pt-8">
        <div className="px-4">
          <HomeHeader />
          <HomeHero userName="홍길동" />
        </div>
        <div className="flex flex-col gap-3 border-b-8 border-greyscale-grey-75 px-4">
          <QuickStatsList />
          <ActionCardList />
        </div>
        {/* <PersonalShortcutList />
        <UrgentNoticeList /> */}
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
      <div className="flex items-center gap-3">
        <PinhouseLogo className="h-7 w-auto" />
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
    <div className="mb-4 flex gap-3">
      <div className="flex flex-1 flex-col gap-3 rounded-lg bg-primary-blue-300 p-4">
        <div className="flex items-center justify-between text-white">
          <p>핀포인트 기준</p>
          <p>아이콘</p>
        </div>
        <div className="flex text-xl font-bold text-white">
          <p>00건</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 rounded-lg bg-orange-300 p-4">
        <div className="flex items-center justify-between text-white">
          <p>자격진단 기준</p>
          <p>아이콘</p>
        </div>
        <div className="flex text-xl font-bold text-white">
          <p>00건</p>
        </div>
      </div>
    </div>
  );
};

const PersonalShortcutList = () => {
  return (
    <section className="flex flex-col gap-3 rounded-3xl bg-white p-5">
      <p className="text-sm font-semibold text-greyscale-grey-900">
        나에게 딱 맞는 지원준비 가이드
      </p>
      {PERSONAL_SHORTCUTS.map(item => (
        <button
          key={item.id}
          className="flex items-center justify-between rounded-2xl border border-greyscale-grey-50 px-4 py-3 text-left"
          type="button"
        >
          <div>
            <p className="text-sm font-semibold text-greyscale-grey-900">{item.title}</p>
            <p className="text-xs text-greyscale-grey-500">{item.description}</p>
          </div>
          <span className="text-lg text-greyscale-grey-400">›</span>
        </button>
      ))}
    </section>
  );
};

const UrgentNoticeList = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-greyscale-grey-900">마감임박 공고</p>
          <p className="text-xs text-greyscale-grey-500">따끈한 공고를 놓치지 마세요</p>
        </div>
        <Link href="/listings" className="text-xs font-semibold text-primary-blue-300">
          전체보기
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
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
      </div>
    </section>
  );
};
