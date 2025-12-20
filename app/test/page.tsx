"use client";

import { EligibilityOptionSelector } from "@/src/features/eligibility";

export default function DefaultTest() {
  return (
    <div className="flex flex-col gap-4 px-4 py-10">
      <EligibilityOptionSelector
        title="대한민국 국적을 가지고 계신가요?"
        required
        direction="horizontal"
        options={[
          { id: "1", label: "예" },
          { id: "2", label: "아니오" },
        ]}
        onChange={() => console.log("옵션 선택")}
      />
      <EligibilityOptionSelector
        title="소득이 발생하는 업무에 종사중인가요?"
        required
        description="자영업/알바포함"
        direction="horizontal"
        options={[
          { id: "1", label: "예" },
          { id: "2", label: "아니오" },
        ]}
        onChange={() => console.log("옵션 선택")}
      />
      <EligibilityOptionSelector
        title="다음중 어떤 사항에 해당하시나요?"
        required
        description="기혼일 경우 배우자와 분리된 세대에 거주하더라도 같은 세대로 간주합니다."
        direction="vertical"
        multiselect={2}
        options={[
          { id: "1", label: "주거급여 수급자" },
          { id: "2", label: "생계/의료급여 수급자" },
        ]}
        onChange={() => console.log("옵션 선택")}
      />
      <EligibilityOptionSelector
        title="다음 중 선택"
        required
        direction="vertical"
        options={[
          { id: "1", label: "해당 사항이 없어요" },
          { id: "2", label: "자녀가 있는 미성년 세대주" },
          { id: "3", label: "부모 등 보호자의 부재로 형ㅈ자매를 부양하는미성년 세대주" },
          { id: "4", label: "외국인 한부모 가족의 미성년 세대주(내국인 자녀)" },
        ]}
        onChange={() => console.log("옵션 선택")}
      />
    </div>
  );
}
