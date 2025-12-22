"use client";

import { EligibilityOptionSelector } from "../common";
import { EligibilityStatusBanner } from "../common/eligibilityStatusBanner";
import { useEligibilityStore } from "../../model/eligibilityStore";

export const BasicInfoStep1FormComponent = () => {
  const { hasKoreanNationality, setHasKoreanNationality } = useEligibilityStore();

  const handleChange = (selectedIds: string[]) => {
    const selectedId = selectedIds[0] || null;
    setHasKoreanNationality(selectedId);
  };

  return (
    <div className="flex w-full flex-col">
      {/* Status Banner */}
      <div className="px-5 py-10">
        <EligibilityStatusBanner
          title="공공 임대주택은 대한민국 국민을"
          description="대상으로 합니다."
        />
      </div>

      {/* bar */}
      <div
        className="mx-[-20px] h-[9px] border-t border-greyscale-grey-50 bg-greyscale-grey-25"
        style={{
          boxSizing: "border-box",
        }}
      />
      <EligibilityOptionSelector
        title={"대한민국 국적을 가지고 계신가요?"}
        options={[
          { id: "1", label: "예" },
          { id: "2", label: "아니오" },
        ]}
        required={true}
        className="py-7"
        direction="horizontal"
        selectedIds={hasKoreanNationality ? [hasKoreanNationality] : []}
        onChange={handleChange}
      />
    </div>
  );
};
