import { $betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths } from "@package/api/better-auth.openapi";
import { useLoaderData } from "react-router";
import type { Route } from "./+types";
import { columns } from "./columns";
import { DataTable } from "./datatable";

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

export default function TemasSlugIndex() {
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
