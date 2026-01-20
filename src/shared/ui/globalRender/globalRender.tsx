"use client";

import React from "react";
import { SecondaryLogoRender } from "@/src/assets/images/render/secondaryLogo";
import { HomeBottomRender } from "@/src/assets/images/render/homeBottom";
import { HomeStarRender } from "@/src/assets/images/render/homeStar";
import { HomeRectangleRender } from "@/src/assets/images/render/homeRectangle";
import { HomeRectangleRender2 } from "@/src/assets/images/render/homeRectangle_1";

interface GlobalRenderProps {
  children: React.ReactNode;
}

/**
 * 홈 랜딩 전용 글로벌 렌더 (최종 안정판)
 * - viewport 기준 height 체인 완성
 * - flex + scroll 조합 min-h-0 적용
 * - 폰 영역 절대 안 넘어감
 * - children 내부만 스크롤
 */
export const GlobalRender = ({ children }: GlobalRenderProps) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex overflow-hidden bg-primary-blue-300">
      {/* LEFT EMPTY */}
      <div className="flex-[1]" />

      {/* CENTER : ⭐ 세로 기준 컨테이너 */}
      <div className="flex h-full min-h-0 flex-[3] flex-col">
        <div className="shrink-0 px-20 py-10 pb-1">
          <SecondaryLogoRender />
        </div>

        {/* CONTENT AREA : 남은 세로 전부 */}
        <div className="min-h-0 flex-1">
          {/* padding은 height 계산 이후 */}
          <div className="flex h-full min-h-0 p-20">
            {/* LEFT TEXT */}
            <div className="flex-1 overflow-hidden py-30 text-white">
              <p className="mb-2 text-[60px] font-light leading-tight">모두의 꿈인 내 집 마련!</p>

              <h1 className="mb-5 text-[60px] font-extrabold leading-tight">
                나에게 맞는 추천 집은?
              </h1>

              <div className="mb-5 h-[3px] w-14 bg-white" />

              <p className="text-[15px] leading-relaxed text-white/90">
                자격 진단을 통해 내가 원하는 조건의 방을
                <br />
                쉽고 빠르게 추천 받아보세요
              </p>

              <div className="mt-7 grid max-w-[450px] grid-cols-3 gap-2">
                {["#빠른조건탐색", "#자격진단", "#맞춤추천", "#비교분석", "#방비교"].map(tag => (
                  <span
                    key={tag}
                    className="w-fit rounded-full bg-primary-blue-100 px-5 py-2 font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex min-h-0 flex-1">
              <div className="flex h-full min-h-0 items-start">
                <div className="pointer-events-auto h-full min-h-0 w-[520px] rounded-[28px] border border-primary-blue-50 bg-white shadow-md-16">
                  <div className="h-full min-h-0 overflow-hidden rounded-[28px]">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT EMPTY */}
      <div className="flex-[1]" />

      <div className="absolute right-[0%] top-[60%]">
        <HomeRectangleRender />
      </div>

      {/* <div className="absolute right-[4%] top-[55%]">
        <HomeRectangleRender2 />
      </div> */}

      <div className="absolute right-[1%] top-[50%] h-5 w-5 rounded-full bg-greyscale-grey-50" />
      <div className="absolute bottom-[20%] left-[35%] h-5 w-5 rounded-full bg-greyscale-grey-50" />

      <div className="absolute bottom-[25%] left-[20%]">
        <HomeStarRender />
      </div>

      {/* <div className="absolute -bottom-24 left-1/2 -translate-x-1/2">
        <HomeBottomRender />
      </div> */}
    </div>
  );
};

export default GlobalRender;
