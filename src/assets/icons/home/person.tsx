import { SVGProps } from "react";

export default function Person(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.66699 12H12.667C14.3238 12 15.667 13.3441 15.667 15.001V15.626C15.6668 16.2471 15.1632 16.751 14.542 16.751H5.79199C5.17083 16.751 4.66722 16.2471 4.66699 15.626V15.001C4.66699 13.3441 6.01015 12 7.66699 12ZM10.167 3.25C11.8238 3.25 13.167 4.59313 13.167 6.25C13.167 7.9069 11.8238 9.25 10.167 9.25C8.51016 9.24998 7.16699 7.90689 7.16699 6.25C7.16702 4.59314 8.51018 3.25002 10.167 3.25Z"
        stroke="#9F9FAB"
        strokeWidth="1.5"
      />
    </svg>
  );
}
