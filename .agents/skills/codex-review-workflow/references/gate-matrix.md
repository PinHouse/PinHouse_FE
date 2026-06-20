# 작업 유형별 게이트 매트릭스 (운영본)

`codex-review-workflow` 실행 시 작업 유형에 따라 필수/선택 게이트를 고정한다.

## 사용 규칙

- `필수`는 반드시 검사한다.
- `선택`은 변경 범위에 해당하면 추가한다.
- 최종 판정은 `references/EVAL.md` 기준을 따른다.
- 작업이 여러 유형에 걸치면 가장 위험한 유형을 `주 유형`으로 잡고, 나머지는 `보조 유형`으로 게이트를 합산한다.
- 검증 명령은 사용자가 생략을 요청하지 않은 한 `검증 기준`의 최소 명령부터 선택한다.

## 매트릭스

| 작업 유형 | 필수 스킬 | 선택 스킬 | 필수 게이트 포커스 | 검증 기준 |
| --- | --- | --- | --- | --- |
| 기능 구현/리팩터 | `code-review-guard` | `vercel-react-best-practices` | G1, G2, G4, G5 | `typecheck`, 영향 범위 unit |
| 인증/권한/로그인 | `code-review-guard` | 없음 | G2, G3, G4, G5 | `typecheck`, 인증/refresh 관련 unit |
| `/saju` 입력 흐름 | `saju-frontend`, `code-review-guard` | 없음 | G1, G2, G4, G5 | 입력/제출 unit, pending form 흐름 확인 |
| `/saju/result` 결과 조회 | `saju-frontend`, `code-review-guard` | `vercel-react-best-practices` | G1, G2, G4, G5 | result route/client query unit, `typecheck` |
| React Query 캐시/무효화 | `saju-frontend`, `code-review-guard` | `vercel-react-best-practices` | G1, G2, G4, G5 | query key/invalidation unit, `typecheck` |
| BFF/API route 변경 | `saju-frontend`, `code-review-guard` | 없음 | G1, G2, G3, G4, G5 | route handler unit, 실패 응답/쿠키 분기 확인 |
| 쿠키/세션/민감정보 처리 | `saju-frontend`, `code-review-guard` | 없음 | G2, G3, G4, G5 | cookie 옵션, console/localStorage 노출 확인 |
| UI/디자인 전수 수정 | `code-review-guard` | `web-design-guidelines` | G1, G4, G5 + 접근성 | Storybook 또는 화면 smoke, 접근성 기본 확인 |
| 디자인 시스템/토큰 | `design-system-hybrid`, `code-review-guard` | `web-design-guidelines` | G1, G2, G4, G5 + 접근성 | Storybook build, `typecheck` |
| 성능 개선 | `code-review-guard` | `vercel-react-best-practices` | G1, G2, G4, G5 + 성능 점수 | `typecheck`, 변경 지점 성능 근거 |
| CI/CD 워크플로우 | `saju-frontend`, `code-review-guard` | 없음 | G1, G3, G4, G5 | YAML diff, 트리거/secret/branch 조건 확인 |
| docs 사이트 | `saju-docs`, `code-review-guard` | 없음 | G1, G2, G4, G5 | docs build 또는 설정 diff 확인 |
| Notion/작업 기록 | `notion-weekly-worklog` | `change-summary-report` | G5 | git 근거 확인, 임의 내용 생성 금지 |
| 릴리즈 직전 통합 점검 | `code-review-guard` | `vercel-react-best-practices`, `web-design-guidelines` | G1~G5 전체 | `typecheck`, 핵심 unit/e2e, Storybook |

## 운영 체크리스트

- 변경 유형을 먼저 1개로 분류한다.
- 매트릭스 기준으로 스킬 조합을 선택한다.
- `saju-frontend` 작업은 필요한 `references/*.md`만 추가로 읽는다.
- 검증을 생략한 경우 생략 사유와 잔여 리스크를 결과에 남긴다.
- 결과를 `Verdict/Failed Gates/Score/Findings/Next Action`으로 보고한다.
