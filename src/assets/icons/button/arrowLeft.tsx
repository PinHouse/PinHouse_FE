import { SVGProps } from "react";

export const ArrowLeftButton = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="mask0_9183_11178" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
        <rect
          x="9.61651e-07"
          y="22"
          width="22"
          height="22"
          transform="rotate(-90 9.61651e-07 22)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_9183_11178)">
        <path
          d="M17.875 11.6875L6.75858 11.6875L11.9801 16.9091L11 17.875L4.125 11L11 4.125L11.9801 5.09093L6.75858 10.3125L17.875 10.3125L17.875 11.6875Z"
          fill="#726F6F"
        />
      </g>
    </svg>
  );
};
