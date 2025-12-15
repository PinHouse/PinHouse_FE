import { useListingInfraDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";

export const Environment = ({ listingId }: { listingId: string }) => {
  const { data, isFetching } = useListingInfraDetail(listingId);

  if (isFetching) {
    return <SmallSpinner title={"인프라 검색중.."} />;
  }
  console.log(data);
  return (
    <section className="flex h-full flex-col">
      <ul className="flex-1 space-y-3 overflow-y-auto p-5">
        {data?.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.key} className="rounded-2xlt flex items-center gap-4">
              {Icon}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-text-primary">{item.value}</p>
                  {/* <span className="whitespace-nowrap rounded-full bg-greyscale-grey-25 px-2 py-0.5 text-xs text-greyscale-grey-600">
                    {item.}
                  </span> */}
                </div>
                {/* <p className="mt-1 text-xs text-text-secondary">{item.distance}</p> */}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
