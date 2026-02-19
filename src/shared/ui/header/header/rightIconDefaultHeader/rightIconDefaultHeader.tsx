"use client";

import { CloseButton, LeftButton } from "@/src/assets/icons/button";

type RightIconDefaultHeaderProps = {
  title: string;
  onRightClick: () => void;
};

export const RightIconDefaultHeader = ({ title, onRightClick }: RightIconDefaultHeaderProps) => {
  return (
    <div className="flex w-full flex-row-reverse items-center justify-start gap-2">
      <p className="font-suit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
        {title}
      </p>
      <CloseButton
        onClick={onRightClick}
        className="h-7 w-7 cursor-pointer justify-end text-greyscale-grey-200"
      />
    </div>
  );
};
