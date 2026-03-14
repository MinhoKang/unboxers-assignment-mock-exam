import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

import { queryDefaults } from "../../shared/constants/queryDefaults.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: queryDefaults.mutations,
    queries: queryDefaults.queries,
  },
});

function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
