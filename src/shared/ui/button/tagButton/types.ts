import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { buttonVariants } from "./button.variants";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export type TagProps = {
  label: string;
};

export const ENVIRONMENT_TAGS = [
  { key: "police_station", label: "파출소" },
  { key: "hospital_pharmacy", label: "병원·약국" },
  { key: "supermarket_department", label: "대형마트·백화점" },
  { key: "bike_road", label: "자전거길" },
  { key: "walking_trail", label: "산책길" },
  { key: "hiking_trail", label: "등산로" },
  { key: "laundry", label: "세탁소" },
  { key: "children", label: "아동" },
  { key: "youth", label: "청소년" },
  { key: "elderly", label: "노인" },
  { key: "disabled", label: "장애인" },
  { key: "vulnerable_group", label: "최상위·취약계층" },
] as const;

export type EnvironmentTagKey = (typeof ENVIRONMENT_TAGS)[number]["key"];
