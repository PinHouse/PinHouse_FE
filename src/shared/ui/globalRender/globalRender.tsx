"use client";
import { HomeBottomRender } from "@/src/assets/images/render/homeBottom";
import { HomeRectangleRender } from "@/src/assets/images/render/homeRectangle";
import { HomeRectangleRender2 } from "@/src/assets/images/render/homeRectangle_1";
import { HomeStarRender } from "@/src/assets/images/render/homeStar";
import { SecondaryLogoRender } from "@/src/assets/images/render/secondaryLogo";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  bottom?: ReactNode;
}

export const HomeLandingRender = ({ children, bottom }: Props) => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#2F6BFF]">
      {/* 최대 폭 컨테이너 */}
      <div className="mx-auto flex h-full max-w-[1200px] px-20 sm:justify-center md:px-20 lg:justify-between lg:px-20">
        {/* LEFT TEXT */}
        <section className="z-10 hidden max-w-[400px] pt-30 text-white lg:block">
          <div className="mb-10 flex items-center gap-2">
            <SecondaryLogoRender />
          </div>

          <h1 className="mb-6 leading-tight">
            <span className="text-[40px] font-light">모두의 꿈인 내 집 마련!</span>
            <br />
            <span className="text-[44px] font-extrabold text-white">나에게 맞는 추천 집은?</span>
          </h1>

          <p className="relative mb-8 text-lg-19 leading-relaxed text-greyscale-grey-50">
            <span className="absolute left-[500px]">
              <HomeRectangleRender2 width={50} height={50} />
            </span>
            자격 진단을 통해 내가 원하는 조건의 방을
            <br />
            쉽고 빠르게 추천 받아보세요
          </p>

          <div className="relative flex w-full max-w-[300px] flex-wrap gap-2">
            {["빠른조건탐색", "자격진단", "맞춤추천", "비교분석", "방비교"].map(tag => (
              <span
                key={tag}
                className="rounded-full bg-[#8EA8FF99] px-4 py-1 text-xs font-medium backdrop-blur"
              >
                #{tag}
              </span>
            ))}
            <span className="absolute left-[55px] top-80 h-5 w-5">
              <HomeStarRender width={30} height={30} />
              <span className="absolute left-[160px] top-[40px] h-3 w-3 rounded-full bg-white" />
            </span>
          </div>
        </section>

        <section className="relative z-10 flex h-full justify-center sm:p-1 md:py-28 lg:py-28">
          <div className="relative z-10 flex min-h-0 w-[375px] flex-col rounded-[36px] bg-white shadow-2xl">
            <div className="pointer-events-none absolute inset-0 rounded-[36px] border-[6px] border-white" />

            <div
              className={
                "no-scrollbar relative min-h-0 flex-1 overflow-y-auto rounded-b-[36px] rounded-t-[36px] p-3"
              }
            >
              {children}
            </div>

            {bottom && <div className="relative shrink-0">{bottom}</div>}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-[60px] z-0 w-[520px] -translate-x-1/2">
            <HomeBottomRender />
          </div>
          <span className="absolute left-[460px] top-[500px]">
            <HomeRectangleRender width={50} height={50} />
          </span>
        </section>
      </div>
    </div>
  );
};
