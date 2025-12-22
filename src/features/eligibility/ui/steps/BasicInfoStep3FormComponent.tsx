"use client";

import { EligibilityOptionSelector } from "../common";
import { EligibilityPriceInput } from "../common/eligibilityPriceInput";
import { useEligibilityStore } from "../../model/eligibilityStore";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";

export const BasicInfoStep3FormComponent = () => {
  const {
    hasIncomeWork,
    monthlyIncome,
    isBasicBenefitRecipient,
    benefitTypes,
    setHasIncomeWork,
    setMonthlyIncome,
    setIsBasicBenefitRecipient,
    setBenefitTypes,
  } = useEligibilityStore();

  const handleIncomeWorkChange = (selectedIds: string[]) => {
    const selectedId = selectedIds[0] || null;
    setHasIncomeWork(selectedId);
  };

  const handleMonthlyIncomeChange = (value: string) => {
    setMonthlyIncome(value);
  };

  const handleBasicBenefitChange = (checked: boolean) => {
    setIsBasicBenefitRecipient(checked);
  };

  const handleBenefitTypesChange = (selectedIds: string[]) => {
    setBenefitTypes(selectedIds);
  };

  return (
    <div className="flex w-full flex-col">
      {/* 소득이 발생하는 업무에 종사중인가요? */}
      <div className="mb-10 pt-7">
        <EligibilityOptionSelector
          title="소득이 발생하는 업무에 종사중인가요?"
          description="자영업/알바포함"
          options={[
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ]}
          required={true}
          className=""
          direction="horizontal"
          selectedIds={hasIncomeWork ? [hasIncomeWork] : []}
          onChange={handleIncomeWorkChange}
        />
      </div>

      {/* 내 월평균 소득정보를 알려주세요 */}
      <div className="mb-10">
        <EligibilityPriceInput
          title="내 월평균 소득정보를 알려주세요"
          required={true}
          value={monthlyIncome || undefined}
          onChange={handleMonthlyIncomeChange}
          placeholder="금액을 입력해 주세요"
          className="mb-5"
        />

        {/* 기초급여 수급자 체크박스 */}
        <div className="flex items-center gap-1">
          <Checkbox checked={isBasicBenefitRecipient} onCheckedChange={handleBasicBenefitChange} />
          <label
            htmlFor="basic-benefit"
            className="text-sm font-medium leading-4 tracking-[-0.01em] text-greyscale-grey-500"
            onClick={() => handleBasicBenefitChange(!isBasicBenefitRecipient)}
          >
            기초급여 수급자에요
          </label>
        </div>
      </div>

      {/* 다음중 어떤 사항에 해당하시나요? */}
      <EligibilityOptionSelector
        title="다음중 어떤 사항에 해당하시나요?"
        description="복수 선택 가능"
        options={[
          { id: "1", label: "주거급여 수급자" },
          { id: "2", label: "생계/의료급여 수급자" },
        ]}
        multiselect={2}
        selectedIds={benefitTypes}
        onChange={handleBenefitTypesChange}
      />
    </div>
  );
};
