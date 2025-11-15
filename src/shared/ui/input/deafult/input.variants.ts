import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "box-border flex flex-row items-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-white border border-greyscale-grey-75 rounded-lg px-5 py-[13px] gap-4 h-12",
        solid:
          "g-primary text-white hover:bg-primary/90 active:scale-[0.98] rounded-2xl w-full border border-gray-300",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 active:scale-[0.98]",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98] border",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 w-full px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
