import { SVGProps } from "react";

export function CloseButton(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
      <g clip-path="url(#clip0_8454_739)">
        <path
          d="M15 5.5L5 15.5"
          stroke="#9F9FAB"
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 5.5L15 15.5"
          stroke="#9F9FAB"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8454_739">
          <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
