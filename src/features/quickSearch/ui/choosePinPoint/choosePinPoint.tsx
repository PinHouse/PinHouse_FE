import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import { quickSearchPinPoint, quickSearchPinPointMenu } from "../../model";
import { Input } from "@/src/shared/ui/input/deafult";

import { InputLabel } from "@/src/shared/ui/inputLabel";
import { SearchBar } from "@/src/shared/ui/searchBar";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";

const ChoosePinPoint = () => {
  return (
    <div className="h-full">
      <div className="mt-3 flex w-full flex-col gap-2">
        <DropDown types="myHome" data={quickSearchPinPoint} size="lg" />
        <DropDown types="myHome" data={quickSearchPinPointMenu} size="md" variant="menu" />
        <Input placeholder="핀포인트 1" />
        <InputLabel label="핀포인트 1" direction="vertical" placeholder="핀포인트 1" />
        <InputLabel label="핀포인트 1" direction="horizontal" placeholder="핀포인트 1" />

        <SearchBar
          placeholder="검색어를 입력하세요"
          options={[
            { key: "테스트", value: "테스트" },
            { key: "테스트2", value: "테스트2" },
          ]}
        />
        <SearchBarLabel
          label="검색어를 입력하세요"
          direction="vertical"
          placeholder="검색어를 입력하세요"
          options={[
            { key: "테스트", value: "테스트" },
            { key: "테스트2", value: "테스트2" },
          ]}
        />
        <SearchBarLabel
          label="검색어를 입력하세요"
          direction="horizontal"
          placeholder="검색어를 입력하세요"
          options={[
            { key: "테스트", value: "테스트" },
            { key: "테스트2", value: "테스트2" },
          ]}
        />
        <SearchBar
          variant="capsule"
          placeholder="검색어를 입력하세요"
          options={[
            { key: "테스트", value: "테스트" },
            { key: "테스트2", value: "테스트2" },
          ]}
        />
      </div>
    </div>
  );
};

export default ChoosePinPoint;
