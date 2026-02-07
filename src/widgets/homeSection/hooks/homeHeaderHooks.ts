import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useHomeHeaderHooks = () => {
  const router = useRouter();

  const onRouteChange = useCallback(() => {
    router.push("/home/search");
  },[])
  return {
    onRouteChange,
  }
}