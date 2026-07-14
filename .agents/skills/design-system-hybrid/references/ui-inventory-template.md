# UI 인벤토리 템플릿 (Step 1)

디자인 시스템 시작 전, 현재 화면에서 반복되는 UI를 수집한다.

## 작성 규칙

- 도메인 단위로 정리한다. (`home`, `saju-input`, `mypage` 등)
- 반복 UI는 같은 이름으로 묶는다.
- 꼭 `도메인/컴포넌트/UI 타입`을 명시한다.
- 코드에서 확인한 위치(파일 경로)도 함께 남긴다.

## 인벤토리 표

| 도메인 | 화면/경로 | 컴포넌트 이름 | UI 타입 | 현재 스타일/동작 | 중복 여부 | 개선 메모 | 파일 경로 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home | `/home` | PrimaryActionButton | button | 브랜드 컬러 솔리드 버튼 | 높음 | 공통 Button으로 승격 후보 | `src/...` |
| mypage | `/mypage` | ProfileEditModal | modal | 오버레이 + 닫기 버튼 | 중간 | 모달 공통 인터랙션 정리 필요 | `src/...` |

## 불일치/리스크 메모

- 예: 같은 `button`인데 radius/height/폰트가 화면마다 다름
- 예: 모달 닫기 UX(ESC, 바깥 클릭)가 화면별로 다름

## v1 후보 추출

- Button
- Input
- Select
- Textarea
- Badge
- Card
- Modal
