import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid:
          "g-primary text-white hover:bg-primary/90 active:scale-[0.98] text-white bg-button-light rounded-3xl",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 active:scale-[0.98]",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98] border",
        kakao:
          "relative bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90 active:scale-[0.98] font-semibold rounded-lg justify-between",
        naver:
          "relative bg-[#03C75A] text-white hover:bg-[#03C75A]/90 active:scale-[0.98] font-semibold rounded-lg justify-between",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 w-full px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);
