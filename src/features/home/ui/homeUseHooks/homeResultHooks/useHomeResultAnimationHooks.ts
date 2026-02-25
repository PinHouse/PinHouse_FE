import { useEffect, useRef } from "react";

type UseHomeResultAnimationHooksProps = {
  visibleCount: number;
};

export const useHomeResultAnimationHooks = ({ visibleCount }: UseHomeResultAnimationHooksProps) => {
  const prevCountRef = useRef(visibleCount);

  const animateFromIndex =
    visibleCount > prevCountRef.current ? prevCountRef.current : visibleCount;

  useEffect(() => {
    prevCountRef.current = visibleCount;
  }, [visibleCount]);

  return { animateFromIndex };
};
