# 디자인 토큰 템플릿 (Step 2)

디자인 전수 수정 단계의 토큰 초안을 정의한다.  
현재 단계에서는 변경 가능성을 열어두고 초안으로 운영한다.

## 토큰 작성 규칙

- 시맨틱 네이밍 우선: `color.text.primary` 형태
- 절대값 직접 사용 최소화
- 꼭 `도메인/컴포넌트/UI 타입` 사용 맥락을 함께 기록

## Color Tokens

| 토큰 키 | 값(초안) | 의미 | 사용 도메인 | 사용 컴포넌트/UI |
| --- | --- | --- | --- | --- |
| `color.bg.base` | `#FFFFFF` | 기본 배경 | 공통 | layout |
| `color.text.primary` | `#111111` | 기본 본문 텍스트 | 공통 | text |
| `color.action.primary` | `#4F46E5` | 주요 액션 컬러 | home, saju-input | button |
| `color.border.default` | `#E5E7EB` | 기본 보더 | 공통 | input, card |

## Typography Tokens

| 토큰 키 | 값(초안) | 의미 | 사용 컴포넌트/UI |
| --- | --- | --- | --- |
| `font.size.body` | `16px` | 본문 기본 크기 | text, input |
| `font.size.caption` | `12px` | 보조 텍스트 | badge, helper-text |
| `font.weight.semibold` | `600` | 강조 텍스트 | button, heading |

## Spacing / Radius / Shadow / Z-Index

| 카테고리 | 토큰 키 | 값(초안) | 사용 컴포넌트/UI |
| --- | --- | --- | --- |
| spacing | `space.2` | `8px` | input, card |
| spacing | `space.3` | `12px` | button, form |
| radius | `radius.md` | `10px` | button, input, card |
| shadow | `shadow.sm` | `0 1px 2px rgba(0,0,0,0.06)` | card, dropdown |
| z-index | `z.modal` | `1000` | modal |

## 적용 메모

- 페이지 적용 시 코드 주석 예시:
  - `// [DS] domain:home component:Button ui:button token:color.action.primary`
  - `// [DS] domain:mypage component:ProfileModal ui:modal token:z.modal`
