"use client";

import { usePinPoints } from "@/src/entities/pinpoint/hooks/usePinPoints";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { HomePinpointsHeader } from "./HomePinpointsHeader";
import { HomePinpointItem } from "./HomePinpointItem";
import { HomePinpointAddButton } from "./HomePinpointAddButton";

export function HomePinpointSection() {
  const { data, isLoading, isError } = usePinPoints();
  const pinpoints = data?.pinPoints ?? [];

  const HomePinPointsLoading = () => {
    return (
      <div className="flex flex-1 items-center justify-center py-12">
        <Spinner title="핀포인트 불러오는 중" description="잠시만 기다려주세요" />
      </div>
    );
  };

  const HomePinPointsError = () => {
    return (
      <div className="flex flex-1 items-center justify-center py-12 text-sm text-greyscale-grey-500">
        핀포인트를 불러오지 못했어요.
      </div>
    );
  };

  return (
    <div className="flex min-h-full flex-col">
      <HomePinpointsHeader />
      <div className="border-b border-greyscale-grey-25" />

      {isLoading ? (
        <HomePinPointsLoading />
      ) : isError ? (
        <HomePinPointsError />
      ) : (
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <ul className="flex flex-col">
            {pinpoints.map(item => (
              <HomePinpointItem key={item.id} item={item} />
            ))}
          </ul>
          <HomePinpointAddButton />
        </div>
      )}
    </div>
  );
}
