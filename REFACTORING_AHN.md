# 리팩토링 이슈 관리 문서

이 문서는 프로젝트에서 발견된 이슈들을 기록하고, 추후 리팩토링 시 참고하기 위한 문서입니다.

---

## 이슈 목록

### 1. QuickSearchProgressBar 높이 렌더링 이슈

**파일**: `src/features/quickSearch/ui/common/quickSearchProgressBar.tsx` (1-8줄)

**문제**:

- CSS에서 `h-1` (4px)로 높이를 설정했지만, 실제 브라우저 렌더링 시 3.479px로 표시되는 현상 발생
- 브라우저의 서브픽셀 렌더링 또는 디스플레이 스케일링으로 인한 픽셀 값 불일치

**현재 상태**:

```tsx
<div className="bg-greyscale-grey-50 h-1 w-full">
  <div className="bg-primary-blue-300 h-full" style={{ width: `${progress}%` }}></div>
</div>
```

**우선순위**: 낮음
**상태**: 미해결

---

### 2. DropDown Border 두께 렌더링 이슈

**파일**:

- `src/shared/ui/dropDown/deafult/dropDown.tsx`
- `src/shared/ui/dropDown/deafult/dropDown.variants.ts`

**문제**:

- 디자인 파일에서는 border를 1px로 지정했지만, 실제 브라우저에서 렌더링될 때 디자인보다 훨씬 얇게 보이는 현상 발생
- CSS `border: 1px` 또는 `border` 클래스 사용 시 브라우저 렌더링에서 시각적으로 얇게 표시됨

**현재 상태**:

```tsx
// dropDown.variants.ts
solid: "g-primary active:scale-[0.98] rounded-md border-[1.5px]",
outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 active:scale-[0.98]",

// dropDown.tsx
open ? "border-[1.5px] border-primary-blue-300" : "border-greyscale-grey-75",
"absolute left-0 top-full z-10 mt-2 w-full rounded border border-gray-200 bg-white font-bold text-text-tertiary"
```

**우선순위**: 낮음
**상태**: 미해결

---
