import type { ModalDescriptMap, ModalDescriptProps } from "./default/type";

export const modalOverlayPreset =
  "fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm";

export const modalContainerPreset = [
  "rounded-xl sm:rounded-xl bg-white p-6 shadow-lg transition-all",
  "w-[90%] min-w-[322px] sm:w-[322px] md:w-[400px] lg:w-[500px]",
] as const;

export const filterScript: ModalDescriptProps = {
  descript: "탐색을 마치지 않으면 \n 입력하신 내용이 저장되지 않아요!",
  btnlabel: ["계속 탐색하기", "나가기"],
};

export const quickSearchEnterCheckScript: ModalDescriptProps = {
  descript: "이전에 탐색한 기록이 있어요!\n 새로 시작할까요?",
  btnlabel: ["새로 시작하기", "결과보기"],
};

export const quickSearchSaveCheckScript: ModalDescriptProps = {
  descript: "탐색을 마치지 않으면 \n 입력하신 내용이 저장되지 않아요!",
  btnlabel: ["계속 탐색하기", "나가기"],
};

export const quickSearchResetAlertScript: ModalDescriptProps = {
  descript: "탐색 결과가 초기화 됩니다.\n 처음부터 다시할까요?",
  btnlabel: ["취소", "다시하기"],
};

export const withdrawConfirmScript: ModalDescriptProps = {
  descript: "회원 탈퇴 시 탈퇴하면\n관심 목록과 자격 진단 기록이 삭제되며\n복구할 수 없습니다.",
  btnlabel: ["취소", "탈퇴하기"],
};

export const discription: ModalDescriptMap = {
  filterSearch: filterScript,
  quickSearchEnterCheck: quickSearchEnterCheckScript,
  quickSearchSaveCheck: quickSearchSaveCheckScript,
  quickSearchResetAlert: quickSearchResetAlertScript,
  withdrawConfirm: withdrawConfirmScript,
};
