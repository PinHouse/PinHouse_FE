import { Slider } from "@/src/shared/ui/slider";

export const MaxTimeSliderBox = () => {
  return (
    <div className="flex h-full flex-col justify-between px-4 py-8">
      <div>
        {/* 설명 */}
        <p className="mb-4 text-base text-gray-700">
          핀포인트로부터 <span className="font-semibold text-blue-600">60분 이내</span>
        </p>

        {/* 슬라이더 */}
        <div className="mb-2">
          <Slider labelSuffix="분" />
        </div>

        {/* 최소 / 최대 */}
        <div className="mb-8 flex justify-between text-sm text-gray-500">
          <span>0분</span>
          <span>120분</span>
        </div>
      </div>
      {/* 저장 버튼 */}
      <button className="mt-auto w-full rounded-lg bg-[#2E2A3B] py-4 text-base font-medium text-white">
        저장하기
      </button>
    </div>
  );
};
