import { HomeBottomRender } from "@/src/assets/images/render/homeBottom";
import { HomeRectangleRender } from "@/src/assets/images/render/homeRectangle";
import { HomeRectangleRender2 } from "@/src/assets/images/render/homeRectangle_1";
import { HomeStarRender } from "@/src/assets/images/render/homeStar";
import { SecondaryLogoRender } from "@/src/assets/images/render/secondaryLogo";
import { MobileFrameWithSheetPortal } from "@/src/shared/ui/globalRender/mobileFrameWithSheetPortal";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  bottom?: ReactNode;
}

export const HomeLandingRender = ({ children, bottom }: Props) => {
  const hasBottom = Boolean(bottom);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#2F6BFF]">
      <div className="mx-auto flex h-full max-w-[1350px] px-20 sm:justify-center md:px-20 lg:justify-between lg:px-20">
        <section className="z-10 hidden max-w-[600px] pt-10 text-white lg:block desktop:block">
          <div className="mb-48 flex items-center gap-2">
            <SecondaryLogoRender />
          </div>

          <h1 className="mb-6 leading-tight">
            <span className="font-light lg:text-[30px] desktop:text-[55px]">
              모두의 꿈인 내 집 마련!
            </span>
            <br />
            <span className="font-extrabold text-white lg:text-[30px] desktop:text-[55px]">
              나에게 맞는 추천 집은?
            </span>
          </h1>
          <div className="mb-10 h-1 w-[73px] border-2 border-white bg-white" />
          <p className="relative mb-14 text-2xl leading-relaxed text-greyscale-grey-50 lg:text-[20px] desktop:text-[20px]">
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
            <span className="absolute left-[55px] top-44 h-5 w-5">
              <HomeStarRender width={40} height={40} />
              <span className="absolute left-[160px] top-[40px] h-4 w-4 rounded-full bg-white" />
            </span>
          </div>
        </section>

        <section className="relative z-10 flex h-full min-h-[812px] justify-center sm:p-5 md:pb-[90px] md:pt-16 lg:pb-[90px] lg:pt-16 [@media(max-height:700px)]:min-h-0">
          <MobileFrameWithSheetPortal bottom={bottom} hasBottom={hasBottom}>
            {children}
          </MobileFrameWithSheetPortal>

          <div className="pointer-events-none absolute bottom-0 left-[75px] z-0 w-[520px] -translate-x-1/2">
            <HomeBottomRender />
          </div>
          <div className="relative flex flex-col">
            <div className="absolute md:bottom-[200px] md:left-24 lg:top-[400px]">
              <div className="mb-20 h-5 w-5 rounded-full bg-white sm:hidden md:block lg:block" />
              <HomeRectangleRender width={60} height={60} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
