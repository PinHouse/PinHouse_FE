import { DownButton } from "@/src/assets/icons/button";
import { ListingsCardTileProps } from "@/src/entities/listings/model/type";
import { containerClass, downButton, titleClass } from "../../../model";
import { AnimatePresence, motion } from "framer-motion";
import { ListingsCardTileDetails } from "@/src/features/listings";
import { InfraCount, RoomType } from "@/src/features/listings/hooks/useListingsCardTileHooks";
import { useListingsCardTileOpenHooks } from "@/src/features/listings/hooks";

export const ListingsCardTile = ({ listing, variant = "default" }: ListingsCardTileProps) => {
  const { isOpen, handleToggle } = useListingsCardTileOpenHooks();

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
