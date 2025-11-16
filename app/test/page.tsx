import { AddButton, DownButton, OnOffFalse, OnOffTrue, XButton } from "@/src/assets/icons/button";
import { PinCelebration } from "@/src/assets/icons/composites";
import { Alram, Hambarger, HomeIcon } from "@/src/assets/icons/home";
import { LogoIcon } from "@/src/assets/icons/logo";
import { LoadingPin, SearchPin } from "@/src/assets/icons/onboarding";
import { pinPoint } from "@/src/features/onboarding/ui";
import { quickSearchPinPoint, quickSearchPinPointMenu } from "@/src/features/quickSearch";
import ChoosePinPoint from "@/src/features/quickSearch/ui/choosePinPoint/choosePinPoint";
import { Button } from "@/src/shared/ui/button/deafult";
import { Chip } from "@/src/shared/ui/chip/chip";
import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import { Input } from "@/src/shared/ui/input/deafult";
import { InputLabel } from "@/src/shared/ui/inputLabel";

import { Modal } from "@/src/shared/ui/modal/default";
import { SearchBar } from "@/src/shared/ui/searchBar";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";

export default function DefaultTest() {
  return (
    <div className="flex flex-col gap-8 px-8">
      {/* <Button size={"lg"}>다음</Button>
      <Button variant="outline">아웃라인 버튼</Button>
      <Button variant="ghost">고스트 버튼</Button>
      <Button size="lg" variant="solid">
        다음
      </Button>
      <LogoIcon />
      <HomeIcon />
      <Input variant={"outline"} size={"lg"} />
      <LoadingPin />
      <SearchPin />
      <XButton />
      <AddButton />
      <Alram />
      <OnOffTrue />
      <OnOffFalse />
      <Hambarger />
      <PinCelebration /> */}
      {/* <Modal type={"filterSearch"} /> */}

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
      <Chip className="w-fit">핀포인트1</Chip>
    </div>
  );
}
