export interface SpinnerProps {
  title?: string;
  description?: string;
}

export const Spinner = ({
  title = "로딩 중",
  description = "잠시만 기다려주세요.",
}: SpinnerProps) => {
  return (
    <div className="flex h-screen items-center justify-center">
      ㅇ
      <div className="text-center">
        <div className="mb-4">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
