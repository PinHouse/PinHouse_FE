"use client";

import { CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import { useListingRouteDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { ListingRouteInfo, TransportType } from "@/src/entities/listings/model/type";
import { useOAuthStore } from "@/src/features/login/model";
import { parseMinutes } from "@/src/features/listings/hooks/list/components/listingsHooks";

type RouteSegmentItem = ListingRouteInfo["routes"][number];
type RouteStepItem = RouteSegmentItem["steps"][number];

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

const resolveLineText = (line?: RouteStepItem["line"]) => {
  if (!line) return "";
  return typeof line === "object" ? line.line : line;
};

const timelineStyle = {
  ["--icon-size" as any]: "clamp(25px, 5vw, 28px)",
  ["--line-w" as any]: "clamp(2px, 0.6vw, 3px)",
  ["--item-gap" as any]: "clamp(20px, 4.5vw, 28px)",
  ["--col-gap" as any]: "clamp(8px, 2.5vw, 14px)",
} as CSSProperties;

export const useRouteDetail = (listingId: string) => {
  const pinPointId = useOAuthStore.getState().pinPointId;
  const { data, isFetching } = useListingRouteDetail<ListingRouteInfo, { pinPointId: string }>({
    id: listingId,
    queryK: "useListingRouteDetail",
    url: "transit",
    params: { pinPointId },
  });

  const [index, setIndex] = useState(0);
  const routes = data?.routes ?? [];

  useEffect(() => {
    if (index > 0 && index > routes.length - 1) {
      setIndex(0);
    }
  }, [index, routes.length]);

  const current = routes[index] ?? null;

  const routeView = useMemo(() => {
    const summaryData = current?.summary;
    const summary = Array.isArray(summaryData) ? (summaryData[0] ?? null) : (summaryData ?? null);
    const distances = current?.distance ?? [];
    const steps = current?.steps ?? [];
    const totalMinutes =
      summary?.totalMinutes ||
      distances.reduce((sum, segment) => sum + (parseMinutes(segment.minutes || "") || 0), 0);
    const prevLastStep = steps[steps.length - 2] ?? null;
    const lastDistanceIndex = distances.length - 1;

    return {
      summaryText:
        summary?.displayText || formatMinutesToText(summary?.totalMinutes ?? totalMinutes) || "-",
      fareText: formatFareText(summary?.totalFareWon),
      shouldStretch: steps.length <= 7,
      distanceSegments: distances
        .map((segment, segmentIndex) => {
          const minutes = segment.minutes || 0;
          if (minutes === 0) return null;

          return {
            key: `${segment.type}-${segmentIndex}`,
            minutes,
            color: String(segment.colorHex || "#4B5563"),
            widthPct: totalMinutes ? Math.max(5, (minutes / totalMinutes) * 100) : 0,
            isFirst: segmentIndex === 0,
            isLast: segmentIndex === lastDistanceIndex,
          };
        })
        .filter((segment): segment is NonNullable<typeof segment> => Boolean(segment)),
      steps: steps.map((step, stepIndex) => {
        const action = step.action?.toUpperCase();
        const label = resolveStepLabel(step);

        return {
          key: `${label}-${stepIndex}`,
          label,
          lineText: resolveLineText(step.line),
          secondaryText: step.secondaryText,
          minutesText: step.minutes,
          iconMinutes: parseMinutes(step.minutes || ""),
          distanceMeters: step.distanceMeters,
          color: String(step.colorHex || "#2563EB"),
          type: (step.type as TransportType) || undefined,
          isLast: stepIndex === steps.length - 1,
          isArrival: action === "ARRIVE",
          isWalk: action === "WALK",
          prevLastColor: prevLastStep?.colorHex,
        };
      }),
    };
  }, [current]);

  const goPrev = useCallback(() => {
    setIndex(prev => (prev - 1 + Math.max(routes.length, 1)) % Math.max(routes.length, 1));
  }, [routes.length]);

  const goNext = useCallback(() => {
    setIndex(prev => (prev + 1) % Math.max(routes.length, 1));
  }, [routes.length]);

  return {
    isFetching,
    hasRoutes: routes.length > 0,
    routeCount: routes.length,
    currentIndex: index,
    timelineStyle,
    goPrev,
    goNext,
    ...routeView,
  };
};
