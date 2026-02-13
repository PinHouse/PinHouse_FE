"use client";

import { HomeIcon, PersonLine, SearchLine } from "@/src/assets/icons/home";
import { HomeLine } from "@/src/assets/icons/home/homeLine";
import { Search } from "@/src/assets/icons/home/search";
import { useHasRouter } from "@/src/features/listings/model";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
export const FrameBottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { hasListingsTab } = useHasRouter();

  const shouldHide =
    hiddenRoutes.some(route => pathname.startsWith(route)) ||
    hiddenExactRoutes.includes(pathname) ||
    pathname.startsWith("/home/search") ||
    detailPageRegex.test(pathname) ||
    compareDetailPageRegex.test(pathname) ||
    (pathname === "/listings" && hasListingsTab);
  // const searchParams = useSearchParams();
  // const tab = searchParams.get("tab");
  // const shouldHide =
  //   hiddenRoutes.some(route => pathname.startsWith(route)) ||
  //   hiddenExactRoutes.includes(pathname) ||
  //   pathname.startsWith("/home/search") ||
  //   (pathname === "/listings" && tab !== null) ||
  //   detailPageRegex.test(pathname) ||
  //   compareDetailPageRegex.test(pathname) ||
  //   (pathname === "/home" && searchParams.has("mode"));
  const isMypageActive = pathname === "/mypage" || pathname.startsWith("/mypage/");
  if (shouldHide) return null;

  return (
    <nav className="h-[88px] rounded-b-2xl border-t bg-white">
      <div className="flex h-full items-center justify-around">
        <button
          onClick={() => router.push("/home")}
          className="flex flex-col items-center gap-1 text-xs"
        >
          {pathname === "/home" ? (
            <HomeIcon width={25} height={25} />
          ) : (
            <HomeLine width={25} height={25} />
          )}
          <span>홈</span>
        </button>

        <button
          onClick={() => router.push("/listings")}
          className="flex flex-col items-center gap-1 text-xs"
        >
          {pathname === "/listings" ? (
            <Search width={25} height={25} />
          ) : (
            <SearchLine width={25} height={25} />
          )}
          <span>공고 탐색</span>
        </button>

        <button
          onClick={() => router.push("/mypage")}
          className="flex flex-col items-center gap-1 text-xs"
        >
          <PersonLine
            width={25}
            height={25}
            fill={isMypageActive ? "black" : "none"}
          />
          <span>마이</span>
        </button>
      </div>
    </nav>
  );
};
