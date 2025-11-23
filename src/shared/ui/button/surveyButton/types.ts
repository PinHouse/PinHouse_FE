import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { surveyButtonVariants } from "./button.variants";

export interface SurveyButtonProps
  extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof surveyButtonVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}
