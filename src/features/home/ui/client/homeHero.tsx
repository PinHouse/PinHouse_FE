"use client";
import { useOAuthStore } from "../../../login/model";

export const HomeHero = () => {
  const { userName } = useOAuthStore();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold leading-tight text-greyscale-grey-900">
        {userName}님에게 맞는 <br /> 임대주택을 확인해 보세요
      </p>
    </div>
  );
};
