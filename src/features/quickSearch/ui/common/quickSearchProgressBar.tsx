export const QuickSearchProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="bg-greyscale-grey-50 h-1 w-full rounded-full">
      <div
        className="bg-primary-blue-300 h-full rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
