import { CaretDropDown } from "@/src/shared/ui/dropDown/CaretDropDown";
import { listingsComparePoint } from "../../../model";

export const ListingsCompareContentHeader = ({ count }: { count: string }) => {
  return (
    <section className="border-greyscale-grey-100 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xl font-bold">
          <p className="text-base-17 text-text-primary">방</p>
          <p className="text-base-17 text-text-tertiary">{count}</p>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-1"></div>

          <div className="flex items-center">
            <CaretDropDown
              variant="ghost"
              types="drop"
              size={"xs"}
              data={listingsComparePoint}
              fullWidth={false}
              className="w-fit"
              containerClassName="w-auto"
              menuClassName="left-[-60] w-[100]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
