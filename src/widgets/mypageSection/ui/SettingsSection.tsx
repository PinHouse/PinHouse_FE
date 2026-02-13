"use client";

import { logout } from "@/src/features/login/utils/logout";
import {
  MYPAGE_SETTINGS_LOGOUT,
  MYPAGE_SETTINGS_PROFILE,
  MYPAGE_SETTINGS_WITHDRAW,
} from "@/src/features/mypage/model/mypageConstants";
import {
  MypageSettingsMenu,
  type MypageSettingsMenuItem,
} from "@/src/features/mypage/ui";

/**
 * 마이페이지 설정 화면 위젯
 * - 프로필 설정 / 로그아웃 / 회원 탈퇴 메뉴
 */
export const SettingsSection = () => {
  const menuItems: MypageSettingsMenuItem[] = [
    { type: "link", label: MYPAGE_SETTINGS_PROFILE, href: "/mypage/profile" },
    { type: "button", label: MYPAGE_SETTINGS_LOGOUT, onClick: logout },
    { type: "link", label: MYPAGE_SETTINGS_WITHDRAW, href: "/mypage/withdraw" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white px-5">
      <MypageSettingsMenu items={menuItems} />
    </div>
  );
};
