---
name: file_change
about: 정적 파일(이미지, 로고 등등) 수정 시 사용 템플릿(개발자용)
title: "chore:"
labels: ""
assignees: ""
---

## 📌 파일 변경 내용 및 위치

### <!-- 추가된 파일 혹은 수정된 파일 전체 혹은 부분에 대해서 나열하시면 됩니다 -->

### 2025.10.12

#### 🔹 로그인 페이지 관련

- 로그인 폼 기능 및 기본 UI 추가
- `email`, `password` 입력 필드 및 상태 관리 로직 구현
- 로그인 이벤트 (`onChange`, `onSubmit`) 처리 추가
- 브랜드 로고및 PINHOUSE SVG로 처리 추가

#### 🔹 프로젝트 구조 변경

- `entities` 폴더 추가 → **API endpoint 및 React Query 훅 로직 분리용**
- `store` 폴더 추가 → **Auth 및 글로벌 상태 관리(Zustand)** 예정
- `app/auth/` 폴더 추가 → **인가 로직 및 전역 영향 로직 분리**
- `pages` 폴더 삭제 → **App Router 구조로 통합**
- `.vscode/settings.json` 파일 추가 및 **ESLint/Prettier 자동 포맷 세팅 공유**

#### 🔹 정적 리소스 관련

- `assets` 폴더 내 **SVG ICONS 추가**

### 위치

- /app/login/page.tsx
- /src/entities/...
- /src/store/...
- /public/assets/icons/...
- /.vscode/settings.json

## 📝 변경 이유

### <!-- 파일이 수정된 이유가 있다면 작성 부탁 드립니다. 따로 없으면 작성 안해도 무방합니다. -->

## 📌 파일 변경 내용 및 위치

### 2025.10.15

#### 🔹 공통 UI 컴포넌트

- 버튼 작업 완료 (피그마 기조대로 제작)
- SVG아이콘 파일 추가( 컴포넌트화 완료)

#### 🔹 정적 리소스 관련

- `assets` 폴더 내 **SVG ICONS 추가**
- 온보딩에 사용될 SVG ICONS 추가

### 위치

- /src/shard/ui

## 📝 변경 이유

### <!-- 파일이 수정된 이유가 있다면 작성 부탁 드립니다. 따로 없으면 작성 안해도 무방합니다. -->

### 2025.10.16

#### 🔹 공통 UI 컴포넌트

- SVG아이콘 파일 추가( 컴포넌트화 완료)

#### 🔹 정적 리소스 관련

- `assets` 폴더 내 **SVG ICONS 추가**
- 프론트 페이지에 사용될 SVG ICONS 추가

### 위치

- src/app/assets/icons/button
- src/app/assets/icons/home

## 📌 파일 변경 내용 및 위치

## 📝 변경 이유

### <!-- 파일이 수정된 이유가 있다면 작성 부탁 드립니다. 따로 없으면 작성 안해도 무방합니다. -->
