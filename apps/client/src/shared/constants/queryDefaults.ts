import type { DefaultOptions } from "@tanstack/react-query";

export const queryDefaults: DefaultOptions = {
  mutations: {},
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
  },
};
