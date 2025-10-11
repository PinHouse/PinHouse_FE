## 프론트 아키텍쳐 (FSD-하이브리드) 참고용

├─ app/ # Next.js App Router (라우팅 전용)
│ ├─ layout.tsx # 공용 레이아웃
│ ├─ page.tsx # / (홈 or 리다이렉트)
│ │
│ ├─ login/ # 로그인 페이지 라우트
│ │ └─ page.tsx
│ │
│ ├─ dashboard/ # 대시보드 라우트
│ │ ├─ layout.tsx
│ │ └─ page.tsx
│ │
│ ├─ assets/ # 매물 관리 라우트
│ │ ├─ page.tsx
│ │ ├─ [id]/page.tsx
│ │ └─ new/page.tsx
│ │
│ ├─ leases/ # 임대 계약 관리 라우트
│ │ ├─ page.tsx
│ │ ├─ [id]/page.tsx
│ │ └─ new/page.tsx
│ │
│ ├─ tenants/ # 세입자 관리 라우트
│ │ ├─ page.tsx
│ │ └─ [id]/page.tsx
│ │
│ └─ maintenance/ # 관리비/점검 라우트
│ ├─ page.tsx
│ └─ [id]/page.tsx
│
├─ src/ # 실제 FSD 코드 계층
│ ├─ app/ # FSD의 App Layer (Provider, 설정)
│ │ ├─ providers/
│ │ │ ├─ QueryProvider.tsx # React Query Client
│ │ │ ├─ ZustandProvider.tsx # Zustand Wrapper
│ │ │ ├─ ThemeProvider.tsx # 다크모드, 테마 등
│ │ │ └─ index.ts # Provider 묶음 export
│ │ │
│ │ ├─ config/
│ │ │ ├─ env.ts # 환경 변수 정리
│ │ │ ├─ constants.ts # 상수 모음
│ │ │ └─ index.ts
│ │ │
│ │ ├─ stores/ # 전역 store 모음 (ex: useAuthStore)
│ │ └─ index.ts
│ │
│ ├─ entities/ # 도메인 단위 (DB 개념의 Entity)
│ │ ├─ user/
│ │ │ ├─ model/user.type.ts
│ │ │ ├─ api/getUserApi.ts
│ │ │ ├─ hooks/useUser.ts
│ │ │ └─ ui/UserInfoCard.tsx
│ │ │
│ │ ├─ asset/ # 매물(Asset)
│ │ │ ├─ model/asset.type.ts
│ │ │ ├─ api/getAssetsApi.ts
│ │ │ ├─ hooks/useAsset.ts
│ │ │ └─ ui/AssetCard.tsx
│ │ │
│ │ ├─ lease/ # 계약(Lease)
│ │ └─ tenant/ # 세입자(Tenant)
│ │
│ ├─ features/ # 유스케이스 단위 (하나의 기능)
│ │ ├─ auth-login/
│ │ │ ├─ ui/
│ │ │ │ ├─ LoginPage.tsx
│ │ │ │ └─ LoginForm.tsx
│ │ │ ├─ api/postLoginApi.ts
│ │ │ ├─ hooks/useLogin.ts
│ │ │ ├─ model/login.types.ts
│ │ │ ├─ model/authStore.ts
│ │ │ └─ index.ts
│ │ │
│ │ ├─ asset-filter/
│ │ │ ├─ ui/FilterPanel.tsx
│ │ │ ├─ model/filterStore.ts
│ │ │ └─ index.ts
│ │ │
│ │ └─ notification/
│ │ ├─ hooks/useNotifications.ts
│ │ └─ ui/NotificationPanel.tsx
│ │
│ ├─ widgets/ # 여러 feature/entity 조합된 UI 블록
│ │ ├─ Header/
│ │ │ └─ Header.tsx
│ │ ├─ Sidebar/
│ │ │ └─ Sidebar.tsx
│ │ ├─ DashboardChart/
│ │ └─ NotificationList/
│ │
│ ├─ shared/ # 공통 모듈 (어디서든 import 가능)
│ │ ├─ api/
│ │ │ ├─ http.ts # axios 인스턴스
│ │ │ ├─ endpoints.ts # API URL 모음
│ │ │ └─ queryClient.ts # React Query Client 설정
│ │ ├─ ui/ # 공용 UI (Button, Input 등)
│ │ ├─ hooks/ # 공용 훅 (useModal, useDebounce 등)
│ │ ├─ lib/ # 유틸 함수 (formatter 등)
│ │ ├─ config/ # 환경 상수, theme config 등
│ │ └─ types/ # 전역 타입 정의
│ │
│ └─ processes/ # (선택) 복합 업무 프로세스
│ ├─ lease-process/
│ └─ maintenance-process/
│
├─ public/
│ ├─ favicon.ico
│ └─ assets/ # 정적 이미지, 아이콘 등
│
├─ .env.local # API URL 등 환경변수
├─ next.config.js / tsconfig.json
└─ package.json
