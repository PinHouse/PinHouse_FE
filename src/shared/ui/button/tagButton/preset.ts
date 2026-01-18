import type { ButtonProps } from "./types";

export const tagButtonPreset = {
  variant: "solid",
  size: "md",
} as const satisfies Partial<ButtonProps>;

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

export const ENVIRONMENT_CATEGORIES = [
  {
    title: "생활편의",
    options: ["대형점포", "빨래방", "전시회", "도서관"],
  },
  {
    title: "안전·의료",
    options: ["병원"],
  },
  {
    title: "자연환경",
    options: ["산책로"],
  },
  {
    title: "특화시설",
    options: ["스포츠 시설", "동물 관련시설"],
  },
] as const;

export const HOME_TYPE_CATEGORIES = [
  {
    title: "주택 유형",
    options: ["아파트", "오피스텔", "기숙사", "다세대주택", "연립주택", "단독주택"],
  },
  {
    title: "임대 유형",
    options: ["행복주택", "공공임대", "민간임대", "전세형임대"],
  },
] as const;

export const CONDITION_CATEGORIES = [
  {
    title: "청년층",
    options: ["청년", "대학생"],
  },
  {
    title: "가족형",
    options: ["신혼부부", "다자녀"],
  },
  {
    title: "주거약자",
    options: ["고령자", "장애인", "한부모", "국가유공자", "저소득층"],
  },
  {
    title: "주택 보유 상태",
    options: ["무주택자", "유주택자"],
  },
] as const;
