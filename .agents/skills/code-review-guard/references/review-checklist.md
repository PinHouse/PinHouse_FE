# Review Checklist

## 1) 비즈니스 로직

- 사용자 입력값 검증이 기존 정책과 동일한가?
- 분기 조건이 누락/역전되지 않았는가?
- 임시 우회 코드(TODO, hardcoded boolean)가 남지 않았는가?

## 2) API 계약/타입

- `src/generated/api` 타입과 호출부 타입이 일치하는가?
- optional/nullable 필드에 대한 방어 코드가 있는가?
- 실패 응답(4xx/5xx) UI 처리(토스트, fallback, retry)가 있는가?

## 3) 인증/보안

- 토큰/세션을 부적절한 위치에 저장하지 않는가?
- 권한 없는 사용자 액션이 가능한가?
- 민감정보가 로그/에러메시지로 노출되는가?

## 4) 상태/캐시

- query key가 도메인 식별자를 포함하는가?
- mutation 후 invalidation/refetch가 정확한가?
- optimistic update 시 rollback 경로가 있는가?

## 5) UX 안정성

- 로딩/에러/빈 상태가 모두 존재하는가?
- 라우트 이동 중 깜빡임/중복 호출/무한 스피너가 없는가?
- 모바일 뷰에서 핵심 액션 버튼이 가려지지 않는가?
