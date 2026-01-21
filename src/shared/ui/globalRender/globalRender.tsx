import { cn } from "@/lib/utils";
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
  const hasBottom = Boolean(bottom);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#2F6BFF]">
      {/* 최대 폭 컨테이너 */}
      <div className="mx-auto flex h-full max-w-[1350px] px-20 sm:justify-center md:px-20 lg:justify-between lg:px-20">
        {/* LEFT TEXT */}
        <section className="z-10 hidden max-w-[600px] pt-10 text-white lg:block">
          <div className="mb-10 flex items-center gap-2 sm:mb-30 md:mb-10 lg:mb-28">
            <SecondaryLogoRender />
          </div>

          <h1 className="mb-6 leading-tight">
            <span className="text-[55px] font-light">모두의 꿈인 내 집 마련!</span>
            <br />
            <span className="text-[55px] font-extrabold text-white">나에게 맞는 추천 집은?</span>
          </h1>
          <div className="mb-10 h-1 w-[73px] border-2 border-white bg-white" />
          <p className="relative mb-14 text-2xl leading-relaxed text-greyscale-grey-50">
            <span className="absolute left-[600px]">
              <HomeRectangleRender2 width={60} height={60} />
            </span>
            자격 진단을 통해 내가 원하는 조건의 방을
            <br />
            쉽고 빠르게 추천 받아보세요
          </p>

          <div className="relative flex w-full max-w-[300px] flex-wrap gap-2">
            {["빠른조건탐색", "자격진단", "맞춤추천", "비교분석", "방비교"].map(tag => (
              <span
                key={tag}
                className="rounded-full bg-[#8EA8FF99] px-4 py-2 text-xs font-medium backdrop-blur"
              >
                #{tag}
              </span>
            ))}
            <span className="absolute left-[55px] top-56 h-5 w-5">
              <HomeStarRender width={40} height={40} />
              <span className="absolute left-[160px] top-[40px] h-4 w-4 rounded-full bg-white" />
            </span>
          </div>
        </section>

        <section className="relative z-10 flex h-full min-h-[812px] justify-center sm:p-5 md:py-28 lg:py-28">
          <div className="relative z-10 flex min-h-0 w-[375px] flex-col bg-white shadow-2xl sm:rounded-xl sm:p-0 md:rounded-2xl md:p-2 lg:rounded-2xl lg:p-2">
            <div className="pointer-events-none absolute inset-0 rounded-2xl" />

            <div
              className={cn(
                "no-scrollbar relative min-h-0 w-[375px] flex-1 overflow-y-auto rounded-t-2xl",
                !hasBottom && "rounded-b-2xl"
              )}
            >
              {children}
            </div>

            <div className={cn("shrink-0", !hasBottom && "hidden")}>{bottom}</div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-[60px] z-0 w-[520px] -translate-x-1/2">
            <HomeBottomRender />
          </div>
          <div className="absolute left-[470px] top-[600px]">
            <HomeRectangleRender width={50} height={50} />
          </div>
        </section>
      </div>
    </div>
  );
};
