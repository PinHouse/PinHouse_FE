import { StepCardIcon } from "@/src/assets/icons/quickSearch/stepCardIcon";
import { QuickSearchStepCardProps } from "../model/quickSearch.client.type";

const QuickSearchStepCard = ({
  title,
  description,
  isFillAll,
  boldRange,
}: QuickSearchStepCardProps) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <StepCardIcon />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xl-22 text-greyscale-grey-900 font-bold leading-[140%]">{title}</p>
        {description ? (
          isFillAll ? (
            <p className="text-primary-blue-300 text-xs font-normal leading-[140%]">
              {description}
            </p>
          ) : (
            <p className="text-greyscale-grey-500 text-xs font-normal leading-[140%]">
              {description.slice(0, boldRange[0])}
              <span className="text-primary-blue-300 font-bold">
                {description.slice(boldRange[0], boldRange[1])}
              </span>
              {description.slice(boldRange[1])}
            </p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default QuickSearchStepCard;
