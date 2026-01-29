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
    router.push(nextPath);
  };
  return { handleRouter };
};
