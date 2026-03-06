import { useEffect, useRef } from "react";

type UseHomeResultAnimationHooksProps = {
  /** @visibleCount 현재 화면에 노출된 아이템 수 */
  visibleCount: number;
};

/**
 * @visibleCount 현재 렌더링된 아이템 수
 * @returns 애니메이션 시작 인덱스
 */
export const useHomeResultAnimationHooks = ({ visibleCount }: UseHomeResultAnimationHooksProps) => {
  const prevCountRef = useRef(visibleCount);

  const animateFromIndex =
    visibleCount > prevCountRef.current ? prevCountRef.current : visibleCount;

  useEffect(() => {
    prevCountRef.current = visibleCount;
  }, [visibleCount]);

  return { animateFromIndex };
};
