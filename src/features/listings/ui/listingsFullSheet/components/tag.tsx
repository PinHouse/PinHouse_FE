import { motion, AnimatePresence } from "framer-motion";

export const Tag = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="flex flex-col"
        >
          <span
            className={`rounded-full px-4 py-2 text-xs font-bold hover:cursor-pointer ${
              selected ? "bg-button-light text-text-inverse" : "bg-gray-100 text-text-secondary"
            }`}
            onClick={onClick}
          >
            {label}
          </span>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
