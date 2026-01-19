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
        <div className="border-t border-greyscale-grey-50">
            <button
                className="flex w-full items-center justify-between px-5 py-4"
                onClick={onClick}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center">{icon}</div>
                    <span className="text-sm font-medium leading-5 tracking-[-0.01em] text-greyscale-grey-900">
                        {label}
                    </span>
                </div>
                <MyPageArrow />
            </button>
        </div>
    );
};

