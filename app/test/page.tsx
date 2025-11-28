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
    </div>
  );
}
