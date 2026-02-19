/** 진단결과 임대주택 유형별 설명 (API recommended 파싱용 라벨과 매칭) */
export const HOUSING_TYPE_DESCRIPTIONS: Record<string, string> = {
  통합공공임대:
    "저소득층, 젊은 층 및 장애인·국가유공자 등 사회 취약 계층 등의 주거안정을 목적으로 공급하는 공공임대주택",
  국민임대:
    "저소득 무주택 세대의 주거 안정을 위해 국가와 지자체가 공급하는 국민임대주택",
  행복주택:
    "청년·신혼부부·노인 등 주거 취약계층을 위한 공공 주거지원 주택",
  공공임대:
    "국가·지자체 등이 건설하거나 매입하여 저소득층 등에 임대하는 공공임대주택",
  영구임대:
    "저소득 무주택자에게 평생 거주권을 부여하는 영구임대주택",
  장기전세:
    "전세금을 지원하여 장기간 거주할 수 있도록 하는 주택",
  매입임대:
    "국가·지자체가 기존 주택을 매입하여 저소득층 등에 임대하는 주택",
  전세임대:
    "전세 계약을 통해 저소득층 등에 임대하는 주택",
};

/** 진단결과 임대주택 유형별 태그 배경색 (tailwind 또는 임의 클래스) */
export const HOUSING_TYPE_TAG_CLASS: Record<string, string> = {
  통합공공임대: "bg-teal-100 text-teal-800",
  국민임대: "bg-amber-100 text-amber-800",
  행복주택: "bg-emerald-100 text-emerald-800",
  공공임대: "bg-amber-100 text-amber-800",
  영구임대: "bg-violet-100 text-violet-800",
  장기전세: "bg-rose-100 text-rose-800",
  매입임대: "bg-violet-100 text-violet-800",
  전세임대: "bg-orange-100 text-orange-800",
};
