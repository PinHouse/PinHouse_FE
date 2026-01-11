import { HomeCharacter } from "@/src/assets/icons/home/homeCharacter";
import { useOAuthStore } from "../../login/model";

export const HomeHero = () => {
  const { userName } = useOAuthStore();
  return (
    <section className="flex items-center justify-between rounded-3xl px-1 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold leading-tight text-greyscale-grey-900">
          {userName}님에게 맞는 <br /> 임대주택을 확인해 보세요
        </p>
      </div>
      <div className="relative">
        <span className="absolute right-2 top-[-12px] z-10 flex items-center justify-center text-2xl text-primary-blue-400">
          <HomeCharacter width={77} height={77} />
        </span>
      </div>
    </section>
  );
};
