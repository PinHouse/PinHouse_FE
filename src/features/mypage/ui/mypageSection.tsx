"use client";

import { ReactNode } from "react";
import { MypageMenuItem, MypageMenuItemProps } from "./mypageMenuItem";

export interface MypageSectionProps {
    title: string;
    items: MypageMenuItemProps[];
}

export const MypageSection = ({ title, items }: MypageSectionProps) => {
    return (
        <div className="flex flex-col rounded-lg bg-white">
            <div className="pl-4 py-3.5">
                <h2 className="text-sm font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-400">
                    {title}
                </h2>
            </div>
            {items.map((item, index) => (
                <MypageMenuItem key={index} {...item} />
            ))}
        </div>
    );
};

