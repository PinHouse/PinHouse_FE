export type ChatCtaAction = "open_listing";

export type ChatCta = {
  label: string;
  action: ChatCtaAction;
  keyword?: string;
};

export type ChatUiResponse = {
  summary: string;
  followUpQuestion?: string;
  cta?: ChatCta;
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
