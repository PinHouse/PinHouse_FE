---
name: feature_request
about: 컴포넌트 및 기능 개발 시 사용 템플릿(개발자용)
title: "feat:"
labels: Feat
assignees: ""
---

## 📌 작업 내용

### <!-- 구현할 기능에 대해 간단히 설명해주세요 -->

#### 🧩 로그인 폼 개발

- 유저의 `email` 및 `password` 입력 시 로그인 기능 구현
- 입력값 검증 및 상태 관리 (`useState`)
- 이벤트 핸들러 (`onChange`, `onSubmit`) 전달

### 주요 컴포넌트

#### **LoginForm**

| 항목       | 설명                                                                |
| ---------- | ------------------------------------------------------------------- |
| 역할       | 로그인 폼 전체 컨테이너                                             |
| 주요 기능  | `email`, `password` 상태 관리 및 전달                               |
| 사용 훅    | `useState`, `useCallback`                                           |
| 전달 Props | `email`, `password`, `onEmailChange`, `onPasswordChange`, `onLogin` |

#### **LoginInput**

| 항목  | 설명                                                |
| ----- | --------------------------------------------------- |
| 역할  | 이메일 / 비밀번호 입력 필드 UI                      |
| Props | `label`, `type`, `placeholder`, `value`, `onChange` |
| 설명  | `LoginForm`으로부터 props 전달받아 입력값 반영      |

## Props 설명

### <!-- props로 받는 부분에 대해 알려주세요 -->

| Prop 이름     | 타입                                         | 설명                                      |
| ------------- | -------------------------------------------- | ----------------------------------------- |
| `label`       | `string`                                     | 인풋 상단에 표시되는 라벨 텍스트          |
| `type`        | `"text" \| "email" \| "password"`            | 인풋 타입 지정                            |
| `placeholder` | `string`                                     | 입력 힌트 텍스트                          |
| `value`       | `string`                                     | 현재 인풋의 값 (상위 컴포넌트로부터 전달) |
| `onChange`    | `(e: ChangeEvent<HTMLInputElement>) => void` | 인풋 값 변경 시 실행되는 콜백             |

> 모든 props는 `LoginForm`에서 내려받으며,  
> 상태 변경은 상위 컴포넌트(`useState`)에서 관리합니다.

## ✅ To-Do

<!-- 해야 할 일들을 체크박스로 나열해주세요 -->

- [ ]
- [ ]

## 📝 참고사항

<!-- 참고할 내용이나 주의사항을 작성해주세요 -->

### 선행 조건

-
