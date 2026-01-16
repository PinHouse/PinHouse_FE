"use client";
import { CaretDown } from "@/src/assets/icons/button/caretDown";
import { HomeFiveoclock } from "@/src/assets/icons/home/HomeFiveoclock";
import { HomePushPin } from "@/src/assets/icons/home/homePushpin";
import { useListingFilterDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { PinPointPlace } from "@/src/entities/listings/model/type";
import { useHomeSheetStore } from "../model/homeStore";
import { useRouter, useSearchParams } from "next/navigation";

const splitAddress = (address: string): [string, string] => {
  const idx = address.indexOf("구");
  if (idx === -1) {
    return [address, ""];
  }
  return [address.slice(0, idx + 1), address.slice(idx + 1).trim()];
};

export const QuickStatsList = () => {
  const { data } = useListingFilterDetail<PinPointPlace>();
  const openSheet = useHomeSheetStore(s => s.openSheet);
  const name = data?.pinPoints.values().next().value?.name;
  const id = data?.pinPoints.values().next().value?.id;

  const [line1, line2] = splitAddress(name ?? "핀포인트 이름 설정해주세요");
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSelectSection = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", key);
    params.set("id", id ?? "");
    router.push(`?${params.toString()}`, { scroll: false });
    openSheet();
  };

  return (
    <div className="relative grid grid-cols-2 grid-rows-[auto,1fr] rounded-2xl bg-white p-4">
      <div className="flex items-center gap-1 text-sm text-greyscale-grey-500">
        <HomePushPin width={17} height={17} />
        <span>핀포인트</span>
      </div>

      <div className="flex items-center gap-1 pl-6 text-sm text-greyscale-grey-500">
        <HomeFiveoclock width={15} height={15} />
        <span>최대시간</span>
      </div>

      <div className="mt-2 flex gap-4" onClick={() => onSelectSection("pinpoints")}>
        <span className="flex flex-col text-lg font-semibold leading-none">
          <p>{line1}</p>
          <p>{line2}</p>
        </span>
        <span className="flex items-center">
          <CaretDown />
        </span>
      </div>

      <div className="flex items-center pl-6" onClick={() => onSelectSection("maxTime")}>
        <button className="flex items-center gap-1 text-lg font-semibold leading-none">
          00시간 00분
          <span className="pl-1 text-greyscale-grey-400">
            <CaretDown />
          </span>
        </button>
      </div>

      <span className="pointer-events-none absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-greyscale-grey-200" />
    </div>
  );
};
