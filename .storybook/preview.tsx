import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import type { Decorator } from "@storybook/react";

const queryClient = new QueryClient();

const withQueryClient: Decorator = Story => (
  <QueryClientProvider client={queryClient}>
    <AnimatePresence mode="wait">
      <Story />
    </AnimatePresence>
  </QueryClientProvider>
);

export const decorators = [withQueryClient];
