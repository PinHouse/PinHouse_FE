"use client";
import { forwardRef } from "react";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./types";

const base =
  "inline-flex items-center justify-center rounded-3xl font-suit transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed w-full h-[55px]";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-button-light hover:bg-button-hover active:bg-button-active text-button-text disabled:bg-button-muted",
  secondary:
    "border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400",
  ghost: "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-900 disabled:text-gray-400",
  danger: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white disabled:bg-red-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-base",
  lg: "h-12 px-5 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = [base, variantClasses[variant], sizeClasses[size], className]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        type={(rest.type as any) || "button"}
        {...rest}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="opacity-90">로딩중…</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {leftIcon ? <span className="-ml-0.5">{leftIcon}</span> : null}
            <span>{children}다음</span>
            {rightIcon ? <span className="-mr-0.5">{rightIcon}</span> : null}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
