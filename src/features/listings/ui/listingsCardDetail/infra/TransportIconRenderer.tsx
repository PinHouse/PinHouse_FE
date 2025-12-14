import { DistanceInfo } from "@/src/entities/listings/model/type";
import { parseMinutes, parseTotalMinutes, TRANSPORT_ICON_MAP } from "../../../model";

type TransportIconRendererProps = {
  routes: DistanceInfo;
  totalTime?: string;
};

const MIN_PERCENT = 5;
const BAR_LIMIT = 5; // ✔ 한 줄에 보여줄 최대 bar 수

export const TransportIconRenderer = ({ totalTime, routes }: TransportIconRendererProps) => {
  if (!totalTime) return null;

  const totalMinutes = parseTotalMinutes(totalTime);

  //  minutes 파싱 + 0분 제거
  const parsedRoutes = routes.routes
    .map(r => ({
      ...r,
      minutes: parseMinutes(r.minutesText),
    }))
    .filter(r => r.minutes > 0);

  if (parsedRoutes.length === 0) return null;

  // bar로 보여줄 것 / 나머지 분리
  const barRoutes = parsedRoutes.slice(0, BAR_LIMIT);
  const extraRoutes = parsedRoutes.slice(BAR_LIMIT);

  // bar 대상만 비율 계산
  const rawPercents = barRoutes.map(r => (r.minutes / totalMinutes) * 100);
  const curved = rawPercents.map(p => Math.pow(p, 0.2));
  const curvedSum = curved.reduce((a, b) => a + b, 0);
  const normalized = curved.map(p => (p / curvedSum) * 100);
  const protectedPercents = normalized.map(p => Math.max(p, MIN_PERCENT));

  const finalSum = protectedPercents.reduce((a, b) => a + b, 0);
  const finalPercents = protectedPercents.map(p => (p / finalSum) * 100);

  // 기타 구간 분 합산
  const extraMinutes = extraRoutes.reduce((sum, r) => sum + r.minutes, 0);

  return (
    <div className="relative flex w-full flex-col gap-1">
      {/* 노선도 */}
      <div className="flex w-full items-center overflow-hidden">
        {barRoutes.map((item, index) => {
          const Icon = TRANSPORT_ICON_MAP[item.type];
          if (!Icon) return null;

          return (
            <div
              key={item.line + item.type + index}
              className="flex-shrink-0"
              style={{ width: `${finalPercents[index]}%` }}
            >
              <Icon minutes={item.minutes} color={item.bgColorHex} />
            </div>
          );
        })}
      </div>

      {/* 기타 시간 */}
      {extraMinutes > 0 && (
        <div className="flex items-center">
          <span className="text-xs font-medium text-greyscale-grey-600">
            기타 이동 {extraMinutes}분
          </span>
        </div>
      )}
    </div>
  );
};
