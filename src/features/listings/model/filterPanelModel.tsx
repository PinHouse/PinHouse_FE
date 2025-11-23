import { ReactNode } from "react";
import { OnOffTrue } from "../../../assets/icons/button/onOffTrue";

export interface AllFilterOption {
  key: string;
  label: string;
  component: string;
  type?: "select" | "radio" | "checkbox" | "sort" | "panel";
  icon?: ReactNode;
}

export const AllFitler_OPTIONS: AllFilterOption = {
  key: "allFilter",
  label: "전체필터",
  component: "ListingsFilterPanel",
  type: "panel",
  icon: <OnOffTrue />,
};

export type City = { code: string; name: string };
export type SectionMap = Record<string, ReadonlyArray<City>>;
export type SectionLabelMap = Record<string, string>;

export interface SearchResultsProps {
  center?: boolean;
  handleSearch: (keyword: string) => void;
}
