import { resolvePromptRule as resolvePackagePromptRule } from "@kyungchan3007/pinhouse-chat";
import { CHAT_TAG_OPTIONS, ChatCategoryKey } from "./chatResponse";

type ResolveChatPromptRuleParams = {
  input: string;
  selectedKeys?: ChatCategoryKey[];
};

export const resolveChatPromptRule = ({
  input,
  selectedKeys = [],
}: ResolveChatPromptRuleParams) => {
  const baseRule = resolvePackagePromptRule(input);
  const selectedOptions = CHAT_TAG_OPTIONS.filter(option => selectedKeys.includes(option.key));
  const hasListingCategory = selectedKeys.includes("listing");

  const categoryRule =
    selectedOptions.length > 0
      ? `

카테고리 우선 규칙:
${selectedOptions.map(option => `- ${option.label}(${option.key}): ${option.promptRule}`).join("\n")}`
      : "";

  const ctaRule = hasListingCategory
    ? `

매물 CTA 규칙:
- listing 카테고리가 선택된 경우에만 ctas를 생성할 수 있다.
- 사용자의 질문이 매물 탐색, 추천, 비교와 관련되면 ctas를 포함한다.
- 지역이 1개면 ctas는 1개만 만든다.
- 지역이 2개 이상이면 지역별로 ctas를 각각 만든다.
- 각 cta.action은 반드시 "open_listing"만 사용한다.
- 각 cta.label은 한국어 버튼 문구로 작성한다.
- 각 cta.keyword는 검색에 바로 사용할 수 있는 단일 지역 키워드로 작성한다.
- 예: 수원과 분당을 함께 요청하면 "수원 매물 보러가기", "분당 매물 보러가기"처럼 각각 만든다.`
    : `

매물 CTA 규칙:
- listing 카테고리가 선택되지 않은 경우 ctas는 생성하지 않는다.
- summary와 followUpQuestion만 사용해서 답변한다.`;

  const responseExample = hasListingCategory
    ? `{
  "summary": "핵심 답변",
  "followUpQuestion": "필요할 때만 넣는 짧은 질문",
  "ctas": [
    {
      "label": "수원 매물 보러가기",
      "action": "open_listing",
      "keyword": "수원"
    },
    {
      "label": "분당 매물 보러가기",
      "action": "open_listing",
      "keyword": "분당"
    }
  ]
}`
    : `{
  "summary": "핵심 답변",
  "followUpQuestion": "필요할 때만 넣는 짧은 질문"
}`;

  return `${baseRule}

추가 규칙:
- 답변은 모바일 채팅 화면에서 읽기 쉽게 2~4문장으로 작성한다.
- 핵심 답변은 "summary"에만 넣고, 중복 설명은 줄인다.
- 추가 확인이 필요하면 "followUpQuestion"에 짧은 질문 1개만 넣는다.
- 결과는 반드시 아래 JSON 객체 형식으로만 반환한다.
- JSON 바깥의 설명, 코드블록 마크다운, 인사말은 절대 출력하지 않는다.
- 사용자가 지역, 모집대상, 임대주택/매물 조회를 요청하는 것은 기본적으로 검색 가능한 요청으로 본다.
- 금액, 예산, 비용, 보증금, 월세, 면적, 평수 조건은 사용자가 직접 해당 표현을 말한 경우에만 검색불가 조건으로 본다.
- 사용자가 위 비용/면적 조건을 명시하지 않았다면 관련 한계는 언급하지 않는다.
- 추천/비교 요청은 검색 자체를 막는 조건이 아니라 부가적인 요청으로 본다.
- 사용자가 매물을 찾아달라고 하거나 보여달라고 요청한 경우, 검색 가능한 지역/대상 키워드가 있으면 cta를 생성할 수 있다.
- 검색불가 조건만 있는 경우, cta를 생성하지 말고 summary에서 한계를 짧게 설명한다.
- 검색가능 키워드와 검색불가 조건이 함께 있는 경우, 한계를 먼저 안내한 뒤 검색가능한 키워드만 반영할 수 있다.
- 이 경우 summary에는 "현재는 비용 조건 검색은 지원하지 않아요. 수원 지역 공고를 먼저 보여드릴게요."처럼 한계를 자연스럽게 설명하되, 실제로 비용/면적 조건이 언급된 경우에만 사용한다.
- 검색가능 키워드만으로 cta.keyword를 만든다.
- 추상 지역 표현(예: 수도권, 서울 근교, 역세권 위주 등)은 그대로 cta.keyword에 넣지 않는다.
- 추천/비교 요청만 있고 검색 가능한 지역/대상 키워드가 부족하면 cta를 생성하지 않는다.

${categoryRule}
${ctaRule}

${responseExample}`;
};
