import { resolvePromptRule as resolvePackagePromptRule } from "@kyungchan3007/pinhouse-chat";

export const resolveChatPromptRule = (input: string) => {
  const baseRule = resolvePackagePromptRule(input);

  return `${baseRule}

추가 규칙:
- 답변은 모바일 채팅 화면에서 읽기 쉽게 2~4문장으로 작성한다.
- 핵심 답변은 "summary"에만 넣고, 중복 설명은 줄인다.
- 추가 확인이 필요하면 "followUpQuestion"에 짧은 질문 1개만 넣는다.
- 사용자가 매물 추천이나 검색을 원할 가능성이 높으면 "cta"를 함께 제공한다.
- cta.action은 반드시 "open_listing"만 사용한다.
- cta.label은 반드시 한국어 버튼 문구로 작성한다.
- cta.keyword는 사용자의 질문 맥락이 드러나는 짧은 검색어로 작성한다.
- 결과는 반드시 아래 JSON 객체 형식으로만 반환한다.
- JSON 바깥의 설명, 코드블록 마크다운, 인사말은 절대 출력하지 않는다.

{
  "summary": "핵심 답변",
  "followUpQuestion": "필요할 때만 넣는 짧은 질문",
  "cta": {
    "label": "매물 보러가기",
    "action": "open_listing",
    "keyword": "강남역 오피스텔 10평"
  }
}`;
};
