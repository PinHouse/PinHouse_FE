# PinHouse Query·Cache·BFF 아키텍처 지침

PinHouse에서 TanStack Query, Zustand, Next.js route handler, BFF fetch 경계를 수정할 때 따르는 운영 기준이다.

## 언제 읽는가

- 검색 조건, 필터, 정렬, 페이지네이션을 수정할 때
- Query Key, prefetch, hydration, invalidation을 수정할 때
- `app/api/*` BFF route 또는 `server/callServer`, `server/bff` 계층을 수정할 때
- 쿠키 인증, 사용자 범위, 개인화 캐시를 수정할 때

## 목표

- 같은 의미의 조건은 같은 Query Key와 같은 BFF 요청 의미를 사용한다.
- 결과가 달라지는 조건은 반드시 별도 캐시로 분리한다.
- UI 상태와 서버 데이터 캐시를 섞지 않는다.
- 새로고침 뒤에도 Origin 중복 호출을 줄일 수 있는 구조를 지향한다.
- 사용자 A의 개인화 결과가 사용자 B에게 노출되지 않게 한다.

## PinHouse 레이어 원칙

- URL/Search Params: 공유, 북마크, 뒤로 가기가 필요한 명시 조건
- Zustand: 드래프트 입력값, 시트 open 상태, 선택 중 UI 상태, 페이지 간 유지가 필요한 클라이언트 상태
- TanStack Query: 서버 데이터 조회 상태, 캐시, stale 판단, pagination, invalidation
- BFF (`app/api/*`, `server/bff`, `server/callServer`): 인증 전달, 조건 검증/정규화, Origin 호출, 서버 캐시

## 상태 분리 규칙

- Zustand에는 서버 응답 본문 전체를 넣지 않는다.
- Query 결과를 Zustand로 복사하지 않는다.
- 필터 UI는 가능하면 `draft`와 `applied`로 분리한다.
- Query Hook은 `draft`가 아니라 `applied` 또는 정규화된 URL 조건만 참조한다.

예시:

```ts
type ListingSearchStore = {
  draft: Partial<ListingSearchCriteria>;
  applied: ListingSearchCriteria;
  setDraft: (patch: Partial<ListingSearchCriteria>) => void;
  apply: () => void;
  reset: () => void;
};
```

## 검색 조건 계약

- 결과를 바꾸는 값만 Query Key에 넣는다.
- 표현 전용 상태는 Query Key에 넣지 않는다.
- 배열 조건은 정렬과 중복 제거를 먼저 수행한다.
- 라벨 대신 canonical value를 사용한다.
- 빈 문자열, `null`, `undefined` 의미를 통일한다.
- 기본 정렬, 기본 페이지, 기본 페이지 크기를 명시한다.

예시 후보:

```ts
type ListingSearchCriteria = {
  keyword?: string;
  regionType: string[];
  rentalTypes: string[];
  supplyTypes: string[];
  houseTypes: string[];
  sortType: string;
  status: string;
  page: number;
  offSet: number;
};
```

## Query Key 규칙

- Query Key는 팩토리 함수에서만 만든다.
- 정규화된 criteria만 넣는다.
- 랜덤 값, 시각, 함수, DOM 객체를 넣지 않는다.
- 페이지가 달라도 같은 데이터를 보면 같은 factory를 재사용한다.
- 사용자 범위 결과면 인증 전환 시 관련 Query를 정리한다.

예시:

```ts
export const listingSearchKeys = {
  all: ["listing-search"] as const,
  lists: () => [...listingSearchKeys.all, "list"] as const,
  list: (criteria: ListingSearchCriteria) =>
    [...listingSearchKeys.lists(), criteria] as const,
};
```

## BFF 규칙

- 클라이언트가 보낸 조건을 그대로 신뢰하지 않는다.
- BFF에서 한 번 더 검증하고 정규화한다.
- 인증/권한 판별을 캐시 조회보다 먼저 수행한다.
- 개인화 응답은 public cache로 다루지 않는다.
- 4xx/5xx 오류 본문은 정상 캐시로 저장하지 않는다.
- negative caching은 짧은 TTL에서만 허용한다.

## TTL과 무효화

- `staleTime`과 BFF TTL은 같은 값일 필요는 없지만 의미 충돌이 없어야 한다.
- mutation 뒤에는 Query invalidation과 BFF 캐시 무효화를 함께 설계한다.
- 정책 변경, 자격 변경, 로그인 사용자 변경 시 기존 개인화 캐시 제거 규칙을 둔다.

## PinHouse 우선 적용 대상

1. `listings` 검색/필터/정렬/무한스크롤
2. `home` 검색 결과 및 추천/검색 태그 prefetch
3. `eligibility` 추천 목록과 자격 기반 개인화 결과
4. `mypage` 개인화 조회와 프로필 변경 후 invalidation

## 체크리스트

- 같은 의미 조건이 같은 Query Key를 쓰는가
- Query Key와 BFF 파라미터 의미가 일치하는가
- UI 상태가 Query Key에 섞이지 않았는가
- 서버 응답을 Zustand에 중복 저장하지 않았는가
- 로그인 전환/로그아웃 시 개인화 Query 정리가 되는가
- mutation 후 관련 Query와 서버 캐시가 함께 갱신되는가
- route handler가 Origin 프록시로만 남아 있지 않고 검증 경계를 갖는가
