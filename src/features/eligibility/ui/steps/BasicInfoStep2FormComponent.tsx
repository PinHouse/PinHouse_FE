"use client";

import { DatePicker } from "@/src/shared/ui/datePicker/datePicker";
import { EligibilityOptionSelector } from "../common";
import { EligibilityStatusBanner } from "../common/eligibilityStatusBanner";
import { useEligibilityStore } from "../../model/eligibilityStore";

export const BasicInfoStep2FormComponent = () => {
  const { gender, birthDate, setGender, setBirthDate } = useEligibilityStore();

  const handleGenderChange = (selectedIds: string[]) => {
    const selectedId = selectedIds[0] || null;
    setGender(selectedId);
  };

  const handleBirthDateChange = (date: Date | undefined) => {
    setBirthDate(date || null);
  };

  return (
    <div className="flex w-full flex-col">
      {/* Status Banner */}
      <div className="px-5 py-10">
        <EligibilityStatusBanner title="먼저 나의 기본정보를 알아볼게요!" description={""} />
      </div>

      {/* bar */}
      <div
        className="mx-[-20px] h-[9px] border-t border-greyscale-grey-50 bg-greyscale-grey-25"
        style={{
          boxSizing: "border-box",
        }}
      />

      <EligibilityOptionSelector
        title={"성별을 선택해주세요"}
        options={[
          { id: "1", label: "남성" },
          { id: "2", label: "여성" },
        ]}
        required={true}
        className="py-7"
        direction="horizontal"
        selectedIds={gender ? [gender] : []}
        onChange={handleGenderChange}
      />
      <div className="w-full px-5">
        <DatePicker
          value={birthDate}
          onChange={handleBirthDateChange}
          label="생년월일을 선택해주세요"
          placeholder="생년월일 선택"
        />
      </div>
    </div>
  );
};
