"use client";

import Image from "next/image";
import { ProfileDefaultImg } from "@/src/assets/images/mypage/ProfileDefaultImg";
import SettingsIcon from "@/src/assets/icons/mypage/settingsIcon";

interface UserInfoCardProps {
    imageUrl?: string | null;
    userName?: string;
    userEmail?: string;
    onSettingsClick?: () => void;
}

export const UserInfoCard = ({ 
    imageUrl, 
    userName = "유저명", 
    userEmail = "userid@naver.com",
    onSettingsClick 
}: UserInfoCardProps) => {
    return (
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-4 gap-3">
            <div className="relative overflow-hidden rounded-full">
                {imageUrl ? (
                    <Image 
                        src={imageUrl} 
                        alt="프로필 사진" 
                        fill 
                        className="object-cover" 
                    />
                ) : (
                    <div className="flex items-center justify-center h-10 w-10 bg-greyscale-grey-50">
                        <ProfileDefaultImg width={25} height={25} />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-lg font-semibold leading-[132%] tracking-[-0.01em] text-greyscale-grey-900">
                    {userName}
                </span>
                <span className="text-xs-12 font-medium text-greyscale-grey-400">
                    {userEmail}
                </span>
            </div>
            <button aria-label="설정" onClick={onSettingsClick}>
                <SettingsIcon />
            </button>
        </div>
    );
};
