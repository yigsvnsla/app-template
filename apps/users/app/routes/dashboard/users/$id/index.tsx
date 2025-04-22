import {
	$betterAuthClient,
	betterAuthClient,
} from "@package/clients/better-auth.client";
import { ApiPaths as BetterAuthApiPaths } from "@package/clients/better-auth.openapi";
import { $filesClient } from "@package/clients/files.client";
import { ApiPaths as FilesApiPaths } from "@package/clients/files.openapi";
import { Content } from "@package/ui/components/custom/content";
import { useCallback } from "react";
import { useLoaderData, useParams, useRouteLoaderData } from "react-router";
import { useBeforeUnload } from "react-router";
import UserCreateIndex from "../create";
import type { Route } from "./+types";

export async function clientLoader(params: Route.ClientLoaderArgs) {
	const x = await betterAuthClient.POST(
		BetterAuthApiPaths.PostAdminStopimpersonating,
	);
	// const { data, error } = await betterAuthClient.POST(
	// 	BetterAuthApiPaths.impersonateUser,
	// 	{
	// 		body: {
	// 			userId: String(params.params.id),
	// 		},
	// 	},
	// );
	// if (error) throw new Error(error.message, { cause: error });
	// return {
	// 	impersonation: data,
	// };
}

export default function UserByIdIndex() {
	// const { impersonation } =
	// 	useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();

	// useBeforeUnload(useCallback())

	return (
		<>
			{/* <UserCreateIndex userImpersonated={impersonation} /> */}
			<Content>
				dasdsa
				{/* <span>UserByIdIndex {JSON.stringify(impersonation)}</span>
				<br />
				{JSON.stringify(impersonation)} */}
			</Content>
		</>
	);
}
