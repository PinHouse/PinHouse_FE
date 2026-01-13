"use client";

import { useWithdraw } from "../hooks/useWithdraw";
import { Button } from "@/src/shared/lib/headlessUi/button/button";
import { WITHDRAW_BUTTON_TEXT, WITHDRAW_REASONS, WITHDRAW_TITLE } from "../model/mypageConstants";
import { SurveyButton } from "@/src/shared/ui/button/surveyButton";
import { Modal } from "@/src/shared/ui/modal/default/modal";

export const WithdrawForm = () => {
  const {
    selectedReason,
    setSelectedReason,
    handleWithdrawClick,
    handleWithdrawConfirm,
    handleModalCancel,
    isModalOpen,
  } = useWithdraw();

  const handleModalButtonClick = (buttonIndex: number, buttonLabel: string) => {
    if (buttonIndex === 0) {
      // 취소 버튼
      handleModalCancel();
    } else if (buttonIndex === 1) {
      console.log("탈퇴하기 버튼 클릭됨");
      // 탈퇴하기 버튼
      handleWithdrawConfirm();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* 탈퇴 사유 선택 */}
        <div className="flex flex-col gap-3.5">
          <h3 className="text-base font-semibold leading-[136%] tracking-[-0.02em] text-greyscale-grey-900">
            {WITHDRAW_TITLE}
          </h3>
          <div className="flex flex-col gap-2">
            {WITHDRAW_REASONS.map(reason => {
              const isSelected = selectedReason === reason.id;
              return (
                <SurveyButton
                  key={reason.id}
                  title={reason.label}
                  pressed={isSelected}
                  onPressedChange={() => setSelectedReason(reason.id)}
                  className={"w-full pl-5 text-sm"}
                />
              );
            })}
          </div>
        </div>

        {/* 탈퇴하기 버튼 */}
        <Button
          variant="solid"
          size="lg"
          radius="md"
          theme="black"
          onClick={() => {
            console.log("버튼 onClick 실행됨");
            console.log("isModalOpen:", isModalOpen);
            handleWithdrawClick();
            console.log("handleWithdrawClick 호출 후");
          }}
        >
          {WITHDRAW_BUTTON_TEXT}
        </Button>
      </div>

      {/* 탈퇴 확인 모달 */}
      <Modal type="withdrawConfirm" open={isModalOpen} onButtonClick={handleModalButtonClick} />
    </>
  );
};
