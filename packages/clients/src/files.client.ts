import type { paths } from "@package/clients/files.openapi";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

export const filesClient = createFetchClient<paths>({
	baseUrl: "http://localhost:4343",
	credentials: "include",
	
});

export const $filesClient = createClient<paths>(filesClient);
