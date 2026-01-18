import { cva } from "class-variance-authority";

export const dropDownVariants = cva(
  "relative inline-flex items-center justify-center border font-medium border-greyscale-grey-75 rounded focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        box: "w-full min-w-[160px] text-greyscale-grey-900",
        menu: "w-auto text-greyscale-grey-400",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 py-[0.8125rem] text-sm leading-[132%] tracking-[-0.01em]",
        lg: "h-12 pl-5 pr-4 py-[0.9375rem] text-sm leading-[140%] tracking-[-0.01em]",
      },
    },
    defaultVariants: {
      variant: "box",
      size: "md",
    },
  }
);
