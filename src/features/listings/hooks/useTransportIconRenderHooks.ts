import { DistanceInfo } from "@/src/entities/listings/model/type";
import { parseMinutes } from "@/src/features/listings/hooks/listingsHooks";
const MIN_PERCENT = 5;
const BAR_LIMIT = 5;

type TransportIconRendererProps = {
  routes: DistanceInfo;
  totalTime: string;
};

export const useTransportIconRenderHooks = ({ totalTime, routes }: TransportIconRendererProps) => {
  const parsedRoutes = routes.segments
    .map(r => ({
      ...r,
      minutes: r.minutes,
    }))
    .filter(r => r.minutes > 0);
  const totalMinutes = parseMinutes(totalTime);
  const barRoutes = parsedRoutes.slice(0, BAR_LIMIT);
  const extraRoutes = parsedRoutes.slice(BAR_LIMIT);

  const rawPercents = barRoutes.map(r => (r.minutes / totalMinutes) * 100);
  const curved = rawPercents.map(p => Math.pow(p, 0.2));
  const curvedSum = curved.reduce((a, b) => a + b, 0);
  const normalized = curved.map(p => (p / curvedSum) * 100);
  const protectedPercents = normalized.map(p => Math.max(p, MIN_PERCENT));

  const finalSum = protectedPercents.reduce((a, b) => a + b, 0);
  const finalPercents = protectedPercents.map(p => (p / finalSum) * 100);

  return {
    barRoutes,
    finalPercents,
  };
};
