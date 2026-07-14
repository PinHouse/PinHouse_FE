# Codex Review Commands

## 1) 기본 검증 (항상 사용)

`$code-review-guard 방금 Claude 변경분 검증. Critical/High 우선, 파일:라인 근거, MERGE: PASS/HOLD로 결론.`

## 2) 재검증 (수정 후)

`$code-review-guard 방금 수정본 delta-only 재검증. 이전 Critical/High 미해결 여부도 같이 확인.`

## 3) 성능 추가 점검 (필요할 때만)

`$vercel-react-best-practices 기준으로 이번 변경 추가 점검. 불필요한 re-render, 번들 증가, 데이터 패칭 비효율 중심으로 보고.`

## 4) 웹 UI/접근성 추가 점검 (필요할 때만)

`$web-design-guidelines 기준으로 이번 변경 추가 점검. 접근성, 시맨틱, 인터랙션 UX 위반 항목을 file:line으로 보고.`

## 5) 통합 점검 (요청 시)

`$code-review-guard + $vercel-react-best-practices + $web-design-guidelines 기준으로 통합 검증. 최종 결론은 MERGE: PASS/HOLD로.`

## 운영 규칙

- 기본은 1)만 사용한다.
- 이슈 수정 후에는 2)로 짧게 재검증한다.
- 성능 이슈가 의심되거나 요청이 있을 때만 3)을 사용한다.
- UI/접근성 품질 점검이 필요할 때만 4)를 사용한다.
- 릴리즈 전 최종 점검에만 5)를 사용한다.
- 최종 결과 보고는 `EVAL.md` 형식(`Verdict / Failed Gates / Score / Findings / Next Action`)을 강제한다.
- 작업 시작 전 `gate-matrix.md`에서 작업 유형별 필수/선택 스킬 조합을 먼저 확정한다.
