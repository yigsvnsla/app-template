import { createAuthClient } from "better-auth/client";
import {
	adminClient,
	inferAdditionalFields,
	magicLinkClient,
	organizationClient,
} from "better-auth/client/plugins";
import type { auth } from "./auth.ts";

export const authClient = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL,
	plugins: [
		magicLinkClient(),
		organizationClient(),
		adminClient(),
		inferAdditionalFields<typeof auth>(),
	],
});

// authClient.admin.createUser({
// 	data
// })