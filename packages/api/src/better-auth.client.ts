import type { paths } from "@package/api/better-auth.openapi";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

const betterAuthClient = createFetchClient<paths>({
	baseUrl: "http://localhost:8888/api/auth",
	credentials: "include",
});

export const $betterAuthClient = createClient<paths>(betterAuthClient);
