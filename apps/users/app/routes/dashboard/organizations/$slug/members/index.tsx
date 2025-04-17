import { $betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths } from "@package/api/better-auth.openapi";
import { useLoaderData } from "react-router";
import { columns } from "~/routes/dashboard/organizations/$slug/members/columns";
import { DataTable } from "~/routes/dashboard/organizations/$slug/members/datatable";
import type { Route } from "./+types";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	// const { data, error } = await authClient.admin.listUsers({
	// 	query: {
	// 		limit: 10,
	// 	},
	// });
	// console.log({ data, error });

	// if (!data) {
	// 	return null;
	// }
	// return { ...data };
	return { $betterAuthClient };
}

export default function TeamMemberIndex() {
	const { $betterAuthClient } =
		useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();

	const { data } = $betterAuthClient.useQuery("get", ApiPaths.listUsers, {
		query: {
			limit: 10,
		},
		headers: {
			// "Autorization": "Bearer",
		},
	});

	return (
		<section>
			<DataTable columns={columns} data={data?.users ?? []} />
		</section>
	);
}
