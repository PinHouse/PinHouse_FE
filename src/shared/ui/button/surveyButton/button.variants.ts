import { cva } from "class-variance-authority";

export const surveyButtonVariants = cva(
  "inline-flex items-center gap-3 px-4 py-4 font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "border-none bg-greyscale-grey-50 hover:bg-primary-blue-300 hover:text-white data-[state=on]:bg-primary-blue-300 data-[state=on]:text-white rounded-lg",
      },
      size: {
        sm: "text-sm leading-[16px] tracking-[-0.01em] font-semibold min-h-[48px]",
        md: "text-base leading-[16px] tracking-[-0.01em] font-semibold min-h-[58px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
