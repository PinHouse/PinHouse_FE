"use client";
import { CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import { useListingRouteDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { ListingRouteInfo, TransportType } from "@/src/entities/listings/model/type";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
import { LeftButton } from "@/src/assets/icons/button";
import { PinPointAddress } from "@/src/assets/icons/infra/pinAddress";

import { cn } from "@/src/shared/lib/utils";
import { VerticalTransitIcon } from "@/src/assets/icons/route/vertical/verticalBusIcon";
import { VerticalSubWayIcon } from "@/src/assets/icons/route/vertical/verticalSubWayIcon";
import { VerticalWalkIcon } from "@/src/assets/icons/route/vertical/verticalWalkIcon";
import { parseMinutes } from "@/src/features/listings/hooks/listingsHooks";
import { useOAuthStore } from "@/src/features/login/model";

type RouteSegmentItem = ListingRouteInfo["routes"][number];
type RouteStepItem = RouteSegmentItem["steps"][number];

const ModeIcon = ({
  type,
  color,
  minutes,
}: {
  type?: TransportType | null;
  color: string;
  minutes: number;
}) => {
  if (type === "BUS" || type === "AIR")
    return <VerticalTransitIcon color={color} minutes={minutes} showLine={false} />;
  if (type === "WALK") return <VerticalWalkIcon color={color} minutes={minutes} />;
  if (type === "SUBWAY" || type === "TRAIN")
    return <VerticalSubWayIcon color={color} minutes={minutes} showLine={false} />;
  return <VerticalTransitIcon color={color} minutes={minutes} showLine={false} />;
};

const formatMinutesToText = (minutes?: number) => {
  if (!minutes || Number.isNaN(minutes)) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours && mins) return `${hours}시간 ${mins}분`;
  if (hours) return `${hours}시간`;
  return `${mins}분`;
};

const formatFareText = (fare?: number | null) => {
  if (typeof fare !== "number" || Number.isNaN(fare) || fare <= 0) return "0원";
  return `${fare.toLocaleString("ko-KR")}원`;
};

const resolveStepLabel = (step?: RouteStepItem) => {
  if (!step) return "";
  if (step.primaryText) return step.primaryText;
  if (typeof step.stopName === "string") return step.stopName;
  if (typeof step.stopName === "number") return `${step.stopName}`;
  return "";
};

export const RouteDetail = ({ listingId }: { listingId: string }) => {
  const pinPointId = useOAuthStore.getState().pinPointId;
  const { data, isFetching } = useListingRouteDetail<ListingRouteInfo, { pinPointId: string }>({
    id: listingId,
    queryK: "useListingRouteDetail",
    url: "transit",
    params: { pinPointId: pinPointId },
  });

  const [index, setIndex] = useState(0);
  const routes = data?.routes ?? [];

  useEffect(() => {
    if (index > 0 && index > routes.length - 1) {
      setIndex(0);
    }
  }, [index, routes.length]);

  const current = routes[index] ?? null;

  const summary = (() => {
    if (!current) return null;
    const summaryData = current.summary;
    return Array.isArray(summaryData) ? (summaryData[0] ?? null) : (summaryData ?? null);
  })();

  const totalMinutes = summary?.totalMinutes
    ? summary.totalMinutes
    : (current?.distance ?? []).reduce(
        (sum, seg) => sum + (parseMinutes(seg.minutes || "") || 0),
        0
      );

  const summaryText =
    summary?.displayText || formatMinutesToText(summary?.totalMinutes ?? totalMinutes) || "-";

  const fareText = formatFareText(summary?.totalFareWon);
  const distances = current?.distance ?? [];
  const steps = current?.steps ?? [];

  const goPrev = useCallback(() => {
    setIndex(p => (p - 1 + Math.max(routes.length, 1)) % Math.max(routes.length, 1));
  }, [routes.length]);
  const goNext = useCallback(() => {
    setIndex(p => (p + 1) % Math.max(routes.length, 1));
  }, [routes.length]);

  const lastIndex = distances.length - 1;
  const SHOULD_STRETCH = steps.length <= 7;

  if (isFetching) return <SmallSpinner title="노선 정보를 불러오는 중.." />;
  if (!routes.length) {
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
            <p className="text-xs text-text-secondary">
              {summaryText} · {fareText}
            </p>
          </div>

          {routes.length > 1 && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <button aria-label="이전 노선" onClick={goPrev} className="rounded-full p-1">
                <LeftButton className="size-4 text-greyscale-grey-200" />
              </button>
              <span className="font-semibold text-text-primary">{index + 1}</span>
              {" / "}
              <span>{routes.length}</span>
              <button aria-label="다음 노선" onClick={goNext} className="rounded-full p-1">
                <LeftButton className="size-4 rotate-180 text-greyscale-grey-200" />
              </button>
            </div>
          )}
        </div>

        {/* 구간 바 */}
        {!!distances.length && (
          <div className="mt-3">
            <div className="flex items-center">
              {distances.map((seg, i) => {
                const m = seg.minutes || 0;
                if (m === 0) return null;
                const widthPct = totalMinutes ? Math.max(5, (m / totalMinutes) * 100) : 0;

                const color = seg.colorHex || "#4B5563";

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
                          "text-[10px] text-white",
                          i === 0 && "ml-[2px]",
                          i === lastIndex && "mr-[2px]"
                        )}
                      >
                        {seg.minutes}분
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
        className={cn(
          "relative flex flex-1 flex-col overflow-y-auto p-5",
          SHOULD_STRETCH && "justify-between"
        )}
        style={
          {
            ["--icon-size" as any]: "clamp(25px, 5vw, 28px)",
            ["--line-w" as any]: "clamp(2px, 0.6vw, 3px)",
            ["--item-gap" as any]: "clamp(20px, 4.5vw, 28px)",
            ["--col-gap" as any]: "clamp(8px, 2.5vw, 14px)",
          } as CSSProperties
        }
      >
        {/* 핀포인트 주소 */}
        <li className="relative flex gap-[var(--col-gap)]">
          {/* 왼쪽 */}
          <div className="relative flex h-full w-[var(--icon-size)] justify-center">
            <div className="z-[1]">
              <PinPointAddress />
            </div>

            {/* 점선 */}
            <span
              className="absolute bottom-0 left-1/2 top-[var(--icon-size)] w-[var(--line-w)] -translate-x-1/2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #D1D5DB 0 6px, transparent 6px 8px)",
              }}
            />
          </div>

          {/* 오른쪽 */}
          <div className={cn("flex h-[60px] flex-1 flex-col")}>
            <p className="flex gap-1 text-sm font-medium text-text-primary">핀포인트 주소</p>
            <p className="text-xs text-text-secondary">도보 이동 · 0분, 0m</p>
          </div>
        </li>

        {/* 정류장 / 환승 / 도착 */}
        {steps.map((s, i) => {
          const color = s.colorHex || "#2563EB";
          const isLast = i === steps.length - 1;
          const prevLastStep = steps[steps.length - 2];
          const prevLastColor = prevLastStep?.colorHex;
          const isArrival = s.action?.toUpperCase() === "ARRIVE";
          const isWALK = s.action?.toUpperCase() === "WALK";
          const label = resolveStepLabel(s);
          console.log(s);
          return (
            <li
              key={`${label}-${i}`}
              className={cn(
                "relative flex gap-[var(--col-gap)]",
                SHOULD_STRETCH ? !isLast && "flex-1" : "min-h-[50px]"
              )}
            >
              {/* 왼쪽 아이콘 + 세로선 */}
              <div className="relative z-[1] flex w-[var(--icon-size)] justify-center">
                {/* 세로선 (왼쪽 컬럼 기준) */}
                {!isLast && !isWALK && (
                  <span
                    className="absolute bottom-0 left-1/2 top-[var(--icon-size)] w-[var(--line-w)] -translate-x-1/2"
                    style={
                      {
                        "--line-extend": "10px",
                        backgroundColor: String(color),
                      } as React.CSSProperties
                    }
                  />
                )}
                {isWALK && (
                  <span
                    className="absolute bottom-0 left-1/2 top-[var(--icon-size)] w-[var(--line-w)] -translate-x-1/2"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, #D1D5DB 0 6px, transparent 6px 8px)",
                    }}
                  />
                )}
                {!isArrival ? (
                  <ModeIcon
                    type={(s.type as TransportType) || undefined}
                    color={String(color)}
                    minutes={parseMinutes(s.minutes || "")}
                  />
                ) : (
                  <div className="relative flex h-[var(--icon-size)] w-[var(--icon-size)] items-center justify-center">
                    <span
                      className="absolute left-1/2 top-0 w-[var(--line-w)] -translate-x-1/2"
                      style={{
                        height: "calc(var(--icon-size) / 2)",
                        backgroundColor: String(prevLastColor),
                      }}
                    />
                    <span className="relative flex h-2.5 w-2.5 rounded-full bg-primary-blue-400 after:absolute after:inset-[-6px] after:-z-10 after:animate-glowBlink after:rounded-full after:bg-primary-blue-400 after:opacity-20 after:blur-sm after:content-['']" />
                  </div>
                )}
              </div>

              <div
                className={cn(
                  "flex flex-col",
                  !isLast && SHOULD_STRETCH && "flex-1",
                  isArrival && "justify-normal pt-1"
                )}
              >
                <p className="flex text-sm font-medium text-text-primary">{label}</p>

                {s.line && (
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {typeof s.line === "object" ? s.line?.line : s.line}
                  </p>
                )}

                {s.minutes && (
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {s.secondaryText} 약 {s.minutes} 분
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
