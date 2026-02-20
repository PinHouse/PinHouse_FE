"use client";

import { useWithdraw } from "../hooks/useWithdraw";
import { Button } from "@/src/shared/lib/headlessUi/button/button";
import { WITHDRAW_BUTTON_TEXT, WITHDRAW_REASONS, WITHDRAW_TITLE } from "../model/mypageConstants";
import { SurveyButton } from "@/src/shared/ui/button/surveyButton";
import { Modal } from "@/src/shared/ui/modal/default/modal";

const WITHDRAW_REASONS_HEADING_ID = "withdraw-reasons-heading";

export const WithdrawForm = () => {
  const {
    selectedReasons,
    handleReasonsChange,
    handleWithdrawClick,
    handleWithdrawConfirm,
    handleModalCancel,
    isModalOpen,
    isLoading,
  } = useWithdraw();

  const handleModalButtonClick = (buttonIndex: number, _buttonLabel: string) => {
    if (buttonIndex === 0) {
      handleModalCancel();
    } else if (buttonIndex === 1) {
      handleWithdrawConfirm();
    }
  };

  const handleOptionClick = (optionId: string) => {
    const newSelectedIds = selectedReasons.includes(optionId)
      ? selectedReasons.filter(id => id !== optionId)
      : [...selectedReasons, optionId];
    handleReasonsChange(newSelectedIds);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <section aria-labelledby={WITHDRAW_REASONS_HEADING_ID}>
          <h3
            id={WITHDRAW_REASONS_HEADING_ID}
            className="text-base font-semibold leading-[136%] tracking-[-0.02em] text-greyscale-grey-900"
          >
            {WITHDRAW_TITLE}
          </h3>
          <div className="mt-3.5 flex flex-col gap-2">
            {WITHDRAW_REASONS.map(reason => {
              const isSelected = selectedReasons.includes(reason.id);
              return (
                <SurveyButton
                  key={reason.id}
                  title={reason.label}
                  pressed={isSelected}
                  onPressedChange={() => handleOptionClick(reason.id)}
                  className="w-full pl-5 text-sm"
                />
              );
            })}
          </div>
        </section>

        <Button
          type="button"
          variant="solid"
          size="lg"
          radius="md"
          theme="black"
          onClick={handleWithdrawClick}
        >
          {WITHDRAW_BUTTON_TEXT}
        </Button>
      </div>

      <Modal
        type="withdrawConfirm"
        open={isModalOpen}
        onButtonClick={handleModalButtonClick}
        confirmButtonDisabled={isLoading}
      />
    </>
  );
};
