"use client";

import { SearchLine } from "@/src/assets/icons/home";
import FootPrintIcon from "@/src/assets/icons/mypage/footPrintIcon";
import MapPinIcon from "@/src/assets/icons/mypage/mapPinIcon";
import RecentIcon from "@/src/assets/icons/mypage/recentIcon";
import PinsetIcon from "@/src/assets/icons/mypage/pinsetIcon";
import { MypageSection, UserInfoCard, PinReportSection } from "@/src/features/mypage/ui";
import { useRouter } from "next/navigation";
import { useOAuthStore } from "@/src/features/login/model/authStore";


export default function MypagePage() {
    const { userName } = useOAuthStore();
    const imageUrl = null;
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen gap-5 px-5 pb-6 bg-greyscale-grey-25">
            {/* 사용자 정보 카드 */}
            <UserInfoCard 
                imageUrl={imageUrl}
                userName={userName}
                userEmail="백엔드에서이메일정보전달필요@naver.com"
                onSettingsClick={() => {
                    router.push("/mypage/settings");
                }}
            />

            {/* 핀 보고서 섹션 */}
            <PinReportSection
                onDiagnosisClick={() => {
                    router.push("/eligibility");
                }}
            />

            {/* 내 정보 섹션 */}
            <MypageSection
                title="내 정보"
                items={[
                    {
                        icon: <FootPrintIcon />,
                        label: "관심 주변 환경 설정",
                        onClick: () => {
                            alert("관심 주변 환경 설정 미구현 상태");
                            // TODO: 네비게이션 구현
                        },
                    },
                    {
                        icon: <MapPinIcon />,
                        label: "핀포인트 설정",
                        onClick: () => {
                            router.push("/mypage/pinpoints");
                        },
                    },
                ]}
            />

            {/* 내 활동 섹션 */}
            <MypageSection
                title="내 활동"
                items={[
                    {
                        icon: <PinsetIcon />,
                        label: "저장 목록",
                        onClick: () => {
                            alert("저장 목록 이동 미구현 상태");
                            // TODO: 네비게이션 구현
                        },
                    },
                    {
                        icon: <RecentIcon />,
                        label: "최근 본 공고",
                        onClick: () => {
                            alert("최근 본 공고 이동 미구현 상태");
                            // TODO: 네비게이션 구현
                        },
                    },
                ]}
            />
        </div>
    );
}

