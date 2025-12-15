import { useListingInfraDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
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

export const Environment = ({ listingId }: { listingId: string }) => {
  const { data, isFetching } = useListingInfraDetail(listingId);

  if (isFetching) {
    return <SmallSpinner title={"인프라 검색중.."} />;
  }

  return (
    <section className="flex h-full flex-col">
      <ul className="flex-1 space-y-3 overflow-y-auto p-5">
        {data?.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.key} className="rounded-2xlt flex items-center gap-4">
              {Icon}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-text-primary">{item.value}</p>
                  {/* <span className="whitespace-nowrap rounded-full bg-greyscale-grey-25 px-2 py-0.5 text-xs text-greyscale-grey-600">
                    {item.}
                  </span> */}
                </div>
                {/* <p className="mt-1 text-xs text-text-secondary">{item.distance}</p> */}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
