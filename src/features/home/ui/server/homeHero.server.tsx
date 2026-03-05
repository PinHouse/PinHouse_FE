import { HomeCharacter } from "@/src/assets/icons/home/homeCharacter";
import { HomeHero } from "@/src/features/home";

export const HomeHeroServer = () => {
  return (
    <section className="flex items-center justify-between rounded-3xl px-1 py-6">
      <HomeHero />
      <div className="relative">
        <span className="absolute right-2 top-[-17px] z-10 flex items-center justify-center text-2xl text-primary-blue-400">
          <HomeCharacter width={77} height={77} />
        </span>
      </div>
    </section>
  );
};
