import { $betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths } from "@package/api/better-auth.openapi";
import { Button } from "@package/ui/components/button";
import { useLoaderData } from "react-router";
import type { Route } from "./+types";
import { columns } from "./columns";
import { CreateOrganizationDialog } from "./create-organization-dialog.component";
import { DataTable } from "./datatable";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	return { $betterAuthClient };
}

export default function OrganizationsIndex() {
	const { $betterAuthClient } =
		useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();

	const { data } = $betterAuthClient.useQuery(
		"get",
		ApiPaths.GetOrganizationList,
	);

	return (
		<div>
			<CreateOrganizationDialog>
				<Button>Add Organization</Button>
			</CreateOrganizationDialog>

			<h2 className="text-sm font-medium text-gray-500">Organization</h2>
			<section>
				<DataTable columns={columns} data={data ?? []} />
			</section>
		</div>
	);
}
