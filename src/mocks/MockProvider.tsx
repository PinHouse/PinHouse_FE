'use client';

import { useEffect } from 'react';
import { initMocks } from './index';

/**
 * MSW 초기화를 위한 클라이언트 컴포넌트
 */
export function MockProvider() {
  useEffect(() => {
    initMocks();
  }, []);

  return null;
}

