"use client";

import Link from "next/link";

const ITEM_CLASS =
  "font-regular block w-full px-5 py-3 text-base leading-[140%] tracking-[-0.02em] text-greyscale-grey-900 hover:no-underline";
const DIVIDER_CLASS =
  "-mx-[20px] h-[9px] border-t border-greyscale-grey-50 bg-greyscale-grey-25";

export type MypageSettingsMenuItem =
  | { type: "link"; label: string; href: string }
  | { type: "button"; label: string; onClick: () => void };

export interface MypageSettingsMenuProps {
  items: MypageSettingsMenuItem[];
}

export const MypageSettingsMenu = ({ items }: MypageSettingsMenuProps) => {
  return (
    <div className="flex flex-col" role="menu" aria-label="설정 메뉴">
      {items.map((item, index) => (
        <span key={index}>
          {index == 1 && <div className={DIVIDER_CLASS} />}
          {item.type === "link" ? (
            <Link href={item.href} className={ITEM_CLASS}>
              {item.label}
            </Link>
          ) : (
            <button
              type="button"
              className={`${ITEM_CLASS} text-left`}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          )}
        </span>
      ))}
    </div>
  );
};
