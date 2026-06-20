# Agent Roles (Operational)

코드 아키텍처(`app/widgets/features/entities/shared`)를 변경하지 않고, 작업 운영을 역할별로 분리하기 위한 에이전트 프롬프트 템플릿 모음.

## 목적

- 구현/검증/기록 책임 분리
- 리뷰 독립성 확보
- Notion/요약 누락 방지

## 역할

- `implementer.md`: 기능 구현 전용
- `reviewer.md`: 검증 전용 (코드 수정 금지)
- `worklog.md`: Notion/요약 기록 전용

## 권장 순서

1. Implementer가 변경 수행
2. Reviewer가 diff 기준 PASS/HOLD 판정
3. Worklog가 변경 요약/Notion 반영

