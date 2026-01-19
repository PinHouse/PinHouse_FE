"use client";

import { SearchLine } from "@/src/assets/icons/home";
import { ProfileDefaultImg } from "@/src/assets/images/mypage/ProfileDefaultImg";
import Image from "next/image";
import SettingsIcon from "@/src/assets/icons/mypage/settingsIcon";
import FootPrintIcon from "@/src/assets/icons/mypage/footPrintIcon";
import MapPinIcon from "@/src/assets/icons/mypage/mapPinIcon";
import RecentIcon from "@/src/assets/icons/mypage/recentIcon";
import PinsetIcon from "@/src/assets/icons/mypage/pinsetIcon";
import { MypageSection } from "@/src/features/mypage/ui";


export default function MypagePage() {
    const imageUrl = null;
    return (
        <div className="flex min-h-screen flex-col bg-greyscale-grey-25">
            {/* 헤더 */}
            <header className="flex items-center justify-between bg-white px-5 py-4">
                <h1 className="text-lg font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
                    마이 페이지
                </h1>
                <button aria-label="검색">
                    <SearchLine />
                </button>
            </header>

            <div className="flex flex-col gap-4 px-5 py-6">
                {/* 사용자 정보 카드 */}
                <div className="flex items-center justify-between rounded-lg bg-white px-5 py-4">
                    <div className="flex items-center gap-4">
                        <div className="relative h-[4.75rem] w-[4.75rem] overflow-hidden rounded-full bg-greyscale-grey-100">
                            {imageUrl ? (
                                <Image src={imageUrl} alt="프로필 사진" fill className="object-cover" sizes="96px" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-greyscale-grey-50">
                                    <ProfileDefaultImg />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
                                유저명
                            </span>
                            <span className="text-sm font-medium leading-4 tracking-[-0.01em] text-greyscale-grey-500">
                                userid@naver.com
                            </span>
                        </div>
                    </div>
                    <button aria-label="설정">
                        <SettingsIcon />
                    </button>
                </div>

                {/* 핀 보고서 섹션 */}
                <div className="flex flex-col gap-3 rounded-lg bg-white px-5 py-4">
                    <h2 className="text-base font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
                        핀 보고서
                    </h2>
                    <p className="text-sm font-medium leading-5 tracking-[-0.01em] text-greyscale-grey-600">
                        자격진단으로
                        <br />
                        임대주택 지원 가능 여부를 확인하고
                        <br />
                        맞춤 보고서를 받아보세요
                    </p>
                    <button className="flex items-center gap-2 rounded-lg bg-primary-blue-300 px-4 py-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-danger-400">
                            <span className="text-xs font-semibold text-white">1</span>
                        </div>
                        <span className="text-sm font-semibold leading-5 tracking-[-0.01em] text-white">
                            자격진단 하러가기
                        </span>
                    </button>
                </div>

                {/* 내 정보 섹션 */}
                <MypageSection
                    title="내 정보"
                    items={[
                        {
                            icon: <FootPrintIcon />,
                            label: "관심 주변 환경 설정",
                            onClick: () => {
                                // TODO: 네비게이션 구현
                            },
                        },
                        {
                            icon: <MapPinIcon />,
                            label: "핀포인트 설정",
                            onClick: () => {
                                // TODO: 네비게이션 구현
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
                                // TODO: 네비게이션 구현
                            },
                        },
                        {
                            icon: <RecentIcon />,
                            label: "최근 본 공고",
                            onClick: () => {
                                // TODO: 네비게이션 구현
                            },
                        },
                    ]}
                />
            </div>
        </div>
    );
}

