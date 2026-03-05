export const ShortcutMessage = ({ text }: { text: string }) => {
  return (
    <div className="z-5 absolute -top-2 left-4">
      <div className="relative rounded-lg bg-greyscale-grey-900 px-3 py-1 text-xs text-white">
        {text}
        <span className="absolute left-4 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-greyscale-grey-900" />
      </div>
    </div>
  );
};
