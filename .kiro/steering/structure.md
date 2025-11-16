# 프로젝트 구조

## 아키텍처 패턴
**FSD Hybrid** (Feature-Sliced Design + Next.js App Router)

Next.js App Router 규칙과 FSD 원칙을 결합한 하이브리드 접근 방식을 사용합니다.

## 디렉토리 구조

```
/app                    # Next.js App Router (라우팅 레이어)
  /api                  # API 라우트
  /home                 # 홈 페이지 라우트
  /login                # 로그인 페이지 라우트
  /signup               # 회원가입 페이지 라우트
  /onboarding           # 온보딩 플로우 라우트
  /test                 # 테스트 페이지
  layout.tsx            # 루트 레이아웃
  page.tsx              # 루트 페이지
  globals.css           # 전역 스타일

/src                    # FSD 레이어
  /app                  # 앱 레이어 (설정, 프로바이더)
    /config             # 앱 설정
    /providers          # Context 프로바이더
  
  /entities             # 비즈니스 엔티티
    /address            # 주소 엔티티
    /auth               # 인증 엔티티
    /tag                # 태그 엔티티
  
  /features             # 사용자 대면 기능
    /addressSearch      # 주소 검색 기능
    /login              # 로그인 기능
    /onboarding         # 온보딩 기능
  
  /shared               # 공유 리소스
    /api                # API 클라이언트 및 유틸리티
    /hooks              # 재사용 가능한 React 훅
    /lib                # 유틸리티 함수
    /types              # TypeScript 타입 정의
    /ui                 # 공유 UI 컴포넌트
  
  /widgets              # 복합 UI 블록
    /onboardingSection  # 온보딩 섹션 위젯
  
  /stories              # Storybook 스토리
  /assets               # 정적 자산
    /icons              # 아이콘 파일
    /images             # 이미지 파일

/components             # 레거시/shadcn 컴포넌트
  /ui                   # UI 컴포넌트 라이브러리

/lib                    # 루트 레벨 유틸리티
  utils.ts              # className 병합을 위한 cn() 유틸리티

/public                 # 루트에서 제공되는 정적 파일
  /fonts                # 폰트 파일

/.storybook             # Storybook 설정

middleware.ts           # 인증/라우팅을 위한 Next.js 미들웨어
```

## 레이어 책임

### App Router (`/app`)
- 라우팅 및 페이지 렌더링 처리
- Next.js 전용 파일 포함 (layout, page, loading, error)
- `/app/api`에 API 라우트 위치

### FSD 레이어 (`/src`)
- **app**: 애플리케이션 초기화, 프로바이더, 전역 설정
- **entities**: 비즈니스 도메인 모델 및 로직
- **features**: UI와 로직을 포함한 완전한 사용자 대면 기능
- **shared**: 비즈니스 로직이 없는 재사용 가능한 코드
- **widgets**: features/entities를 결합한 복합 UI 섹션

## 임포트 규칙
- 워크스페이스 루트에서 절대 임포트 시 `@/` 접두사 사용
- FSD 레이어는 의존성 규칙 준수: shared ← entities ← features ← widgets ← app
- `/src/shared/ui`의 컴포넌트는 프레임워크에 독립적이고 재사용 가능해야 함

## 컴포넌트 패턴
- 조건부 className 병합을 위해 `@/lib/utils`의 `cn()` 유틸리티 사용
- 접근성 높은 컴포넌트를 위해 Radix UI 프리미티브 선호
- SVG 파일은 @svgr/webpack을 통해 React 컴포넌트로 임포트
- Storybook 스토리는 `/src/stories`에 위치
