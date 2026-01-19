"use client";

import { ReactNode } from "react";
import { MypageMenuItem, MypageMenuItemProps } from "./mypageMenuItem";

export interface MypageSectionProps {
    title: string;
    items: MypageMenuItemProps[];
}

export const MypageSection = ({ title, items }: MypageSectionProps) => {
    return (
        <div className="flex flex-col gap-0 rounded-lg bg-white">
            <div className="px-5 py-4">
                <h2 className="text-base font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
                    {title}
                </h2>
            </div>
            {items.map((item, index) => (
                <MypageMenuItem key={index} {...item} />
            ))}
        </div>
    );
};

