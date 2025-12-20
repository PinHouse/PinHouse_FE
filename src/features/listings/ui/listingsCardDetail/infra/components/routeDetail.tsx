"use client";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { useListingRouteDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { ListingRouteInfo, TransportType } from "@/src/entities/listings/model/type";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
import { LeftButton } from "@/src/assets/icons/button";
import { PinPointAddress } from "@/src/assets/icons/infra/pinAddress";
import { parseMinutes, TransitAction } from "@/src/features/listings/model";
import { cn } from "@/src/shared/lib/utils";
import { VerticalTransitIcon } from "@/src/assets/icons/route/vertical/verticalBusIcon";
import { VerticalSubWayIcon } from "@/src/assets/icons/route/vertical/verticalSubWayIcon";
import { VerticalWalkIcon } from "@/src/assets/icons/route/vertical/verticalWalkIcon";

const ModeIcon = ({
  type,
  color,
  minutes,
}: {
  type?: TransportType | null;
  color: string;
  minutes: number;
}) => {
  if (type === "BUS")
    return <VerticalTransitIcon color={color} minutes={minutes} showLine={false} />;
  if (type === "WALK") return <VerticalWalkIcon color={color} minutes={minutes} />;
  if (type === "SUBWAY")
    return <VerticalSubWayIcon color={color} minutes={minutes} showLine={false} />;
};

export const RouteDetail = ({ listingId }: { listingId: string }) => {
  const { data, isFetching } = useListingRouteDetail<ListingRouteInfo, { pinPointId: string }>({
    id: listingId,
    queryK: "useListingRouteDetail",
    url: "transit",
    params: { pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251" },
  });

  const [index, setIndex] = useState(0);
  const items = data ?? [];

  const current = useMemo(() => items[index], [items, index]);

  const totalMinutes = useMemo(() => {
    if (!current) return 0;
    if (current.totalTimeMinutes > 0) return current.totalTimeMinutes;
    return (current.routes ?? []).reduce((sum, r) => sum + (parseMinutes(r.minutesText) || 0), 0);
  }, [current]);

  const goPrev = useCallback(() => {
    setIndex(p => (p - 1 + Math.max(items.length, 1)) % Math.max(items.length, 1));
  }, [items.length]);
  const goNext = useCallback(() => {
    setIndex(p => (p + 1) % Math.max(items.length, 1));
  }, [items.length]);
  const lastIndex = current?.routes.length - 1;

  if (isFetching) return <SmallSpinner title="노선 정보를 불러오는 중.." />;
  if (!items.length) {
    return (
      <div className="p-6 text-center text-sm text-text-secondary">표시할 노선 정보가 없어요.</div>
    );
  }

  return (
    <section className="flex h-full flex-col">
      {/* 상단 요약 + 페이지네이션 */}
      <div className="relative border-b border-greyscale-grey-50 p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-base font-semibold text-text-primary">노선 정보</p>
            <p className="text-xs text-text-secondary">{current?.totalTime ?? "-"} · 0원</p>
          </div>

          {items.length > 1 && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <button aria-label="이전 노선" onClick={goPrev} className="rounded-full p-1">
                <LeftButton className="size-4" />
              </button>
              <span className="min-w-10 text-center">
                {index + 1} / {items.length}
              </span>
              <button aria-label="다음 노선" onClick={goNext} className="rounded-full p-1">
                <LeftButton className="size-4 rotate-180" />
              </button>
            </div>
          )}
        </div>

        {/* 구간 바 */}
        {!!(current?.routes?.length ?? 0) && (
          <div className="mt-3">
            <div className="flex items-center">
              {current!.routes.map((seg, i) => {
                const m = parseMinutes(seg.minutesText) || 0;
                if (m === 0) return;
                const widthPct = totalMinutes ? Math.max(5, (m / totalMinutes) * 100) : 0;
                const color = seg.bgColorHex;
                return (
                  <div key={i} style={{ width: `${widthPct}%` }}>
                    <div
                      className={cn(
                        "flex h-4 items-center justify-center",
                        i === 0 && "rounded-bl-lg rounded-tl-lg",
                        i === lastIndex && "rounded-br-lg rounded-tr-lg"
                      )}
                      style={{ backgroundColor: String(color) }}
                    >
                      <span
                        className={cn(
                          "text-[10px]",
                          seg.type === "WALK" ? "text-white" : "text-white",
                          i === 0 && "ml-[2px]",
                          i === lastIndex && "mr-[2px]"
                        )}
                      >
                        {seg.minutesText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 타임라인 */}
      <ul
        className="flex-1 overflow-y-auto p-5"
        style={
          {
            ["--icon-size" as any]: "clamp(20px, 5vw, 28px)",
            ["--line-w" as any]: "clamp(2px, 0.6vw, 3px)",
            ["--item-gap" as any]: "clamp(18px, 4.5vw, 28px)",
            ["--col-gap" as any]: "clamp(8px, 2.5vw, 14px)",
          } as CSSProperties
        }
      >
        {/* 핀포인트 주소 */}
        <li className="relative flex gap-[var(--col-gap)] pb-[var(--item-gap)]">
          {/* 왼쪽 */}
          <div className="relative flex h-full w-[var(--icon-size)] justify-center">
            <div className="z-[1]">
              <PinPointAddress />
            </div>

            {/* 점선 */}
            <span
              className="absolute -bottom-[calc(var(--item-gap)+var(--icon-size))] left-1/2 top-[var(--icon-size)] w-[var(--line-w)] -translate-x-1/2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #D1D5DB 0 6px, transparent 6px 8px)",
              }}
            />
          </div>

          {/* 오른쪽 */}
          <div className="h-full flex-1">
            <p className="flex gap-1 text-sm font-medium text-text-primary">핀포인트 주소</p>
            <p className="text-xs text-text-secondary">도보 이동 · 0분, 0m</p>
          </div>
        </li>

        {/* 정류장 / 환승 / 도착 */}
        {(current?.stops ?? []).map((s, i) => {
          const color = s.bgColorHex;
          const isLast = i === (current?.stops?.length ?? 0) - 1;

          return (
            <li
              key={`${s.line}` + i}
              className="relative flex gap-[var(--col-gap)] pb-[var(--item-gap)]"
            >
              {/* 왼쪽 아이콘 + 세로선 */}
              <div className="relative z-[1] flex w-[var(--icon-size)] justify-center">
                {/* 세로선 (왼쪽 컬럼 기준) */}
                {!isLast && (
                  <span
                    className="absolute -bottom-[calc(var(--item-gap)+var(--line-extend))] left-1/2 top-[var(--icon-size)] w-[var(--line-w)] -translate-x-1/2"
                    style={
                      {
                        "--line-extend": "10px",
                        backgroundColor: String(color),
                      } as React.CSSProperties
                    }
                  />
                )}
                {s.role !== "ARRIVAL" ? (
                  <ModeIcon type={s.type} color={String(color)} minutes={0} />
                ) : (
                  <span className="relative mt-1.5 flex h-2 w-2 rounded-full bg-primary-blue-400 after:absolute after:inset-[-6px] after:-z-10 after:animate-glowBlink after:rounded-full after:bg-primary-blue-400 after:opacity-20 after:blur-sm after:content-['']" />
                )}
              </div>

              <div className="h-full flex-1">
                <p className="flex gap-1 text-sm font-medium text-text-primary">
                  {s.stopName}
                  <span className="text-text-secondary">{TransitAction[s.role]}</span>
                </p>
                {s.lineText && <p className="mt-0.5 text-xs text-text-secondary">{s.lineText}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
