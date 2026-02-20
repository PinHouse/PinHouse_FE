"use client";
import { Suspense } from "react";
import { HomeLine } from "@/src/assets/icons/home/homeLine";
import { HomeIcon, PersonLine, SearchLine } from "@/src/assets/icons/home";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { Search } from "@/src/assets/icons/home/search";

const hiddenRoutes = ["/login", "/onboarding", "/listings/search"];
const hiddenExactRoutes = [
  "/quicksearch/init",
  "/quicksearch/choosePinPoint",
  "/quicksearch/chooseDistance",
  "/quicksearch/chooseLivingNumber",
  "/quicksearch/chooseRoomSize",
  "/quicksearch/chooseBudget",
  "/quicksearch/chooseEnvironment",
  "/quicksearch/chooseHomeType",
  "/quicksearch/chooseCondition",
  "/quicksearch/result",
  "/test",
  "/mypage/withdraw",
  "/home/search",
];
const detailPageRegex = /^\/listings\/[A-Za-z0-9_-]+$/;
const compareDetailPageRegex = /^\/listings\/[A-Za-z0-9_-]+\/compare$/;

function BottomNavigationContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const router = useRouter();
  const shouldHide =
    hiddenRoutes.some(route => pathname.startsWith(route)) ||
    hiddenExactRoutes.includes(pathname) ||
    pathname.startsWith("/home/search") ||
    (pathname === "/listings" && tab !== null) ||
    detailPageRegex.test(pathname) ||
    compareDetailPageRegex.test(pathname) ||
    (pathname === "/home" && searchParams.has("mode"));

  const isMypageActive = pathname === "/mypage" || pathname.startsWith("/mypage/");
  if (shouldHide) return null;
  return (
    <div className="fixed bottom-0 left-1/2 z-50 h-[88px] w-full max-w-[768px] -translate-x-1/2 border-t bg-white p-7">
      <div className="flex h-full items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-xs">
          {pathname === "/home" ? (
            <HomeIcon width={25} height={25} onClick={() => router.push("/home")} />
          ) : (
            <HomeLine width={25} height={25} onClick={() => router.push("/home")} />
          )}
          <span>홈</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-xs">
          {pathname === "/listings" ? (
            <Search width={25} height={25} onClick={() => router.push("/listings")} />
          ) : (
            <SearchLine width={25} height={25} onClick={() => router.push("/listings")} />
          )}
          <span>공고 탐색</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-xs">
          <PersonLine
            width={25}
            height={25}
            onClick={() => router.push("/mypage")}
            fill={isMypageActive ? "black" : "none"}
          />
          <span>마이</span>
        </button>
      </div>
    </div>
  );
}

export const BottomNavigation = () => {
  return (
    <Suspense fallback={<Spinner title="로딩 중" description="페이지를 불러오는 중입니다" />}>
      <BottomNavigationContent />
    </Suspense>
  );
};
