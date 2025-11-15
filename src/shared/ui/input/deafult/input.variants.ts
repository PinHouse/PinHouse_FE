import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex flex-row items-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none disabled:bg-greyscale-grey-50 disabled:gap-[1px]",
  {
    variants: {
      variant: {
        default:
          "placeholder:text-gray-300 bg-white border border-greyscale-grey-75 rounded-lg focus:border-[1.5px] focus:border-primary-blue-300",
        error: "placeholder:text-gray-300 bg-white border-[1.5px] border-danger-400 rounded-lg",
      },
      size: {
        default: "w-full h-12 px-5 py-[0.8125rem] text-base leading-[140%] tracking-[-0.01em]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
