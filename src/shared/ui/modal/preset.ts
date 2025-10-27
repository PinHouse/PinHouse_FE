import type { ModalDescriptMap, ModalDescriptProps } from "./default/type";

export const modalOverlayPreset =
  "fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm";

export const modalContainerPreset = [
  "rounded-xl bg-white p-6 shadow-lg transition-all",
  "w-[90%] min-w-[322px] sm:w-[322px] md:w-[400px] lg:w-[500px]",
] as const;

export const filterScript: ModalDescriptProps = {
  descript: "탐색을 마치지 않으면 \n 입력하신 내용이 저장되지 않아요!",
  btnlabel: ["계속 탐색하기", "나가기"],
};

export const discription: ModalDescriptMap = {
  filterSearch: filterScript,
};
