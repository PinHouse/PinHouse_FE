# 부동산 임대 웹앱 프로젝트 — 1차 FE 세팅 요약

## 아키텍처

- **구조:** Next.js **App Router + React Query + FSD Hybrid**
- **언어:** TypeScript
- **스타일:** Tailwind CSS
- **상태관리:** Zustand
- **아키텍쳐:**FSD Hybrid (Feature Sliced Design + App Router)
- **목표 형태:** **웹앱형 반응형 UI** (Desktop 중심, 모바일 대응)

---

## Tailwind CSS 세팅

### 설치 및 환경 구성

- Tailwind 3.x 기반 (ESM 환경 대응)
- 다음 파일 생성 및 수정 완료:
  - `tailwind.config.mjs`
  - `postcss.config.mjs`
  - `globals.css`
  - `package.json` → `"type": "module"` 추가

---
