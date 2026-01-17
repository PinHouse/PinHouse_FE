"use client";
import { useCallback } from "react";
import { getPinPoints } from "../api/pinpointApi";
import { useOAuthStore } from "@/src/features/login/model/authStore";

/**
 * 기본 핀포인트를 가져와서 store에 저장하는 커스텀 훅
 * @returns setDefaultPinpoint 함수
 */
export const useSetDefaultPinpoint = () => {
  const { setPinPointId, pinPointId, setUserName, setPinpointName } = useOAuthStore();

  const setDefaultPinpoint = useCallback(async () => {
    try {
      // 이미 pinPointId가 설정되어 있으면 스킵
      if (pinPointId) {
        return;
      }

      // 핀포인트 목록 조회
      const pinPoints = await getPinPoints();
      const myPinpoint = pinPoints.pinPoints;
      const userName = pinPoints.userName;
      if (pinPoints && myPinpoint.length > 0) {
        setPinPointId(myPinpoint[0].id);
        setUserName(userName);
        setPinpointName(myPinpoint[0].name);
      }
    } catch (error) {
      console.error("❌ 기본 핀포인트 설정 실패:", error);
      throw error;
    }
  }, [pinPointId, setPinPointId]);

  return { setDefaultPinpoint };
};
