import { inferAdditionalFields, organizationClient } from "better-auth/client/plugins";
import { createAuthClient as betterAuthClient } from "better-auth/react";
import type { auth } from "../utils/auth";

export const createAuthClient = (url: string) => {
  return betterAuthClient({
    baseURL: url, // The base URL of your auth server
    basePath: "/auth/api",
    plugins: [inferAdditionalFields<typeof auth>(), organizationClient()],
    fetchOptions: {
      throw: true,
    },
  });
};
