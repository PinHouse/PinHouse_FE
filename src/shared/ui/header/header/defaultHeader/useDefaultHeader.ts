import { useRouter } from "next/navigation";

type DefaultHeaderProps = {
  path: string;
  prevPath: string | null;
  reset: () => void;
};

export const useDefaultHeader = ({ path, prevPath, reset }: DefaultHeaderProps) => {
  const router = useRouter();

  const handleRouter = () => {
    const nextPath = prevPath ?? path;
    reset();
    if (prevPath) {
      router.push(nextPath);
    } else {
      router.back();
    }
  };
  return { handleRouter };
};
