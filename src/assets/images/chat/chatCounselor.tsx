import { SVGProps } from "react";

export const ChatCounselor = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="20" fill="url(#paint0_linear_11126_38838)" />
      <path
        d="M19.6001 29.3751C19.7068 29.7148 20.3343 29.7148 20.441 29.3751L22.1121 24.0525H17.9291L19.6001 29.3751Z"
        fill="url(#paint1_linear_11126_38838)"
      />
      <ellipse
        cx="20.0051"
        cy="18.3593"
        rx="9.76035"
        ry="6.5069"
        fill="url(#paint2_linear_11126_38838)"
      />
      <g filter="url(#filter0_d_11126_38838)">
        <ellipse cx="15.8107" cy="18.2997" rx="0.837942" ry="0.87146" fill="white" />
      </g>
      <g filter="url(#filter1_d_11126_38838)">
        <ellipse cx="20.0005" cy="18.2997" rx="0.837942" ry="0.87146" fill="white" />
      </g>
      <g filter="url(#filter2_d_11126_38838)">
        <ellipse cx="24.1904" cy="18.2997" rx="0.837942" ry="0.87146" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_11126_38838"
          x="12.2377"
          y="14.6932"
          width="7.14599"
          height="7.21301"
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
          <feOffset />
          <feGaussianBlur stdDeviation="1.36752" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.545391 0 0 0 0 0.628047 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11126_38838" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11126_38838"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_11126_38838"
          x="16.4276"
          y="14.6932"
          width="7.14599"
          height="7.21301"
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
          <feOffset />
          <feGaussianBlur stdDeviation="1.36752" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.545391 0 0 0 0 0.628047 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11126_38838" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11126_38838"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_11126_38838"
          x="20.6174"
          y="14.6932"
          width="7.14599"
          height="7.21301"
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
          <feOffset />
          <feGaussianBlur stdDeviation="1.36752" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.545391 0 0 0 0 0.628047 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11126_38838" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11126_38838"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_11126_38838"
          x1="40"
          y1="40"
          x2="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.175518" stopColor="#306FFF" />
          <stop offset="1" stopColor="#94AFFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11126_38838"
          x1="20.0206"
          y1="24.0525"
          x2="20.0206"
          y2="29.6299"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DDE8FF" />
          <stop offset="1" stopColor="#A2BCFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_11126_38838"
          x1="20.0051"
          y1="11.8524"
          x2="20.0051"
          y2="24.8662"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#A0BBFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
