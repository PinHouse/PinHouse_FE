"use client";
import { HomeLine } from "@/src/assets/icons/home/homeLine";
import { Person, Search } from "@/src/assets/icons/home";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  active: "home" | "search" | "my";
}

const hiddenRoutes = ["/home", "/login", "/onboarding"];
// { active }: BottomNavProps

export const BottomNavigation = () => {
  const pathname = usePathname();
  const shouldHide = hiddenRoutes.some(route => pathname.startsWith(route));
  if (shouldHide) return null;
  return (
    <div className="fixed bottom-0 left-1/2 z-50 h-[88px] w-full max-w-[768px] -translate-x-1/2 border-t bg-white p-7">
      <div className="flex h-full items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-xs">
          <HomeLine />
          <span>홈</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-xs">
          <Search />
          <span>공고 탐색</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-xs">
          <Person />
          <span>마이</span>
        </button>
      </div>
    </div>
  );
};
