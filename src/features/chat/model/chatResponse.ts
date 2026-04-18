export type ChatCtaAction = "open_listing";

export type ChatCta = {
  label: string;
  action: ChatCtaAction;
  keyword?: string;
};

export type ChatUiResponse = {
  summary: string;
  followUpQuestion?: string;
  ctas?: ChatCta[];
};

export type ChatRenderItem =
  | {
      id: string;
      type: "message";
      role: "user" | "assistant";
      content: string;
    }
  | {
      id: string;
      type: "cta";
      cta: ChatCta;
    };

export type ChatCategoryKey = "term" | "eligibility_challenge" | "system" | "policy" | "listing";

type ChatTagOption = {
  key: ChatCategoryKey;
  label: string;
  promptRule: string;
};

export const CHAT_TAG_OPTIONS: ChatTagOption[] = [
  {
    key: "term",
    label: "용어",
    promptRule: "부동산/공공임대 관련 용어를 쉬운 말로 정의하고 짧은 예시를 포함해 설명해줘.",
  },
  {
    key: "eligibility_challenge",
    label: "자격도전",
    promptRule:
      "사용자의 조건을 기준으로 지원 가능성을 단계적으로 판단하고, 부족한 조건과 확인이 필요한 조건을 구분해서 설명해줘.",
  },
  {
    key: "system",
    label: "제도",
    promptRule: "관련 제도의 목적, 대상, 핵심 조건, 신청 흐름을 항목별로 정리해서 설명해줘.",
  },
  {
    key: "policy",
    label: "정책",
    promptRule: "정책의 배경, 적용 대상, 기대 효과, 유의사항을 구분해서 설명해줘.",
  },
  {
    key: "listing",
    label: "매물",
    promptRule: "매물/공고 관점에서 핵심 조건, 위치, 비교 포인트를 중심으로 요약해줘.",
  },
];
