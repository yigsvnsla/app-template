import { Content, ContentHeader } from "@package/ui/components/custom/content";
import { Outlet } from "react-router";

export default function TeamIndexLayout() {
	return (
		<Content>
			<ContentHeader>
				<h1 className="text-3xl font-bold">Teams</h1>
			</ContentHeader>
			<Outlet />
		</Content>
	);
}
