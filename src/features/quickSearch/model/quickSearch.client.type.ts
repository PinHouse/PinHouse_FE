import { quickSearchStepCardContentMap } from "./quickSearch.constants";

export interface QuickSearchStepCardProps {
  title: string;
  description: string | null;
  isFillAll: boolean;
  boldRange: number[];
}

export interface QuickSearchSectionProps {
  title: string;
  description: string | null;
  isFillAll: boolean;
  boldRange: number[];
  type: keyof typeof quickSearchStepCardContentMap;
  progress: number;
}
