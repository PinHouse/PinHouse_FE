import { Spinner } from "@/src/shared/lib/headlessUi";

type SmallSpinnerProps = {
  title?: string;
};

export const SmallSpinner = ({ title = "로딩 중.." }: SmallSpinnerProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-10">
      <Spinner className="text-blue-600" />
      <h2 className="text-sm-15 font-semibold text-gray-900">{title}</h2>
    </div>
  );
};
