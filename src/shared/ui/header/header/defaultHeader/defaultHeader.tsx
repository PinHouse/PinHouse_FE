"use client";

import { CloseButton, LeftButton } from "@/src/assets/icons/button";
import { useRouteStore } from "@/src/features/home/model/homeStore";
import { useDefaultHeader } from "@/src/shared/ui/header/header/defaultHeader/useDefaultHeader";

type DefaultHeaderProps = {
  title: string;
  /** 뒤로가기 시 이동할 경로  */
  path?: string;
  /** true면 우측 X 버튼 + onCloseClick 사용, false면 좌측 뒤로가기 + path 사용 */
  showCloseButton?: boolean;
  /** showCloseButton이 true일 때 X 버튼 클릭 시 호출 */
  onCloseClick?: () => void;
};

export const DefaultHeader = ({
  title,
  path = "/home",
  showCloseButton = false,
  onCloseClick,
}: DefaultHeaderProps) => {
  const { prevPath, reset } = useRouteStore();
  const { handleRouter } = useDefaultHeader({
    path,
    prevPath,
    reset,
  });

  if (showCloseButton && onCloseClick) {
    return (
      <div className="flex w-full items-center justify-between gap-2">
        <LeftButton
          onClick={handleRouter}
          className="h-7 w-7 cursor-pointer text-greyscale-grey-200"
        />
        <p className="font-suit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
          {title}
        </p>
        <CloseButton
          onClick={onCloseClick}
          className="h-7 w-7 cursor-pointer justify-end text-greyscale-grey-200"
        />
      </div>
    );
  }

  return (
    <>
      <LeftButton
        onClick={handleRouter}
        className="h-7 w-7 cursor-pointer text-greyscale-grey-200"
      />
      <p className="font-suit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
        {title}
      </p>
    </>
  );
};
