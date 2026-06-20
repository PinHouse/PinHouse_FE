---
name: code-review-guard
description: >-
  Claude 구현 완료 후 Codex가 변경분을 병합 전 검증하는 리뷰 전용 스킬.
  비즈니스 로직, API 계약, 인증/보안, 회귀 위험을 우선 점검한다.
---

# code-review-guard

이 스킬은 "Claude 구현 -> Codex 검증" 워크플로우 전용이다.
목표는 스타일 코멘트가 아니라 실제 장애/보안/회귀 리스크 차단이다.

## 시작 규칙

1. 입력은 "Claude가 방금 만든 변경분(diff/files)"으로 받는다.
2. 변경 파일과 영향 라우트를 먼저 식별한다.
3. 필요한 참조 문서만 읽는다.
   - `references/review-checklist.md`
   - `references/domain-rules.md`

## 리뷰 우선순위

1. 비즈니스 로직 무결성
2. API 계약/타입 안전성
3. 인증/보안
4. 상태관리/캐시 일관성
5. 회귀 위험/운영 안정성

## 필수 점검 항목

- 인증 상태 분기/접근 제어 누락 여부
- React Query key, invalidation, stale 데이터 노출 위험
- nullable/optional 필드 처리, 실패 응답 처리 누락
- 민감정보(localStorage/sessionStorage/console/log) 노출 여부
- 하드코딩 flag, 임시 우회 분기, dead code

## 작업 원칙

- 추측성 지적 금지. 모든 이슈에 파일/라인 근거를 포함한다.
- 이슈는 `Critical > High > Medium > Low` 순서로 정렬한다.
- 각 이슈마다 영향, 재현 조건, 수정 제안을 포함한다.
- 가능한 경우 최소 수정 패치 방향을 제시한다.

## 출력 형식 (고정)

### Verdict

- `MERGE: PASS` 또는 `MERGE: HOLD`
- HOLD인 경우 첫 줄에 이유를 1문장으로 요약

### Findings

- [Severity] 제목
- 영향[settings.local.json](../../../../../POT/.claude/settings.local.json)
- 근거: `path:line`
- 재현/조건
- 수정 제안

### Open Questions

- 요구사항 확인이 필요한 항목

### Summary

- 심각도별 이슈 수
- 병합 가능/보류 판단 근거
- 권장 테스트

## 병합 게이트 (강제)

- Critical 1개 이상: `MERGE: HOLD`
- High 미해결 1개 이상: `MERGE: HOLD`
- Medium/Low만 남은 경우: 리스크 명시 후 조건부 `MERGE: PASS`

## 재검증 모드

- 수정 반영 후 재요청이 오면 `delta-only`로 새로 바뀐 부분부터 우선 검증한다.
- 단, 이전 Critical/High가 미해결이면 반드시 다시 보고한다.
