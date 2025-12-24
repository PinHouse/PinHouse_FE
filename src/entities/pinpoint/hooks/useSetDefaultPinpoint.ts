"use client";
import { useCallback } from "react";
import { getPinPoints } from "../api/pinpointApi";
import { useOAuthStore } from "@/src/features/login/model/authStore";

/**
 * 기본 핀포인트를 가져와서 store에 저장하는 커스텀 훅
 * @returns setDefaultPinpoint 함수
 */
export const useSetDefaultPinpoint = () => {
  const { setPinPointId, pinPointId } = useOAuthStore();

  const setDefaultPinpoint = useCallback(async () => {
    try {
      // 이미 pinPointId가 설정되어 있으면 스킵
      if (pinPointId) {
        return;
      }

      // 핀포인트 목록 조회
      const pinPoints = await getPinPoints();

      if (pinPoints && pinPoints.length > 0) {
        setPinPointId(pinPoints[0].id); // 첫 번째 핀포인트를 기본값으로 설정
      }
    } catch (error) {
      console.error("❌ 기본 핀포인트 설정 실패:", error);
      throw error;
    }
  }, [pinPointId, setPinPointId]);

  return { setDefaultPinpoint };
};
