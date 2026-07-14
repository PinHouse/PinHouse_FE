# 컴포넌트 우선순위 템플릿 (Step 3)

인벤토리와 토큰 초안을 기준으로 컴포넌트 우선순위를 정한다.

## 분류 규칙

- v1: 반복 사용 빈도가 높고, 토큰화 효과가 큰 컴포넌트
- v2: 복합 상호작용이 많아 추가 설계가 필요한 컴포넌트
- 각 항목에 `도메인/컴포넌트/UI 타입`을 반드시 표기한다.

## v1 우선순위 표

| 우선순위 | 도메인 | 컴포넌트 | UI 타입 | variants / states | 공통화 이유 | 현재 위치 |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | 공통 | Button | button | `primary/secondary`, `sm/md/lg`, `disabled/loading` | 모든 화면에서 반복 사용 | `src/...` |
| P0 | 공통 | Input | form | `default/error/disabled` | 폼 일관성 핵심 | `src/...` |
| P1 | 공통 | Select | form | `default/error/disabled` | 선택 UI 불일치 해소 | `src/...` |
| P1 | 공통 | Textarea | form | `default/error/disabled` | 입력 계열 통일 | `src/...` |
| P1 | 공통 | Badge | label | `info/success/warning` | 상태 표현 통일 | `src/...` |
| P1 | 공통 | Card | card | `default/outlined` | 레이아웃 시각 규칙 통일 | `src/...` |
| P0 | 공통 | Modal | modal | `size`, `dismissible` | 접근성/인터랙션 표준화 | `src/...` |

## v2 후보 표

| 도메인 | 컴포넌트 | UI 타입 | 후순위 이유 | 선행 조건 |
| --- | --- | --- | --- | --- |
| 공통 | Tabs | navigation | 화면별 요구사항 상이 | v1 토큰/버튼 안정화 |
| 공통 | Toast | feedback | 상태 관리 연계 필요 | 공통 알림 전략 확정 |
| 공통 | Dropdown | overlay | 키보드/포커스 설계 필요 | Modal 패턴 정리 |
| 공통 | DatePicker | form | 복잡도 높음 | 입력 컴포넌트 안정화 |

## 구조 설계 연결 메모 (Step 4)

- `src/shared/design-tokens`: 토큰 정의
- `src/shared/ui/primitives`: 최소 단위 UI
- `src/shared/ui/components`: 조합형 공통 컴포넌트
- `src/shared/ui/patterns`: 도메인 무관 패턴 조합
