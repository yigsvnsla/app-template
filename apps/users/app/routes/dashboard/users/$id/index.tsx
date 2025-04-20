import { $betterAuthClient } from "@package/api/better-auth.client";
import { ApiPaths as BetterAuthApiPaths } from "@package/api/better-auth.openapi";
import { $filesClient } from "@package/api/files.client";
import { ApiPaths as FilesApiPaths } from "@package/api/files.openapi";
import { Content } from "@package/ui/components/custom/content";
import { useParams } from "react-router";

export default function UserByIdIndex() {
	const params = useParams();

	const userQuery = $betterAuthClient.useQuery(
		"post",
		BetterAuthApiPaths.impersonateUser,
		{
			body: {
				userId: String(params.id),
			},
		},
	);

	return (
		<Content>
			<span>UserByIdIndex {params.id}</span>
			<br />
			{JSON.stringify(userQuery.data)}
		</Content>
	);
}
