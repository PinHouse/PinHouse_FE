"use client";

import { LeftButton } from "@/src/assets/icons/button";
import { PinPointAddress } from "@/src/assets/icons/infra/pinAddress";
import { useRouteDetail } from "@/src/features/listings/hooks/list/useRouteDetailHooks";
import { cn } from "@/src/shared/lib/utils";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
import { ModeIcon } from "@/src/features/listings/model";

export const RouteDetail = ({ listingId }: { listingId: string }) => {
  const {
    isFetching,
    hasRoutes,
    routeCount,
    currentIndex,
    summaryText,
    fareText,
    distanceSegments,
    steps,
    shouldStretch,
    timelineStyle,
    goPrev,
    goNext,
  } = useRouteDetail(listingId);

  if (isFetching) return <SmallSpinner title="노선 정보를 불러오는 중.." />;
  if (!hasRoutes) {
    return (
      <div className="p-6 text-center text-sm text-text-secondary">표시할 노선 정보가 없어요.</div>
    );
  }

  return (
    <section className="flex h-full flex-col">
      <div className="relative border-b border-greyscale-grey-50 p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-base font-semibold text-text-primary">노선 정보</p>
            <p className="text-xs text-text-secondary">
              {summaryText} · {fareText}
            </p>
          </div>

          {routeCount > 1 && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <button aria-label="이전 노선" onClick={goPrev} className="rounded-full p-1">
                <LeftButton className="size-4 text-greyscale-grey-200" />
              </button>
              <span className="font-semibold text-text-primary">{currentIndex + 1}</span>
              {" / "}
              <span>{routeCount}</span>
              <button aria-label="다음 노선" onClick={goNext} className="rounded-full p-1">
                <LeftButton className="size-4 rotate-180 text-greyscale-grey-200" />
              </button>
            </div>
          )}
        </div>

        {!!distanceSegments.length && (
          <div className="mt-3">
            <div className="flex items-center">
              {distanceSegments.map(segment => (
                <div key={segment.key} style={{ width: `${segment.widthPct}%` }}>
                  <div
                    className={cn(
                      "flex h-4 items-center justify-center",
                      segment.isFirst && "rounded-bl-lg rounded-tl-lg",
                      segment.isLast && "rounded-br-lg rounded-tr-lg"
                    )}
                    style={{ backgroundColor: segment.color }}
                  >
                    <span
                      className={cn(
                        "text-[10px] text-white",
                        segment.isFirst && "ml-[2px]",
                        segment.isLast && "mr-[2px]"
                      )}
                    >
                      {segment.minutes}분
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ul
        className={cn(
          "relative flex flex-1 flex-col overflow-y-auto p-5",
          shouldStretch && "justify-between"
        )}
        style={timelineStyle}
      >
        <li className="relative flex gap-[var(--col-gap)]">
          <div className="relative flex h-full w-[var(--icon-size)] justify-center">
            <div className="z-[1]">
              <PinPointAddress />
            </div>
            <span
              className="absolute bottom-0 left-1/2 top-[var(--icon-size)] w-[var(--line-w)] -translate-x-1/2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #D1D5DB 0 6px, transparent 6px 8px)",
              }}
            />
          </div>

          <div className="flex h-[60px] flex-1 flex-col">
            <p className="flex gap-1 text-sm font-medium text-text-primary">핀포인트 주소</p>
            {/*<p className="text-xs text-text-secondary">도보 이동 · 0분, 0m</p>*/}
          </div>
        </li>

        {steps.map(step => (
          <li
            key={step.key}
            className={cn(
              "relative flex gap-[var(--col-gap)]",
              shouldStretch ? !step.isLast && "flex-1" : "min-h-[50px]"
            )}
          >
            <div className="relative z-[1] flex w-[var(--icon-size)] justify-center">
              {!step.isLast && !step.isWalk && (
                <span
                  className="absolute bottom-0 left-1/2 top-[var(--icon-size)] w-[var(--line-w)] -translate-x-1/2"
                  style={
                    {
                      "--line-extend": "10px",
                      backgroundColor: step.color,
                    } as React.CSSProperties
                  }
                />
              )}

              {step.isWalk && (
                <span
                  className="absolute bottom-0 left-1/2 top-[var(--icon-size)] w-[var(--line-w)] -translate-x-1/2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, #D1D5DB 0 6px, transparent 6px 8px)",
                  }}
                />
              )}

              {!step.isArrival ? (
                <ModeIcon type={step.type} color={step.color} minutes={step.iconMinutes} />
              ) : (
                <div className="relative flex h-[var(--icon-size)] w-[var(--icon-size)] items-center justify-center">
                  <span
                    className="absolute left-1/2 top-0 w-[var(--line-w)] -translate-x-1/2"
                    style={{
                      height: "calc(var(--icon-size) / 2)",
                      backgroundColor: String(step.prevLastColor),
                    }}
                  />
                  <span className="relative flex h-2.5 w-2.5 rounded-full bg-primary-blue-400 after:absolute after:inset-[-6px] after:-z-10 after:animate-glowBlink after:rounded-full after:bg-primary-blue-400 after:opacity-20 after:blur-sm after:content-['']" />
                </div>
              )}
            </div>

            <div
              className={cn(
                "flex flex-col",
                !step.isLast && shouldStretch && "flex-1",
                step.isArrival && "justify-normal pt-1"
              )}
            >
              <p className="flex text-sm font-medium text-text-primary">{step.label}</p>

              {step.lineText && (
                <p className="mt-0.5 text-xs text-text-secondary">{step.lineText}</p>
              )}

              {step.minutesText && (
                <p className="mt-0.5 text-xs text-text-secondary">
                  {step.secondaryText} 약 {step.minutesText} 분{" "}
                  {step.distanceMeters && `${step.distanceMeters} m`}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
