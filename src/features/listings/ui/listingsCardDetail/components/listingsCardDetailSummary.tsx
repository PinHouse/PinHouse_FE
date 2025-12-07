import { ListingDetailResponseWithColor } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { cn } from "@/lib/utils";

export const ListingsCardDetailSummary = ({
  basicInfo,
}: {
  basicInfo: ListingDetailResponseWithColor["data"]["basicInfo"];
}) => {
  return (
    <section className="p-5">
      <div className="mb-2 flex items-center gap-1">
        <TagButton
          size="xs"
          className={cn(
            `rounded-md border-none text-xs ${basicInfo.rentalColor?.text} ${basicInfo.rentalColor?.bg} transition-all`
          )}
        >
          {basicInfo.type}
        </TagButton>

        <span className="flex items-center gap-2 text-xs text-greyscale-grey-500">
          <div>
            <TagButton
              size="xs"
              variant={"ghost"}
              className={cn(`rounded-md border text-xs transition-all`)}
            >
              {basicInfo.housingType}
            </TagButton>
          </div>
          <p className="font-semibold">{basicInfo.supplier}</p>
        </span>
      </div>
      <h1 className="line-clamp-2 truncate text-lg font-semibold leading-snug text-greyscale-grey-900">
        {basicInfo.name}
      </h1>
      <p className="mt-1 text-sm font-semibold text-greyscale-grey-400">{basicInfo.period}</p>
    </section>
  );
};
