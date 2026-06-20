# Description Trigger Eval Queries

`saju-frontend` 스킬의 `description` 트리거 품질을 점검하기 위한 평가 쿼리 세트.

## 운영 원칙

- 이 파일은 상시 실행용이 아니라 점검용이다.
- 사용자가 "프롬프트 테스트 하자"라고 요청할 때만 사용한다.
- 평소 작업 중에는 프롬프트를 매번 기록하거나 라벨링하지 않는다.
- 테스트 시점에만 최근 작업 프롬프트에서 대표 샘플을 뽑아 라벨링한다.

## should_trigger

- `/saju` 입력 폼에서 생년월일 검증 로직이 잘못돼요. 프론트에서 validation 흐름 수정해줘.
- `/saju/result`에서 결과 캐시가 꼬여서 이전 사용자 데이터가 보여요. React Query 키/캐시 정책 점검해줘.
- `/home` 추천 서비스 카드 UI를 모바일에서 2열로 바꾸고 문구 스타일도 조정해줘.
- OpenAPI로 생성된 클라이언트 호출부가 깨졌는데, 화면에서 쓰는 API 훅 연결을 프론트 기준으로 정리해줘.
- `src/app/api/.../route.ts` BFF 경유 기준으로 프론트 API 호출 경계를 정리해줘.
- `useQuery`를 위젯 컴포넌트에서 직접 쓰고 있는데 feature 훅으로 분리 리팩터링해줘.

## should_not_trigger

- 백엔드 사주 해석 엔진의 점수 계산식(SQL 포함)만 수정해줘.
- Docker 배포 설정과 GitHub Actions 워크플로우만 손봐줘.
- PostgreSQL 인덱스 튜닝과 마이그레이션 스크립트 작성해줘.

## 사용 방법

- 테스트 요청 시 최근 프롬프트 8~20개를 샘플링해 `should_trigger`/`should_not_trigger`에 추가한다.
- `description` 수정 전/후로 같은 세트를 돌려 오탐/미탐 변화를 비교한다.
- 오탐이 많으면 범위를 좁히고, 미탐이 많으면 사용자 의도 표현(예: 화면/플로우/UX)을 `description`에 보강한다.
