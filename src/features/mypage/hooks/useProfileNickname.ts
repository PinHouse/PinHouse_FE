import { useEffect, useState } from "react";

/**
 * 유저 닉네임과 동기화되는 편집 가능한 닉네임 state
 * initialNickname이 바뀌면 로컬 state도 갱신됨
 */
export function useProfileNickname(initialNickname: string) {
  const [nickname, setNickname] = useState(initialNickname);

  useEffect(() => {
    setNickname(initialNickname);
  }, [initialNickname]);

  return [nickname, setNickname] as const;
}
