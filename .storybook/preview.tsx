import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

export const decorators = [
  (Story: any) => (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <Story />
      </AnimatePresence>
    </QueryClientProvider>
  ),
];
