import { SVGProps } from "react";

export const UpButton = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.75 6.75L6.75 0.75L12.75 6.75"
        stroke="#9F9FAB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
