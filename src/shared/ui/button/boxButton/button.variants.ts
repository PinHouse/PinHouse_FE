import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "border-none active:scale-[0.98] ",
        outline: "border active:scale-[0.98]",
        capsule: "border-none active:scale-[0.98]",
        // Text Button
        ghost: "bg-transparent border-none active:scale-[0.98]",
      },
      size: {
        xs: "h-6 w-fit px-1.5 py-1 text-xs leading-[16px] tracking-[-0.01em] font-medium",
        sm: "h-9 text-sm leading-[140%] font-medium",
        md: "h-12 text-base leading-[100%] font-semibold ",
        lg: "h-[56px] text-lg leading-[100%] font-semibold",
      },
      radius: {
        sm: "rounded", // 4px
        md: "rounded-lg", // 8px
        lg: "rounded-xl", // 12px
        xl: "rounded-[50px]", // 50px
      },
      theme: {
        mainBlue: "",
        subBlue: "",
        black: "",
        red: "",
        grey: "",
      },
    },
    compoundVariants: [
      // Solid
      {
        variant: "solid",
        theme: "mainBlue",
        class:
          "bg-primary-blue-300 text-white hover:bg-primary-blue-500 disabled:bg-greyscale-grey-300 disabled:text-greyscale-grey-75",
      },
      {
        variant: "solid",
        theme: "subBlue",
        class:
          "bg-primary-blue-25 text-primary-blue-300 hover:bg-primary-blue-50 disabled:bg-greyscale-grey-75 disabled:text-greyscale-grey-400",
      },
      {
        variant: "solid",
        theme: "black",
        class:
          "bg-greyscale-grey-800 text-white hover:text-primary-blue-75 disabled:bg-greyscale-grey-500 disabled:text-greyscale-grey-300",
      },
      {
        variant: "solid",
        theme: "red",
        class:
          "bg-danger-400 text-white hover:bg-danger-500 disabled:bg-greyscale-grey-400 disabled:text-greyscale-grey-75",
      },
      {
        variant: "solid",
        theme: "grey",
        class:
          "bg-greyscale-grey-75 text-greyscale-grey-600 hover:text-greyscale-grey-700 disabled:bg-greyscale-grey-75 disabled:text-greyscale-grey-400",
      },

      // OutLine
      {
        variant: "outline",
        theme: "mainBlue",
        class:
          "bg-white border-primary-blue-75 text-primary-blue-300 hover:border-primary-blue-300 hover:text-primary-blue-500 disabled:border-greyscale-grey-100 disabled:text-primary-blue-75",
      },
      {
        variant: "outline",
        theme: "black",
        class:
          "bg-white border-greyscale-grey-200 text-greyscale-grey-900 hover:text-primary-blue-300 disabled:border-greyscale-grey-100 disabled:text-greyscale-grey-400",
      },
      // Capsule
      {
        variant: "capsule",
        theme: "mainBlue",
        class:
          "bg-primary-blue-300 text-white hover:bg-primary-blue-500 disabled:bg-greyscale-grey-300 rounded-[50px]",
      },
      // Text Button
      {
        variant: "ghost",
        theme: "mainBlue",
        class:
          "text-primary-blue-300 hover:text-primary-blue-500 disabled:text-greyscale-grey-400 font-medium tracking-[-0.01em] leading-[16px]",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      radius: "md",
      theme: "mainBlue",
    },
  }
);
