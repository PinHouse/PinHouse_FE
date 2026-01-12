import { LeftButton } from "@/src/assets/icons/button";
import { HomeScreenHomeIcon } from "@/src/assets/icons/home/home";
import { HomeScreenTask } from "@/src/assets/icons/home/homeScreenTask";

const PERSONAL_SHORTCUTS = [
  {
    id: "tour",
    title: "나에게 맞는 방 둘러보기",
    description: "예산·거리·주변 환경을 기반으로\n나의 조건에 맞는 방을 탐색해 보세요",
    icon: <HomeScreenHomeIcon />,
    button: <LeftButton width={25} />,
    message: "임대주택 탐색이 처음이라면?",
  },
  {
    id: "save-condition",
    title: "자격진단 하러가기",
    description: "나이·소득·자산·결혼 여부에 따른 조건을\n자격진단으로 맞는 공고를 확인해 보세요",
    icon: <HomeScreenTask />,
    button: <LeftButton width={25} />,
    message: "나의 공공 임대주택 지원자격을 알고싶다면?",
  },
] as const;

const ShortcutMessage = ({ text }: { text: string }) => {
  return (
    <div className="absolute -top-2 left-4 z-10">
      <div className="relative rounded-lg bg-greyscale-grey-900 px-3 py-1 text-xs text-white">
        {text}
        {/* 말풍선 꼬리 */}
        <span className="absolute left-4 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-greyscale-grey-900" />
      </div>
    </div>
  );
};

export const PersonalShortcutList = () => {
  return (
    <section className="flex flex-col gap-4">
      {PERSONAL_SHORTCUTS.map(item => (
        <div key={item.id} className="relative">
          {item.message && <ShortcutMessage text={item.message} />}

          <button
            className="shadow- flex w-full items-center gap-2 rounded-2xl border border-greyscale-grey-50 bg-white p-4 text-left"
            type="button"
          >
            <div>{item.icon}</div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-greyscale-grey-900">{item.title}</p>
              <p className="whitespace-pre-line text-xs text-greyscale-grey-500">
                {item.description}
              </p>
            </div>

            <span className="ml-auto text-lg text-greyscale-grey-400">
              <div className="rotate-180">{item.button}</div>
            </span>
          </button>
        </div>
      ))}
    </section>
  );
};
