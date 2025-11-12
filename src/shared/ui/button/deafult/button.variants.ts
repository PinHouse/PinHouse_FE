import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid:
          "g-primary text-white hover:bg-primary/90 active:scale-[0.98] text-white bg-button-light rounded-3xl disabled:bg-button-muted",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 active:scale-[0.98]",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98] border",
        quicksearch: "bg-button-light text-white hover:bg-primary-blue-500 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-3 text-sm w-min-[100px]",
        md: "h-10 px-4 text-base",
        lg: "h-12 w-full px-5 text-lg",
      },
      radius: {
        sm: "rounded-lg",
        md: "rounded-2xl",
        lg: "rounded-3xl",
      },
      text: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
      radius: "md",
    },
  }
);
