import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import type { SearchBarOption } from "@/src/shared/ui/searchBar/type";
import {
  SCHOOL_SEARCH_INTRO,
  SCHOOL_SEARCH_LABEL,
  SCHOOL_SEARCH_PLACEHOLDER,
} from "@/src/features/eligibility/model/eligibilityConstants";

type SchoolSearchFormSectionProps = {
  keyword: string;
  options: SearchBarOption[];
  onKeywordChange: (value: string) => void;
  onSelect: (option: SearchBarOption) => void;
};

export function SchoolSearchFormSection({
  keyword,
  options,
  onKeywordChange,
  onSelect,
}: SchoolSearchFormSectionProps) {
  return (
    <div className="flex flex-1 flex-col px-5 pt-2">
      <p className="text-lg font-bold leading-tight tracking-[-0.01em] text-greyscale-grey-900">
        {SCHOOL_SEARCH_INTRO}
      </p>
      <div className="mt-6">
        <SearchBarLabel
          direction="vertical"
          label={SCHOOL_SEARCH_LABEL}
          placeholder={SCHOOL_SEARCH_PLACEHOLDER}
          value={keyword}
          onChange={e => onKeywordChange(e.target.value)}
          options={options}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
