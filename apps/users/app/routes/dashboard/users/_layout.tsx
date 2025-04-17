import {
	Content,
	ContentHeader,
	ContentLabel,
} from "@package/ui/components/custom/content";
import { Outlet } from "react-router";

export default function UsersIndexLayout() {
	return (
		// <Content>
		// 	<ContentHeader>
		// 		<ContentLabel type="title">users</ContentLabel>
		// 		<ContentLabel type="caption">list of users</ContentLabel>

		// 	</ContentHeader>
		<Outlet />
		// </Content>
	);
}
