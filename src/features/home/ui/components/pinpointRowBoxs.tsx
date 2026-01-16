export const PinpointRowBox = () => {
  return (
    <div className="flex flex-col p-4">
      {/* 리스트 */}
      <ul className="flex flex-col divide-y">
        {/* Item */}
        <li className="py-4">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">회사</span>
            <span className="rounded bg-blue-50 px-2 py-[2px] text-xs font-medium text-blue-600">
              선택됨
            </span>
          </div>

          <p className="mb-2 text-sm text-gray-600">○○도 ○○시 ○○동 000-000</p>

          <div className="flex gap-2">
            <button className="rounded-md border px-3 py-1 text-xs text-gray-700">수정</button>
            <button className="rounded-md border px-3 py-1 text-xs text-gray-700">삭제</button>
          </div>
        </li>

        {/* Item */}
        <li className="py-4">
          <div className="mb-1 text-sm font-semibold text-gray-900">본가</div>

          <p className="mb-2 text-sm text-gray-600">○○도 ○○시 ○○동 000-000</p>

          <div className="flex gap-2">
            <button className="rounded-md border px-3 py-1 text-xs text-gray-700">수정</button>
            <button className="rounded-md border px-3 py-1 text-xs text-gray-700">삭제</button>
          </div>
        </li>

        {/* Item */}
        <li className="py-4">
          <div className="mb-1 text-sm font-semibold text-gray-900">여기저기</div>

          <p className="mb-2 text-sm text-gray-600">○○도 ○○시 ○○동 000-000</p>

          <div className="flex gap-2">
            <button className="rounded-md border px-3 py-1 text-xs text-gray-700">수정</button>
            <button className="rounded-md border px-3 py-1 text-xs text-gray-700">삭제</button>
          </div>
        </li>
      </ul>

      {/* 하단 버튼 영역 */}
      <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-800">
          핀포인트 설정
        </button>
        <button className="flex-1 rounded-lg bg-gray-900 py-3 text-sm font-medium text-white">
          저장하기
        </button>
      </div>
    </div>
  );
};
