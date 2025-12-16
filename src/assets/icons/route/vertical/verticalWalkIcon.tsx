interface VerticalTransitIconProps {
  color: string;
  minutes?: number;
  showLine?: boolean;
}

export const VerticalWalkIcon = ({ color, minutes, showLine = true }: VerticalTransitIconProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 아이콘 원 */}
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ backgroundColor: color }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_9669_54931)">
            <path
              d="M7 2.33333C7 2.48804 7.06146 2.63642 7.17085 2.74581C7.28025 2.85521 7.42862 2.91667 7.58333 2.91667C7.73804 2.91667 7.88642 2.85521 7.99581 2.74581C8.10521 2.63642 8.16667 2.48804 8.16667 2.33333C8.16667 2.17862 8.10521 2.03025 7.99581 1.92085C7.88642 1.81146 7.73804 1.75 7.58333 1.75C7.42862 1.75 7.28025 1.81146 7.17085 1.92085C7.06146 2.03025 7 2.17862 7 2.33333Z"
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.08334 12.25L5.83334 9.91663"
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33332 12.25L8.16666 9.91663L6.41666 8.16663L6.99999 4.66663"
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 6.99996L4.66667 5.24996L7 4.66663L8.75 6.41663L10.5 6.99996"
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_9669_54931">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* 점선 */}
      {showLine && (
        <div className="my-1 flex flex-col items-center">
          <span className="h-1 w-1 rounded-full bg-greyscale-grey-300" />
          <span className="h-1 w-1 rounded-full bg-greyscale-grey-300" />
          <span className="h-1 w-1 rounded-full bg-greyscale-grey-300" />
        </div>
      )}

      {/* 분 배지 */}
      {typeof minutes === "number" && (
        <div className="rounded-full px-1 py-[1px]" style={{ backgroundColor: color }}>
          <span className="text-xs font-semibold text-white"></span>
        </div>
      )}
    </div>
  );
};
