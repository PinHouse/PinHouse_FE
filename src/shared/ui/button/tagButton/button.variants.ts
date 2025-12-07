import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid:
          "g-primary text-white hover:bg-primary/90 active:scale-[0.98] text-white bg-button-tag rounded-3xl",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 active:scale-[0.98]",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98] border",
        // Chip 스타일
        chipSelected:
          "gap-[6px] rounded-full px-4 py-[0.625rem] bg-primary-blue-300 text-white font-semibold",
        chip: "gap-[6px] rounded-full px-4 py-[0.625rem] bg-greyscale-grey-50 text-greyscale-grey-700 hover:bg-greyscale-grey-50 hover:text-greyscale-grey-700",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 w-full px-5 text-lg",
        xs: "h-6 px-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);
