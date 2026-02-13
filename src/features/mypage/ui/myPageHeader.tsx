"use client";

import { SearchLine } from "@/src/assets/icons/home";
import { MYPAGE_HEADER_TITLE } from "@/src/features/mypage/model/mypageConstants";
import { useHomeHeaderHooks } from "@/src/widgets/homeSection/hooks/homeHeaderHooks";
import { useRouter } from "next/navigation";

/**
 * 마이페이지 전용 헤더 (로고 없음, 제목 텍스트만)
 */
export const MyPageHeader = () => {
    const router = useRouter();

    return (
        <header className="flex items-center justify-between py-5" aria-label={MYPAGE_HEADER_TITLE}>
        <h1 className="text-lg font-bold text-greyscale-grey-900">{MYPAGE_HEADER_TITLE}</h1>
        <div className="flex items-center gap-3">
            <button aria-label="검색">
            <SearchLine onClick={() => router.push("/home/search")} />
            </button>
        </div>
        </header>
    );
};
