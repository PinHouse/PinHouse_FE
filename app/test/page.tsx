"use client";
import { AddButton, DownButton, OnOffFalse, OnOffTrue, XButton } from "@/src/assets/icons/button";
import { SurveyIcon } from "@/src/assets/icons/button/surveyIcon";

import { PinCelebration } from "@/src/assets/icons/composites";
import { Alram, Hambarger, HomeIcon } from "@/src/assets/icons/home";
import { LogoIcon } from "@/src/assets/icons/logo";
import { LoadingPin, SearchPin } from "@/src/assets/icons/onboarding";
import { pinPoint } from "@/src/features/onboarding/ui";
import {
  quickSearchPinPoint,
  quickSearchPinPointMenu,
  QuickSearchRecommendCard,
} from "@/src/features/quickSearch";
import ChoosePinPoint from "@/src/features/quickSearch/ui/choosePinPoint/choosePinPoint";
import { Button, buttonVariants } from "@/src/shared/lib/headlessUi";
import { SurveyButton } from "@/src/shared/ui/button/surveyButton/surveyButton";

import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import { Input } from "@/src/shared/ui/input/deafult";
import { InputLabel } from "@/src/shared/ui/inputLabel";

import { Modal } from "@/src/shared/ui/modal/default";
import { SearchBar } from "@/src/shared/ui/searchBar";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { QuickSearchRecommendedRoomCard } from "@/src/features/quickSearch/ui/common/quickSearchRecommendedRoomCard";

export default function DefaultTest() {
  return (
    <div className="flex flex-col gap-4 px-4 py-10">
      <QuickSearchRecommendCard
        tag="대학생"
        complexName="단지 이름 최대 한줄 넘어가면 자동으로 잘려서 표시됩니다"
        distanceHours={0}
        distanceMinutes={0}
        deposit={0}
        monthlyRent={0}
        exclusiveArea={0}
        recruitmentUnits={0}
        infrastructureTags={["인프라", "인프라", "인프라", "인프라", "인프라"]}
        onGoToAnnouncement={() => console.log("공고 바로가기 클릭")}
      />

      {/* 추천 방 카드 아이템 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">추천 방 카드 아이템</h2>

        {/* 기본 카드 */}
        <QuickSearchRecommendedRoomCard
          id="1"
          thumbnailUrl="http://localhost:3000/area.png"
          name="서울시 강남구 아파트"
          supplier="행복주택"
          location="서울시 강남구 역삼동"
          price="보증금 5,000만원 / 월 50만원"
          tags={["신혼부부", "청년"]}
          onClick={id => console.log("카드 클릭:", id)}
        />

        {/* 이미지 있는 카드 */}
        <QuickSearchRecommendedRoomCard
          id="2"
          thumbnailUrl="http://localhost:3000/area.png"
          name="서울시 송파구 오피스텔"
          supplier="공공임대"
          location="서울시 송파구 잠실동"
          price="보증금 3,000만원 / 월 40만원"
          tags={["다자녀", "무주택자"]}
          onClick={id => console.log("카드 클릭:", id)}
        />

        {/* 최소 정보만 있는 카드 */}
        <QuickSearchRecommendedRoomCard
          id="3"
          name="서울시 마포구 다세대주택"
          price="보증금 2,000만원 / 월 30만원"
          onClick={id => console.log("카드 클릭:", id)}
        />

        {/* 태그가 많은 카드 */}
        <QuickSearchRecommendedRoomCard
          id="4"
          thumbnailUrl="http://localhost:3000/area.png"
          name="서울시 용산구 연립주택"
          supplier="민간임대"
          location="서울시 용산구 이태원동"
          price="보증금 1,000만원 / 월 20만원"
          tags={["청년", "대학생", "무주택자", "신혼부부"]}
          onClick={id => console.log("카드 클릭:", id)}
        />
      </div>
    </div>
  );
}
