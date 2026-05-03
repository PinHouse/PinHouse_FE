import { ListingDetailResponseWithColor } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { cn } from "@/lib/utils";
import { useDetailColorHooks } from "@/src/features/listings/hooks";

export const ListingsCardDetailSummary = ({
  basicInfo,
  className,
}: {
  basicInfo: ListingDetailResponseWithColor["data"]["basicInfo"];
  className?: string;
}) => {
  const { color } = useDetailColorHooks(basicInfo);
  return (
    <section className="p-5">
      <div className="mb-2 flex items-center gap-1">
        <TagButton
          size="xs"
          className={cn(
            `rounded-md border-none text-xs ${color?.text} ${color?.bg} transition-all`
          )}
        >
          {basicInfo.type}
        </TagButton>

        <div className="flex items-center gap-2 text-xs text-greyscale-grey-500">
          <TagButton
            size="xs"
            variant={"ghost"}
            className={cn(`rounded-md border text-xs transition-all`)}
          >
            {basicInfo.housingType}
          </TagButton>
          <p className="font-semibold">{basicInfo.supplier}</p>
        </div>
      </div>
      <h1 className="line-clamp-2 text-lg font-semibold leading-snug text-greyscale-grey-900">
        {basicInfo.name}
      </h1>
      <p className="mt-1 text-sm font-semibold text-greyscale-grey-400">{basicInfo.period}</p>
    </section>
  );
};
