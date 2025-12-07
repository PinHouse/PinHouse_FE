import { cn } from "@/lib/utils";
import { DownButton } from "@/src/assets/icons/button";
import { ListingsCardTileProps, RoomVariant } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { formatMinutes } from "../../../model";

const containerClass: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "border border-greyscale-grey-100",
  muted: "border border-greyscale-grey-75 bg-greyscale-grey-50",
};

const titleClass: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "text-greyscale-grey-900",
  muted: "text-greyscale-grey-400",
};

const downButton: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "text-gray-400",
  muted: "text-gray-300",
};

const roomTypeClass: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "text-primary-blue-300 border px-1 py-[1px]",
  muted: "text-primary-blue-75 border-none",
};

const infraClass: Record<NonNullable<ListingsCardTileProps["variant"]>, string> = {
  default: "text-gray-400 font-semibold",
  muted: "text-gray-400",
};

const RoomType = ({ roomType, variant }: { roomType: number; variant: RoomVariant }) => {
  return (
    <span className={`flex gap-1 rounded-lg text-xs-13 font-semibold ${roomTypeClass[variant]}`}>
      <p>방타입</p>
      <p>{roomType}개</p>
    </span>
  );
};
const InfraCount = ({ infra, variant }: { infra: string[]; variant: RoomVariant }) => {
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

export const ListingsCardTile = ({ listing, variant = "default" }: ListingsCardTileProps) => {
  return (
    <article className={`mb-3 rounded-lg p-3 ${containerClass[variant]} flex flex-col gap-1`}>
      <div className="flex items-center gap-2">
        <RoomType roomType={listing.unitCount} variant={variant} />
        <InfraCount infra={listing.infra} variant={variant} />
      </div>

      <div className="flex items-center gap-2">
        <h3 className={`line-clamp-1 text-sm-15 font-semibold ${titleClass[variant]}`}>
          {listing.name}
        </h3>
        <DownButton className={`ml-auto ${downButton[variant]}`} />
      </div>

      <p className="text-sm-12 text-sm-15 text-gray-400">
        {listing.address} · {formatMinutes(100)}
      </p>
    </article>
  );
};
