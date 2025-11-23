import { AddButton, DownButton, OnOffFalse, OnOffTrue, XButton } from "@/src/assets/icons/button";
import { SurveyIcon } from "@/src/assets/icons/button/surveyIcon";

import { PinCelebration } from "@/src/assets/icons/composites";
import { Alram, Hambarger, HomeIcon } from "@/src/assets/icons/home";
import { LogoIcon } from "@/src/assets/icons/logo";
import { LoadingPin, SearchPin } from "@/src/assets/icons/onboarding";
import { pinPoint } from "@/src/features/onboarding/ui";
import { quickSearchPinPoint, quickSearchPinPointMenu } from "@/src/features/quickSearch";
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
    <div className="flex flex-col gap-8 px-8">
      {/* <Modal type={"filterSearch"} /> */}
      <SurveyButton title="보기 텍스트" size="md" />
      <SurveyButton title="보기 텍스트" size="sm" />
      <SurveyButton title="보기 텍스트" description="설명 텍스트" size="md" />
      <SurveyButton title="보기 텍스트" icon={<SurveyIcon />} size="md" />
      <SurveyButton title="보기 텍스트" description="설명 텍스트" icon={<SurveyIcon />} size="md" />

      <Button variant="solid" size="md" theme="mainBlue">
        다음
      </Button>
      <Button variant="solid" size="md" theme="mainBlue" disabled>
        다음
      </Button>
      <Button variant="solid" size="md" theme="subBlue">
        다음
      </Button>

      <Button variant="solid" size="md" theme="black">
        다음2
      </Button>
      <Button variant="solid" size="md" theme="red">
        다음
      </Button>

      <DropDown types="myHome" data={quickSearchPinPoint} size="lg" />
      <DropDown types="myHome" data={quickSearchPinPointMenu} size="md" variant="menu" />
      <Input placeholder="Input Test" />
      <Input placeholder="에러 상태 테스트- 억지로 에러 상태 고정" variant={"error"} />

      <InputLabel label="인풋+라벨 vertical" direction="vertical" placeholder="핀포인트 1" />
      <InputLabel label="인풋+라벨 horizontal" direction="horizontal" placeholder="핀포인트 1" />

      <SearchBar
        placeholder="searchBar Test"
        options={[
          { key: "테스트", value: "테스트" },
          { key: "테스트2", value: "테스트2" },
        ]}
      />
      <SearchBarLabel
        label="서치바 + vertical"
        direction="vertical"
        placeholder="검색어를 입력하세요"
        options={[
          { key: "테스트", value: "테스트" },
          { key: "테스트2", value: "테스트2" },
        ]}
      />
      <SearchBarLabel
        label="서치바 + horizontal"
        direction="horizontal"
        placeholder="검색어를 입력하세요"
        options={[
          { key: "테스트", value: "테스트" },
          { key: "테스트2", value: "테스트2" },
        ]}
      />
      <SearchBar
        variant="capsule"
        placeholder="서치 바 캡슐"
        options={[
          { key: "테스트", value: "테스트" },
          { key: "테스트2", value: "테스트2" },
        ]}
      />
    </div>
  );
}
