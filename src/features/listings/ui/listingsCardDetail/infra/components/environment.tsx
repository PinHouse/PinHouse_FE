import type { LucideIcon } from "lucide-react";
import { Bike, Building2, Footprints, Info, Mountain } from "lucide-react";

type EnvironmentItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  category: string;
  distance: string;
  accentBg: string;
  accentIcon: string;
};

const ENVIRONMENT_ITEMS: EnvironmentItem[] = [
  {
    id: "walking",
    icon: Footprints,
    label: "ㅇㅇ산책길 입구",
    category: "산책길",
    distance: "0분 거리, 0m",
    accentBg: "bg-primary-blue-25",
    accentIcon: "text-primary-blue-400",
  },
  {
    id: "hiking",
    icon: Mountain,
    label: "ㅇㅇ등산로 입구",
    category: "등산로",
    distance: "0분 거리, 0m",
    accentBg: "bg-greyscale-grey-25",
    accentIcon: "text-greyscale-grey-700",
  },
  {
    id: "bike",
    icon: Bike,
    label: "자전거길",
    category: "자전거길",
    distance: "0분 거리, 0m",
    accentBg: "bg-primary-blue-50",
    accentIcon: "text-primary-blue-500",
  },
  {
    id: "mall",
    icon: Building2,
    label: "ㅇㅇ백화점",
    category: "생활편의",
    distance: "0분 거리, 0m",
    accentBg: "bg-greyscale-grey-25",
    accentIcon: "text-greyscale-grey-800",
  },
];

export const Environment = () => {
  return (
    <section className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-greyscale-grey-50 px-5 pb-4 pt-5">
        <div>
          <p className="text-base font-semibold text-text-primary">주변환경 정보</p>
          <p className="mt-1 text-xs text-text-secondary">
            인근 산책로, 자전거길, 생활편의시설까지 한눈에 확인해보세요.
          </p>
        </div>
      </header>

      <ul className="flex-1 space-y-3 overflow-y-auto px-5 pb-8 pt-4">
        {ENVIRONMENT_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="rounded-2xlt flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.accentBg}`}
              >
                <Icon className={item.accentIcon} size={22} strokeWidth={1.6} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-text-primary">{item.label}</p>
                  <span className="whitespace-nowrap rounded-full bg-greyscale-grey-25 px-2 py-0.5 text-xs text-greyscale-grey-600">
                    {item.category}
                  </span>
                </div>
                <p className="mt-1 text-xs text-text-secondary">{item.distance}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
