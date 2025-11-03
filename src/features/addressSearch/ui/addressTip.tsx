export const AddressTip = () => {
  return (
    <div>
      <ul className="space-y-1 pl-2 text-sm font-semibold text-gray-700">
        <li className="flex items-start gap-2">
          <span>주소검색 Tip</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-[7px] size-1.5 rounded-full bg-black" />
          <span>도로명 + 건물번호 (예: 한강길 123)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-[7px] size-1.5 rounded-full bg-black" />
          <span>동/읍/면/리 + 번지 (예: 노을동 1-23)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-[7px] size-1.5 rounded-full bg-black" />
          <span>건물명, 아파트명 (예: 주황아파트)</span>
        </li>
      </ul>
    </div>
  );
};
