---
name: design-system-hybrid
description: >-
  사주 프론트엔드에서 디자인 시스템을 하이브리드 방식(초기 shared 레이어, 이후
  packages 분리 가능)으로 시작할 때 사용한다. 디자인 전수 수정 단계에서는
  1) UI 인벤토리 수집, 2) 토큰 체계 초안, 3) 컴포넌트 우선순위 분류,
  4) 구조 설계를 우선 수행한다. 공용 UI가 `packages/ui`로 승격된 이후에는
  Storybook 기본 스토리를 운영할 수 있으며, 라이브러리 배포/버저닝과 최종 문서화
  정책 확정은 디자인 확정 이후로 미룬다.
---

# 디자인 시스템 하이브리드 스킬

디자인이 확정되지 않은 상태에서 디자인 시스템을 먼저 정리할 때 이 스킬을 사용한다.

## 목표 범위

- 이번 단계는 반드시 1~4까지만 수행한다.
- 1) 현행 UI 인벤토리 수집
- 2) 디자인 토큰 체계 초안 정의
- 3) 컴포넌트 우선순위(v1/v2) 분류
- 4) FSD 유지 기반 구조 설계
- 5~6(운영/배포/버저닝/완성 문서화)은 디자인 확정 이후 진행한다.

## 기본 원칙

- 기존 FSD(`app`, `widgets`, `features`, `entities`, `shared`)를 유지한다.
- 초기에는 `shared` 내부에 디자인 시스템 레이어를 둔다.
- 이후 안정화되면 `packages/design-tokens`, `packages/ui`로 승격한다.
- 현재 단계에서 API를 과도하게 고정하지 않는다(변경 허용).
- `packages/ui` 공용 컴포넌트는 기본 상태와 주요 variant를 Storybook으로 확인한다.
- Storybook 설정은 `apps/web/.storybook`, 스토리는 컴포넌트 파일 옆에 둔다.

## 권장 구조(초기)

- `src/shared/design-tokens`
- `src/shared/ui/primitives`
- `src/shared/ui/components`
- `src/shared/ui/patterns`

## 산출물 기준

- 인벤토리 문서: 화면별 반복 UI 목록 + 중복/불일치 항목
- 토큰 초안: color/typography/spacing/radius/shadow/z-index
- 컴포넌트 우선순위:
  - v1: Button, Input, Select, Textarea, Badge, Card, Modal
  - v2: Tabs, Toast, Dropdown, DatePicker 등
- 구조 설계 문서: 디렉터리, 의존 경계, import 규칙

## 주석/표기 규칙

- 디자인 시스템 관련 파일을 수정할 때는 식별 가능한 주석을 남긴다.
- 주석에는 다음 3가지를 포함한다:
  - 도메인: 예) `home`, `saju-input`, `mypage`
  - 컴포넌트: 예) `Button`, `Modal`, `InputField`
  - UI 타입: 예) `button`, `modal`, `form`, `card`
- 예시 형식:
  - `// [DS] domain:home component:Button ui:button`
  - `// [DS] domain:mypage component:ProfileModal ui:modal`

## 진행 절차

1. 작업 대상 도메인을 식별한다.
2. 해당 도메인 UI를 인벤토리로 정리한다.
3. 반복 규칙을 토큰으로 끌어올린다.
4. 공통화 가능한 UI를 컴포넌트 후보로 분류한다.
5. `shared` 기반 구조 설계안을 문서로 남긴다.

## 주의사항

- 디자인 확정 전에는 과도한 추상화를 피한다.
- 한 번에 전면 교체하지 말고 점진 교체 전략을 유지한다.
- 생성 파일(`src/generated/api`)은 수정하지 않는다.
