import { $betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths } from "@package/api/better-auth.openapi";
import { Button } from "@package/ui/components/button";
import { useLoaderData } from "react-router";
import type { Route } from "./+types";
import { columns } from "./columns";
import { DataTable } from "./datatable";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	return { $betterAuthClient };
}

export default function UsersIndex() {
	const { $betterAuthClient } =
		useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();

	const { data } = $betterAuthClient.useQuery("get", ApiPaths.listUsers);

	return (
		<section>
			<DataTable columns={columns} data={data?.users ?? []} />
		</section>
	);
}
