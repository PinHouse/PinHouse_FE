"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * React Query 클라이언트 설정
 * 전역적으로 토큰 갱신 로직이 적용됨
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 설정
      staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
      gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
      retry: 2, // 2번 재시도
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    },
    mutations: {
      retry: 2, // 2번 재시도
    },
  },
});

/**
 * React Query Provider 컴포넌트
 * 앱 전체에서 React Query를 사용할 수 있도록 설정
 */
export const QueryProvider = ({ children }: QueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
