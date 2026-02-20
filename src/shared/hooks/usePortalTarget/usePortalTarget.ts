"use client";

import { useEffect, useState } from "react";

export const usePortalTarget = (targetId: string) => {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.getElementById(targetId));
  }, [targetId]);

  return portalTarget;
};
