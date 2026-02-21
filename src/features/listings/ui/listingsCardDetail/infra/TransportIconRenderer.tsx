import { DistanceInfo } from "@/src/entities/listings/model/type";
import { TRANSPORT_ICON_MAP } from "../../../model";
import { useTransportIconRenderHooks } from "@/src/features/listings/hooks/useTransportIconRenderHooks";

type TransportIconRendererProps = {
  routes: DistanceInfo;
  totalTime?: string;
};

export const TransportIconRenderer = ({ totalTime, routes }: TransportIconRendererProps) => {
  if (!totalTime) return null;

  const { barRoutes, finalPercents } = useTransportIconRenderHooks({
    totalTime,
    routes,
  });
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
              <Icon minutes={item.minutes} color={item.colorHex} />
              {/*<div>*/}
              {/*  <p*/}
              {/*    className="flex h-4 items-center text-xs font-semibold"*/}
              {/*    style={{ color: item.colorHex }}*/}
              {/*  >*/}
              {/*    {item.type !== "BUS" ? item.labelText?.split(" ")[1] : item.labelText}*/}
              {/*  </p>*/}
              {/*</div>*/}
            </div>
          );
        })}
      </div>
    </div>
  );
};
