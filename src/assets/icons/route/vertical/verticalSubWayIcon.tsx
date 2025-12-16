interface VerticalTransitIconProps {
  color: string;
  minutes?: number;
  showLine?: boolean;
}

export const VerticalSubWayIcon = ({
  color,
  minutes,
  showLine = true,
}: VerticalTransitIconProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 아이콘 원 */}
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ backgroundColor: color }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5208 3.71875V8.96875C11.5208 10.0314 10.257 10.9375 8.85435 10.9375L10.1459 11.9572C10.2679 12.0535 10.1993 12.25 10.0443 12.25H3.80988C3.65447 12.25 3.5865 12.0532 3.70822 11.9572L4.99978 10.9375C3.60111 10.9375 2.33331 10.0342 2.33331 8.96875V3.71875C2.33331 2.63145 3.64581 1.75 4.95831 1.75H8.89581C10.2288 1.75 11.5208 2.63145 11.5208 3.71875ZM6.43488 6.50781V4.21094C6.43488 3.93911 6.21452 3.71875 5.94269 3.71875H3.80988C3.53804 3.71875 3.31769 3.93911 3.31769 4.21094V6.50781C3.31769 6.77964 3.53804 7 3.80988 7H5.94269C6.21452 7 6.43488 6.77964 6.43488 6.50781ZM10.5364 6.50781V4.21094C10.5364 3.93911 10.3161 3.71875 10.0443 3.71875H7.91144C7.63961 3.71875 7.41925 3.93911 7.41925 4.21094V6.50781C7.41925 6.77964 7.63961 7 7.91144 7H10.0443C10.3161 7 10.5364 6.77964 10.5364 6.50781ZM9.55206 7.65625C9.0084 7.65625 8.56769 8.09696 8.56769 8.64062C8.56769 9.18429 9.0084 9.625 9.55206 9.625C10.0957 9.625 10.5364 9.18429 10.5364 8.64062C10.5364 8.09696 10.0957 7.65625 9.55206 7.65625ZM4.30206 7.65625C3.7584 7.65625 3.31769 8.09696 3.31769 8.64062C3.31769 9.18429 3.7584 9.625 4.30206 9.625C4.84573 9.625 5.28644 9.18429 5.28644 8.64062C5.28644 8.09696 4.84573 7.65625 4.30206 7.65625Z"
            fill="white"
          />
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
