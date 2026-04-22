"use client";

import { useEffect } from "react";
import type { PinPoint } from "@/src/entities/pinpoint/model/pinpoint.type";
import { useOAuthStore } from "@/src/features/login/model/authStore";

type HomeStoreBootstrapProps = {
  initialPinpoints: {
    userName: string;
    pinPoints: PinPoint[];
  } | null;
};

export function HomeStoreBootstrap({ initialPinpoints }: HomeStoreBootstrapProps) {
  const pinPointId = useOAuthStore(state => state.pinPointId);
  const pinPointName = useOAuthStore(state => state.pinPointName);
  const setUserName = useOAuthStore(state => state.setUserName);
  const setPinPointId = useOAuthStore(state => state.setPinPointId);
  const setPinpointName = useOAuthStore(state => state.setPinpointName);

  useEffect(() => {
    if (!initialPinpoints) return;

    setUserName(initialPinpoints.userName ?? "");

    const pinPoints = initialPinpoints.pinPoints ?? [];
    if (pinPoints.length === 0) return;

    const firstPinpoint = pinPoints[0];

    if (!pinPointId) {
      setPinPointId(firstPinpoint.id);
      setPinpointName(firstPinpoint.name);
      return;
    }

    const selected = pinPoints.find(point => point.id === pinPointId);
    if (!selected) {
      setPinPointId(firstPinpoint.id);
      setPinpointName(firstPinpoint.name);
      return;
    }

    if (!pinPointName) {
      setPinpointName(selected.name);
    }
  }, [
    initialPinpoints,
    pinPointId,
    pinPointName,
    setPinPointId,
    setPinpointName,
    setUserName,
  ]);

  return null;
}
