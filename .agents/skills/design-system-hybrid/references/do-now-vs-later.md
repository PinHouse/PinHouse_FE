# Design System: Do Now vs Later

디자인 전수 변경 기간에 재작업을 줄이기 위한 운영 체크리스트.

## 지금 고정할 것 (Do Now)

- 토큰 네이밍 규칙 고정  
  - 예: `color.text.primary`, `space.3`, `radius.md`
- 디렉터리 구조/경계 고정  
  - `shared/design-tokens`, `shared/ui/primitives`, `shared/ui/components`, `shared/ui/patterns`
- 컴포넌트 API 원칙 고정  
  - `variant`, `size`, `state` 체계만 먼저 합의
- 주석 규칙 고정  
  - `[DS] domain:<...> component:<...> ui:<...>`
- 인벤토리 기록 포맷 고정  
  - `ui-inventory-template.md` 기준으로 일관 기록
- `packages/ui` 공용 컴포넌트 기본 Storybook 스토리 운영

## 지금 미룰 것 (Later)

- 실제 색상값/타입스케일 최종값 확정
- 컴포넌트 비주얼 디테일 최종화 (spacing/radius/shadow 픽셀값)
- 페이지 전면 교체 리팩터링
- Storybook 전체 시나리오와 최종 문서 정책 확정
- 배포/버전 정책과 패키지 분리 최종 고정

## 운영 원칙

- 지금은 구조와 네이밍(언어)만 고정한다.
- 디자인 확정 후 값과 구현을 넣는다.
- 구현 본격화 기준: 디자인 변경 빈도가 안정화되었을 때.
