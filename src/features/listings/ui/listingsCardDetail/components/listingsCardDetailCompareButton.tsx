import { SmallHomeLine } from "@/src/assets/icons/home/smallHomeLine";
import { useRouter } from "next/navigation";

export const ListingsCardDetailCompareButton = ({ paramId }: { paramId: string }) => {
  const router = useRouter();

  const handleCompareClick = () => {
    router.push(`/listings/${paramId}/compare`);
  };

  return (
    <section className="py-1 pl-5 pr-5">
      <button
        onClick={handleCompareClick}
        className="flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-primary-blue-25 text-sm font-medium text-primary-blue-300"
      >
        <SmallHomeLine /> 방 비교하기
      </button>
    </section>
  );
};
