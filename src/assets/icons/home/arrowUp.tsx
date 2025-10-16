import { SVGProps } from "react";

export default function ArrowUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_8334_12703)">
        <rect
          x="12"
          y="10"
          width="38"
          height="38"
          rx="19"
          fill="white"
          shapeRendering="crispEdges"
        />
        <rect
          x="12.5"
          y="10.5"
          width="37"
          height="37"
          rx="18.5"
          stroke="#DDDDE5"
          shapeRendering="crispEdges"
        />
        <path
          d="M25.3125 27.9167L31 22.5M31 22.5L36.6875 27.9167M31 22.5L31 35.5"
          stroke="#7F7F8F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_8334_12703"
          x="0"
          y="0"
          width="62"
          height="62"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8334_12703" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8334_12703"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
