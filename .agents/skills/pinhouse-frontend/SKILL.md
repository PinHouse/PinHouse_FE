---
name: pinhouse-frontend
description: Use when the user asks for PinHouse frontend implementation, bug fixes, refactors, UI updates, Next.js App Router changes, TanStack Query or React Query cache work, Zustand state changes, BFF or route handler updates, auth or cookie handling, API integration, listing or home or eligibility or mypage flows, search/filter behavior, invalidation, or performance-sensitive frontend data fetching in this repository. Read this skill before changing code for those tasks.
---

# PinHouse Frontend

PinHouse 프론트엔드 구현과 리팩터링의 기본 진입 스킬이다.

## 읽기 규칙

- 이 스킬이 트리거되면 이 파일을 먼저 읽는다.
- 작업이 React Query, Zustand, 검색 조건, BFF, 캐시, 무효화, 쿠키 인증을 건드리면 `references/query-cache-bff-architecture.md`를 추가로 읽는다.
- 작업이 특정 도메인 화면 구현이더라도 먼저 공통 계약과 레이어 경계를 확인한 뒤 수정한다.

## 작업 범위

- `app`, `src/app`, `widgets`, `features`, `entities`, `shared` 레이어의 프론트엔드 구현
- Next.js App Router 페이지, 레이아웃, route handler, 서버 호출 경계
- TanStack Query, Zustand, 검색/필터, 인증 UX, BFF 연동
- 핀하우스 도메인 화면: `home`, `listings`, `eligibility`, `mypage`, `onboarding`, `chat`

## 필수 규칙

- 기존 FSD 하이브리드 구조(`app/widgets/features/entities/shared`)를 유지한다.
- 생성 산출물(`src/generated/api` 등)은 직접 수정하지 않는다.
- 구현 전 현재 상태 저장 위치와 서버 데이터 캐시 위치를 구분한다.
- 서버 응답 전체를 Zustand에 복사하지 않는다.
- Query Key, 검색 조건, BFF 요청 파라미터가 같은 의미 계약을 쓰는지 먼저 확인한다.
- 개인화 응답은 사용자 범위와 인증 경계를 먼저 확인한다.
- 구현 중 Query Key나 캐시 전략을 바꾸면 관련 invalidation과 초기 prefetch 경로까지 같이 점검한다.

## 기본 절차

1. 작업 유형을 분류한다.
2. 수정 대상의 상태 소스(URL, Zustand, Query, Server)를 확인한다.
3. 검색/필터/BFF 작업이면 `references/query-cache-bff-architecture.md`를 읽고 계약부터 정리한다.
4. 최소 범위로 구현한다.
5. 변경된 Query Key, 캐시, 인증 흐름, 무효화 지점을 검증한다.

## 금지

- 요구사항 밖 전역 리팩터링
- 서버 데이터와 UI 상태의 저장소 혼합
- 의미가 같은 조건을 다른 Query Key/BFF 파라미터로 중복 표현
- 인증/쿠키/민감정보 관련 로직을 캐시보다 뒤에 두는 구현

## 갱신 규칙

- 반복되는 캐시 버그, 인증 경계 이슈, 도메인 규칙이 추가되면 이 스킬과 참조 문서를 같이 갱신한다.
