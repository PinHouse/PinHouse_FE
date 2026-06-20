---
name: codex-review-workflow
description: >-
  Claude 구현 후 Codex가 검증하는 운영 절차를 고정한다.
  기본은 code-review-guard 검증이며, 필요 시 vercel-react-best-practices와
  web-design-guidelines를 추가 점검으로 사용한다.
---

# codex-review-workflow

이 스킬은 팀 작업 루틴을 고정하기 위한 운영 문서다.
검증 주체는 항상 Codex다.

## 목표

- 구현과 검증을 분리해 회귀/보안/비즈니스 리스크를 줄인다.
- 리뷰 결론을 `MERGE: PASS/HOLD`로 표준화한다.
- 성능/웹 UI 가이드 점검은 필요할 때만 추가한다.

## 기본 절차

1. Claude가 구현 완료한다.
2. 사용자가 Codex에 검증 요청한다.
3. Codex는 `references/gate-matrix.md`로 작업 유형을 먼저 분류한다.
4. Codex는 `references/EVAL.md` 게이트/점수 기준으로 `code-review-guard` 결과를 반환한다.
5. HOLD면 Claude가 수정하고, Codex가 재검증한다.
6. PASS면 병합한다.

## 스킬 적용 규칙

- 기본 검증: `code-review-guard`만 사용
- 성능/렌더링/번들 점검이 필요하면 `vercel-react-best-practices` 추가
- 접근성/웹 인터페이스 가이드 점검이 필요하면 `web-design-guidelines` 추가
- `src/generated/api` 직접 수정 금지
- 최종 판정/출력 형식은 반드시 `references/EVAL.md`를 따른다.

## 명령 템플릿

아래 템플릿은 `references/commands.md`를 따른다.
