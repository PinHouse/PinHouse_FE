import { CHAT_TAG_OPTIONS, ChatCategoryKey } from "./chatResponse";
import { resolveChatPromptRule } from "./resolveChatPromptRule";

type BuildChatPayloadParams = {
  message: string;
  selectedKeys: ChatCategoryKey[];
};

export const buildChatPayload = ({ message, selectedKeys }: BuildChatPayloadParams) => {
  const selectedOptions = CHAT_TAG_OPTIONS.filter(option => selectedKeys.includes(option.key));

  return {
    categories: selectedOptions.map(option => option.key),
    promptType: resolveChatPromptRule({
      input: message,
      selectedKeys,
    }),
  };
};
