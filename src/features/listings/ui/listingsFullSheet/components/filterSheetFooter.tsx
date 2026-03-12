export const FilterSheetFooter = ({
  total,
  onApply,
}: {
  total: number | null | undefined;
  onApply: () => void;
}) => {
  return (
    <div className="p-5">
      <button
        className="w-full rounded-lg bg-button-primary py-3 font-semibold text-white"
        onClick={onApply}
      >
        <span className="flex justify-center gap-1 transition-none">
          <p className="text-center">{total}</p>
          <p>개의 공고가 있어요</p>
        </span>
      </button>
    </div>
  );
};
