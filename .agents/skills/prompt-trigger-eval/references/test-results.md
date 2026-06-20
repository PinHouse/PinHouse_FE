# Prompt Trigger Eval Results

## 2026-05-22 Round 1

- 대상 스킬: `saju-frontend`
- 평가 세트: `references/description-eval-queries.md`
- 샘플 수: 9
  - should_trigger: 6
  - should_not_trigger: 3

## 분류 결과

| 구분 | 건수 | 비고 |
| --- | --- | --- |
| TP (정탐) | 6 | FE 라우트/플로우/React Query/BFF 관련 요청 정상 트리거 |
| TN (정거부) | 3 | BE/인프라/DB 전용 요청 정상 비트리거 |
| FP (오탐) | 0 | 없음 |
| FN (미탐) | 0 | 없음 |

## 요약 지표

- 정확도(Accuracy): `100%` (9/9)
- 정밀도(Precision): `100%` (6/6)
- 재현율(Recall): `100%` (6/6)

## 판단

- 현재 `saju-frontend` description은 기준 샘플에서 오탐/미탐 없이 정상 동작한다.
- 즉시 수정 필요 없음.

## 다음 라운드 권장

- 최근 실제 대화에서 8~20개 샘플을 추가해 경계 문장(혼합 요청) 중심으로 재검증한다.
- 최소 1회는 `notion-weekly-worklog`, `design-system-hybrid`와 충돌 가능 문장을 포함한다.

---

## 2026-05-22 Round 2 (실제 대화 샘플 기반)

- 대상 스킬: `saju-frontend` (충돌 후보: `notion-weekly-worklog`, `design-system-hybrid`)
- 샘플 출처: 당일 실제 사용자 대화 문장 재구성
- 샘플 수: 12
  - should_trigger (`saju-frontend`): 4
  - should_not_trigger (`saju-frontend`): 8

## 샘플 구성 메모

- not-trigger 기대(8): 오늘 커밋 조회, 노션 주간 기록, 브랜치/머지/git 작업, 스킬 생성/운영 문서화, 프롬프트 테스트 요청
- trigger 기대(4): 사주 FE 라우트/UI/API/BFF/React Query 관련 구현성 요청 문장

## 분류 결과

| 구분 | 건수 | 비고 |
| --- | --- | --- |
| TP (정탐) | 4 | FE 구현성 요청 정상 트리거 |
| TN (정거부) | 8 | 노션/깃/운영성 요청 정상 비트리거 |
| FP (오탐) | 0 | 없음 |
| FN (미탐) | 0 | 없음 |

## 요약 지표

- 정확도(Accuracy): `100%` (12/12)
- 정밀도(Precision): `100%` (4/4)
- 재현율(Recall): `100%` (4/4)

## 판단

- 실제 대화형 샘플에서도 `saju-frontend` 트리거 경계가 안정적이다.
- 현재 description 문구 수정 없이 유지 가능.
