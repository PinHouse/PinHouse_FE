import { cn } from "@/lib/utils";
import { DownButton } from "@/src/assets/icons/button";
import { ListingsCardTileProps, RoomVariant } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { containerClass, downButton, infraClass, roomTypeClass, titleClass } from "../../../model";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ListingsCardTileDetails } from "../infra/listingsCardTtileInfra";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <article className={`mb-3 rounded-lg ${containerClass[variant]} flex flex-col gap-1`}>
      <div className="p-3">
        <div className="flex items-center gap-2">
          <RoomType roomType={listing.unitCount} variant={variant} />
          <InfraCount infra={listing.infra} variant={variant} />
        </div>

        <div className="flex items-center gap-2">
          <h3 className={`line-clamp-1 text-sm-15 font-semibold ${titleClass[variant]}`}>
            {listing.name}
          </h3>
          <button
            type="button"
            onClick={handleToggle}
            className={`ml-auto transition-transform ${downButton[variant]} ${isOpen ? "rotate-180" : ""}`}
            aria-expanded={isOpen}
          >
            <DownButton className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm-12 text-sm-15 text-gray-400">
          {listing.address} · {listing.totalTime}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ListingsCardTileDetails listing={listing} />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
