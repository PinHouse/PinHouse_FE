"use client";

import { DefaultHeader } from "@/src/shared/ui/header";
import { HOME_PINPOINT_HEADER_TITLE } from "@/src/features/home/model/homePinpointConstants";

export function HomePinpointsHeader() {
  return (
    <header
      className="relative flex items-center px-5 py-4"
      aria-label={HOME_PINPOINT_HEADER_TITLE}
    >
      <DefaultHeader title={HOME_PINPOINT_HEADER_TITLE} path="/home" />
    </header>
  );
}
