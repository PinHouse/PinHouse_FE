"use client";

import { ReactNode } from "react";
import MyPageArrow from "@/src/assets/icons/mypage/myPageArrow";

export interface MypageMenuItemProps {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
}

export const MypageMenuItem = ({ icon, label, onClick }: MypageMenuItemProps) => {
    return (
        <div>
            <button
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 "
                onClick={onClick}
            >
                <div className="flex gap-2">
                    <div className="flex h-4 w-4 items-center justify-center">{icon}</div>
                    <span className="text-sm font-medium leading-[140%] tracking-[-0.02em] text-greyscale-grey-800">
                        {label}
                    </span>
                </div>
                <MyPageArrow />
            </button>
        </div>
    );
};

