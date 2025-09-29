import { createAuthClient as betterAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@app/auth/utils/auth";

export const createAuthClient = (url: string) => {
  return betterAuthClient({
    baseURL: url, // The base URL of your auth server
    basePath: "/auth/api",
    plugins: [inferAdditionalFields<typeof auth>()],
    fetchOptions: {
      throw: true,
    },
  });
};
