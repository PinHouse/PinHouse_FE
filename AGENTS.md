# Repository Agent Instructions

이 저장소에서 작업할 때는 루트의 `.agents` 디렉터리를 에이전트 운영 규칙과 스킬 레지스트리로 사용한다.

## 기본 원칙

- 사용자 프롬프트를 받으면 먼저 작업 유형을 분류한다.
- 작업 유형에 맞는 `.agents/skills/*/SKILL.md`를 찾아 읽고, 해당 스킬의 절차를 따른다.
- 스킬이 참조하는 `references/` 문서는 필요한 파일만 추가로 읽는다.
- `.agents/agents/*.md`는 역할 프롬프트 템플릿으로 사용한다.
- 코드 변경 전에는 관련 스킬과 참조 문서를 먼저 확인한다.
- 사용자 요청 없이 Git 작업(`add`, `commit`, `push`, `checkout`, `stash`)을 하지 않는다.
- `src/generated/api` 같은 생성 산출물은 직접 수정하지 않는다.

## 프롬프트 라우팅

### 구현 요청

- 기능 구현, UI 수정, Next.js App Router, React Query, API 연동, 인증 UX, 사주 도메인 변경은 `saju-frontend`를 사용한다.
- React/Next.js 성능, 렌더링, 번들, 데이터 패칭 품질이 관련되면 `vercel-react-best-practices`를 추가로 사용한다.
- 역할 프롬프트가 필요하면 `.agents/agents/implementer.md`를 따른다.

### 코드 검증 요청

- “검증”, “리뷰”, “머지 전 확인”, “Claude 변경분 확인”, “PASS/HOLD” 요청은 `codex-review-workflow`를 먼저 사용한다.
- `codex-review-workflow`는 `.agents/skills/codex-review-workflow/references/gate-matrix.md`로 작업 유형을 분류한 뒤 필요한 스킬을 선택한다.
- 기본 검증은 `code-review-guard`를 사용한다.
- PR 코멘트처럼 짧은 리뷰 출력이 필요하면 `caveman-review`를 추가한다.
- Next.js 규칙 점검이 필요하면 `next-best-practices`를 추가한다.
- 성능 점검이 필요하면 `vercel-react-best-practices`를 추가한다.
- 접근성/UX/UI 점검이 필요하면 `web-design-guidelines`를 추가한다.
- 역할 프롬프트가 필요하면 `.agents/agents/reviewer.md`를 따른다.

### 문서/기록 요청

- 변경 요약, 커밋 메시지, 작업 보고서는 `change-summary-report`를 사용한다.
- Notion 주간 작업 기록은 `notion-weekly-worklog`를 사용한다.
- 문서 사이트(`apps/docs`, Docusaurus) 작업은 `saju-docs`를 사용한다.
- 역할 프롬프트가 필요하면 `.agents/agents/worklog.md`를 따른다.

### 디자인 시스템 요청

- 디자인 시스템, 토큰, 공용 UI 구조화는 `design-system-hybrid`를 사용한다.
- UI 접근성/인터랙션 검토가 포함되면 `web-design-guidelines`를 추가한다.

## 검증 출력 규칙

코드 검증 결과는 `.agents/skills/codex-review-workflow/references/EVAL.md` 형식을 따른다.

- `Verdict: MERGE: PASS | MERGE: HOLD`
- `Failed Gates: Gx, Gy` 또는 `none`
- `Score: NN/100`
- `Findings`: Severity 순서와 `file:line` 근거 포함
- `Next Action`: 수정 우선순위 1~3개

## 작업 방식

- 구현과 검증은 분리한다. 검증 전용 요청에서는 코드를 직접 수정하지 않는다.
- 모든 지적은 실제 diff와 파일 라인 근거에 기반한다.
- 추측성 이슈 제기, 요구사항 밖 대규모 리팩터링, 스타일 코멘트 남발을 피한다.
- 검증 명령을 실행하지 못한 경우 생략 사유와 잔여 리스크를 결과에 남긴다.
