import { cva } from "class-variance-authority";

export const dropDownVariants = cva(
  "relative  inline-flex items-center justify-center rounded-2xl font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "g-primary active:scale-[0.98] rounded-md border",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 active:scale-[0.98]",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);
