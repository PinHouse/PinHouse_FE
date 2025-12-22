"use client";

import { useState } from "react";
import {
  EligibilityInfoButton,
  EligibilityNumberInputList,
  EligibilityOptionSelector,
  EligibilityPriceInput,
  EligibilitySelect,
} from "@/src/features/eligibility";
import { DatePicker } from "@/src/shared/ui/datePicker/datePicker";

export default function DefaultTest() {
  const [income, setIncome] = useState<string>("");
  const [incomeError, setIncomeError] = useState<boolean>(false);

  // 유효성 검증 예시: 값이 비어있거나 0이면 에러
  const validateIncome = (value: string) => {
    if (!value || value === "0") {
      setIncomeError(true);
    } else {
      setIncomeError(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-10">
      <DatePicker />

      <EligibilityInfoButton text="정보" onClick={() => console.log("정보 클릭")} />
      <EligibilitySelect
        title="혼인 기간이 어떻게 되나요?"
        required
        options={[
          { key: "1", value: "1년 미만" },
          { key: "2", value: "1년 이상 3년 미만" },
          { key: "3", value: "3년 이상" },
        ]}
      />

      <EligibilityNumberInputList
        title="자녀 정보를 알려주세요"
        description="성인 자녀의 경우 입력하지 않아도 됩니다"
        options={[
          {
            id: "under6",
            prefix: "6세 이하 자녀 수",
            postfix: "명",
          },
          {
            id: "over7",
            prefix: "7세 이상 미성년 자녀 수",
            postfix: "명",
          },
        ]}
        summary={values => (
          <>
            총{" "}
            <span className="text-primary-blue-400">
              {Number(values.under6 || 0) + Number(values.over7 || 0)}
            </span>{" "}
            명의 미성년 자녀가 있어요
          </>
        )}
      />

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
      <EligibilityPriceInput
        title="부모님의 월 평균 소득 합계를 알려주세요"
        description="부모님이 이혼중이거나 조부모님과 함께 살고있다면 주 양육자의 소득정보를 알려주세요"
        required
        error={incomeError}
        value={income}
        onChange={value => {
          setIncome(value);
          validateIncome(value);
          console.log("소득 입력:", value);
        }}
        onBlur={() => validateIncome(income)}
      />
    </div>
  );
}
