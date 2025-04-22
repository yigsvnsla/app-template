import { $betterAuthClient } from "@package/clients/better-auth.client";
import { ApiPaths } from "@package/clients/better-auth.openapi";
import { Content } from "@package/ui/components/custom/content";
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
		<Content>
			<DataTable columns={columns} data={data?.users ?? []} />
		</Content>
	);
}
