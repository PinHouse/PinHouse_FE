"use client";

import { EligibilityOptionSelector } from "../common";
import { EligibilitySelect } from "../common/eligibilitySelect";
import { EligibilityStatusBanner } from "../common/eligibilityStatusBanner";
import { useEligibilityStore } from "../../model/eligibilityStore";

export const BasicInfoStep4FormComponent = () => {
  const {
    hasHousingSubscriptionSavings,
    housingSubscriptionPeriod,
    housingSubscriptionPaymentCount,
    totalPaymentAmount,
    setHasHousingSubscriptionSavings,
    setHousingSubscriptionPeriod,
    setHousingSubscriptionPaymentCount,
    setTotalPaymentAmount,
  } = useEligibilityStore();

  const handleHousingSubscriptionSavingsChange = (selectedIds: string[]) => {
    const selectedId = selectedIds[0] || null;
    setHasHousingSubscriptionSavings(selectedId);
  };

  const handlePeriodChange = (key: string, value: string) => {
    setHousingSubscriptionPeriod(key || null);
  };

  const handlePaymentCountChange = (key: string, value: string) => {
    setHousingSubscriptionPaymentCount(key || null);
  };

  const handleTotalPaymentAmountChange = (selectedIds: string[]) => {
    const selectedId = selectedIds[0] || null;
    setTotalPaymentAmount(selectedId);
  };

  return (
    <div className="flex w-full flex-col">
      {/* 청약저축에 가입되어 있나요? */}
      <div className="mb-10 pt-7">
        <EligibilityOptionSelector
          title="청약저축에 가입되어 있나요?"
          options={[
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ]}
          required={true}
          className=""
          direction="horizontal"
          selectedIds={hasHousingSubscriptionSavings ? [hasHousingSubscriptionSavings] : []}
          onChange={handleHousingSubscriptionSavingsChange}
        />
      </div>

      {/* 청약저축 가입 기간을 선택해 주세요 */}
      <div className="mb-10">
        <EligibilitySelect
          title="청약저축 가입 기간을 선택해 주세요"
          options={[
            { key: "1", value: "1년 미만" },
            { key: "2", value: "1년 이상 2년 미만" },
            { key: "3", value: "2년 이상 3년 미만" },
            { key: "4", value: "3년 이상 4년 미만" },
            { key: "5", value: "4년 이상 5년 미만" },
            { key: "6", value: "5년 이상" },
          ]}
          value={housingSubscriptionPeriod || undefined}
          onChange={handlePeriodChange}
          placeholder="선택 안함"
        />
      </div>

      {/* 청약저축 납입횟수를 선택해 주세요 */}
      <div className="mb-10">
        <EligibilitySelect
          title="청약저축 납입횟수를 선택해 주세요"
          options={[
            { key: "1", value: "10회 미만" },
            { key: "2", value: "10회 이상 20회 미만" },
            { key: "3", value: "20회 이상 30회 미만" },
            { key: "4", value: "30회 이상 40회 미만" },
            { key: "5", value: "40회 이상 50회 미만" },
            { key: "6", value: "50회 이상" },
          ]}
          value={housingSubscriptionPaymentCount || undefined}
          onChange={handlePaymentCountChange}
          placeholder="선택 안함"
        />
      </div>

      {/* 총 납입 금액을 알려주세요 */}
      <EligibilityOptionSelector
        title="총 납입 금액을 알려주세요"
        options={[
          { id: "1", label: "6000만원 이상" },
          { id: "2", label: "6000만원 이하" },
        ]}
        required={true}
        direction="vertical"
        selectedIds={totalPaymentAmount ? [totalPaymentAmount] : []}
        onChange={handleTotalPaymentAmountChange}
      />
    </div>
  );
};
