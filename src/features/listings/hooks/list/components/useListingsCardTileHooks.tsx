import { RoomVariant } from "@/src/entities/listings/model/type";
import { infraClass, roomTypeClass } from "@/src/features/listings/model";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { cn } from "@/lib/utils";
import { Button } from "@/src/shared/lib/headlessUi";
import { ReactNode } from "react";

export const RoomType = ({ roomType, variant }: { roomType: number; variant: RoomVariant }) => {
  return (
    <span className={`flex gap-1 rounded-lg text-xs-13 font-semibold ${roomTypeClass[variant]}`}>
      <p>방타입</p>
      <p>{roomType}개</p>
    </span>
  );
};

export const InfraCount = ({ infra, variant }: { infra: string[]; variant: RoomVariant }) => {
  const count = infra.length;
  return (
    <TagButton
      size="xs"
      className={cn(`gap-1 rounded-3xl border-none text-xs ${infraClass[variant]} transition-all`)}
    >
      <p>주변</p>
      {count}
    </TagButton>
  );
};

interface DetailSectionProps {
  title: string;
  showAction?: boolean;
  children: ReactNode;
  onOpen: () => void;
}

export const DetailSection = ({
  title,
  children,
  showAction = false,
  onOpen,
}: DetailSectionProps) => {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold text-greyscale-grey-800">{title}</p>
        {showAction && (
          <Button
            type="button"
            theme={"grey"}
            variant={"ghost"}
            className="text-primary-blue-300 hover:text-primary-blue-500"
            size={"xs"}
            radius={"sm"}
            onClick={onOpen}
          >
            자세히
          </Button>
        )}
      </div>
      {children}
    </section>
  );
};

export const EmptyDetail = ({ children }: { children: ReactNode }) => (
  <p className="rounded-lg bg-greyscale-grey-25 px-3 py-2 text-xs font-medium text-greyscale-grey-500">
    {children}
  </p>
);
