import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { buttonVariants } from "./button.variants";
import { ENVIRONMENT_TAGS } from "./preset";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export type TagProps = {
  label: string;
};

export type EnvironmentTagKey = (typeof ENVIRONMENT_TAGS)[number]["key"];
