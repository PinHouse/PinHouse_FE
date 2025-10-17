import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid:
          "g-primary text-white hover:bg-primary/90 active:scale-[0.98] text-white bg-button-light rounded-3xl w-full",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 active:scale-[0.98]",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export function Input({ className, variant, size, ...props }: InputProps) {
  return <input className={cn(inputVariants({ variant, size }), className)} {...props} />;
}
