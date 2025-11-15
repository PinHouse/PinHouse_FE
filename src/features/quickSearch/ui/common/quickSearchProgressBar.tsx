export const QuickSearchProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="h-1 w-full bg-greyscale-grey-50">
      <div className="h-full bg-primary-blue-300" style={{ width: `${progress}%` }}></div>
    </div>
  );
};
