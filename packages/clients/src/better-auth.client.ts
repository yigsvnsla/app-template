import type { paths } from "@package/clients/better-auth.openapi";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

export const betterAuthClient = createFetchClient<paths>({
	baseUrl: "http://localhost:8888/api/auth",
	credentials: "include",
});

export const $betterAuthClient = createClient<paths>(betterAuthClient);
