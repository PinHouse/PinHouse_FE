# 기술 스택

## 코어 프레임워크
- **Next.js 15.5.4** - App Router 및 Turbopack 사용
- **React 19.1.0** - strict mode 비활성화
- **TypeScript 5** - strict mode 활성화

## 스타일링
- **Tailwind CSS 3.x** - 커스텀 디자인 토큰 사용
- **Framer Motion** - 애니메이션 처리
- **next-themes** - 다크 모드 지원
- 커스텀 애니메이션: logoBounce, logoPop, slideOutLeft, slideInRight

## 상태 관리
- **Zustand** - 전역 상태 관리
- **TanStack React Query** - 서버 상태 및 데이터 페칭

## UI 컴포넌트
- **Radix UI** - 접근성 높은 UI 프리미티브 (Dialog, Dropdown Menu, Slot)
- **shadcn/ui** 패턴 - `cn()` 유틸리티 사용 (clsx + tailwind-merge)
- **Lucide React** - 아이콘 라이브러리
- **Sonner** - 토스트 알림

## 개발 도구
- **Storybook 9.x** - 컴포넌트 개발 및 문서화
- **Chromatic** - 비주얼 테스팅
- **ESLint** - TypeScript, React, 접근성, Tailwind 플러그인 포함
- **Prettier** - Tailwind 플러그인을 포함한 코드 포맷팅

## 빌드 시스템
- **Turbopack** - 빠른 빌드 속도
- **@svgr/webpack** - SVG를 React 컴포넌트로 임포트
- **ESM 모듈** - package.json에 `"type": "module"` 설정

## 주요 명령어

```bash
# 개발
npm run dev              # Turbopack으로 개발 서버 시작
npm run build            # Turbopack으로 프로덕션 빌드
npm run start            # 프로덕션 서버 시작

# 코드 품질
npm run lint             # ESLint 실행
npm run format           # Prettier로 코드 포맷팅

# Storybook
npm run storybook        # Storybook 개발 서버 시작 (포트 6006)
npm run build-storybook  # Storybook 정적 파일 빌드
npm run chromatic        # Chromatic에 배포하여 비주얼 테스팅
```

## 경로 별칭 (Path Aliases)
- `@/*` - 워크스페이스 루트를 가리킴
