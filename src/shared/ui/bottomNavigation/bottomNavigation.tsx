"use client";
import { Suspense } from "react";
import { HomeLine } from "@/src/assets/icons/home/homeLine";
import { Person, Search } from "@/src/assets/icons/home";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/src/shared/ui/spinner/default";

const hiddenRoutes = ["/login", "/onboarding", "/listings/search"];
const hiddenExactRoutes = [
  "/listings?tab=region",
  "/listings?tab=target",
  "/listings?tab=rental",
  "/listings?tab=housing",
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
];
const detailPageRegex = /^\/listings\/[A-Za-z0-9_-]+$/;

function BottomNavigationContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const currentPath = queryString ? `${pathname}?${queryString}` : pathname;
  const router = useRouter();
  const shouldHide =
    hiddenRoutes.some(route => pathname.startsWith(route)) ||
    hiddenExactRoutes.includes(currentPath) ||
    detailPageRegex.test(pathname);

  if (shouldHide) return null;
  return (
    <div className="fixed bottom-0 left-1/2 z-50 h-[88px] w-full max-w-[768px] -translate-x-1/2 border-t bg-white p-7">
      <div className="flex h-full items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-xs">
          <HomeLine width={25} height={25} onClick={() => router.push("/home")} />
          <span>홈</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-xs">
          <Search width={25} height={25} onClick={() => router.push("/listings")} />
          <span>공고 탐색</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-xs">
          <Person width={25} height={25} />
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
