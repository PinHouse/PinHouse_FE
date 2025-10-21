import { Search } from "@/src/assets/icons/home";
import { IconButton } from "@/src/shared/ui/button/iconButton";

export const OnboardingSelcted = () => {
  return (
    <IconButton size={"lg"} variant={"ghost"}>
      <div className="flex w-full items-center gap-3">
        <Search />
        <span className="text-text-tertiary">주소를 입력해 주세요</span>
      </div>
    </IconButton>
  );
};
