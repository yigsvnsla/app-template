import { betterAuthClient } from "@package/clients/better-auth.client";
import { ApiPaths as BetterAuthApiPaths } from "@package/clients/better-auth.openapi";
import { Content } from "@package/ui/components/custom/content";
import { useLoaderData } from "react-router";

import { UserForm } from "../create/user-form";
import type { Route } from "./+types";

export async function clientLoader(params: Route.ClientLoaderArgs) {
	const impersonateUser = await betterAuthClient.POST(
		BetterAuthApiPaths.impersonateUser,
		{
			body: {
				userId: String(params.params.id),
			},
		},
	);

	if (impersonateUser.error) {
		throw new Error(impersonateUser.error.message, {
			cause: impersonateUser.error,
		});
	}

	const stopImpersonation = await betterAuthClient.POST(
		BetterAuthApiPaths.PostAdminStopimpersonating,
	);

	if (stopImpersonation.error) {
		throw new Error(stopImpersonation.error.message, {
			cause: stopImpersonation.error,
		});
	}

	return {
		user: impersonateUser.data,
	};
}

export default function UserByIdIndex() {
	const { user } = useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();
	return (
		<Content>
			<UserForm userImpersonated={user} />
		</Content>
	);
}
