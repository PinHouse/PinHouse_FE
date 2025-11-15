import { cva } from "class-variance-authority";

/**
 * SearchBar 컴포넌트의 variant 정의
 *
 * 구조 설명:
 * - variant: 컴포넌트의 기본 타입
 *   - default: 기본 검색바 (왼쪽 아이콘)
 *   - capsule: 캡슐 형태 검색바 (오른쪽 아이콘, 둥근 모서리)
 *
 * - state: 현재는 capsule variant에서만 사용되는 상태
 *   - default: 값이 없을 때 (검색 아이콘만 표시)
 *   - typing: 값 입력 중 + 포커스 (X 버튼 + 검색 아이콘 표시)
 *   - filled: 값이 있지만 포커스 없음 (X 버튼만 표시)
 *
 * - compoundVariants: variant와 state의 조합에 따라 다른 스타일 적용
 *   예: capsule + typing = 특정 padding과 gap 적용
 */
export const searchBarVariants = cva(
  "flex flex-row items-center box-border transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "",
        capsule:
          "bg-greyscale-grey-25 border border-greyscale-grey-75 rounded-full h-10 py-[10px] gap-4",
      },
      state: {
        default: "",
        typing: "",
        filled: "",
      },
    },
    compoundVariants: [
      {
        variant: "capsule",
        state: "default",
        class: "pl-4 pr-[0.6875rem]", // padding: 10px 12px 10px 16px (오른쪽 검색 아이콘을 위한 padding)
      },
      {
        variant: "capsule",
        state: "typing",
        class: "pl-4 pr-[0.6875rem] gap-0", // padding: 10px 12px 10px 16px (X 버튼 + 검색 아이콘)
      },
      {
        variant: "capsule",
        state: "filled",
        class: "pl-4 pr-[0.6875rem]", // padding: 10px 12px 10px 16px (X 버튼만)
      },
    ],
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  }
);
