"use client";

import { useMemo, useEffect } from "react";
import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import { usePinPoints } from "@/src/entities/pinpoint/hooks/usePinPoints";
import { PinPointMap } from "@/src/shared/ui/dropDown/deafult/type";
import { Spinner } from "@/src/shared/ui/spinner/default";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";

const ChoosePinPoint = () => {
  const { data: pinPointsData, isLoading, isError } = usePinPoints();
  const { setPinPointId, pinPointId } = useQuickSearchStore();

  // API 데이터를 DropDown 형식으로 변환
  const dropDownData: PinPointMap = useMemo(() => {
    if (!pinPointsData) return { myHome: [] };

    return {
      myHome: pinPointsData.pinPoints.map(pinPoint => ({
        key: pinPoint.id,
        value: pinPoint.name,
        description: pinPoint.address,
      })),
    };
  }, [pinPointsData]);

  // 초기값 설정: 데이터가 로드되고 store에 값이 없으면 첫 번째 항목을 저장
  useEffect(() => {
    if (pinPointsData && pinPointsData.pinPoints.length > 0 && !pinPointId) {
      setPinPointId(pinPointsData.pinPoints[0].id);
    }
  }, [pinPointsData, pinPointId, setPinPointId]);

  // DropDown에서 선택된 핀포인트를 store에 저장
  const handlePinPointChange = (selectedKey: string) => {
    setPinPointId(selectedKey);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div className="flex h-full items-center justify-center">에러가 발생했습니다.</div>;
  }

  return (
    <div className="h-full">
      <div className="mt-3 flex w-full flex-col gap-2">
        <DropDown types="myHome" data={dropDownData} size="lg" onChange={handlePinPointChange} />
      </div>
    </div>
  );
};

export default ChoosePinPoint;
