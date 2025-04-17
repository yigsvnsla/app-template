import type { components } from "@package/api/better-auth.openapi";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@package/ui/components/avatar";
import { Badge } from "@package/ui/components/badge";
import { Button } from "@package/ui/components/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@package/ui/components/hover-card";
import {
	LuCalendar,
	LuChevronRight,
	LuHand,
	LuPencil,
	LuUserMinus,
} from "@package/ui/icons";
import { getAvatarInitials } from "@package/ui/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Link } from "react-router";

// TODO: ARREGLAR LAS PROPIEDADES INDEFINIDAS
export const columns: ColumnDef<components["schemas"]["Organization"]>[] = [
	{
		accessorKey: "name",
		cell({ row }) {
			return <section className="">{row.original.name}</section>;
		},
	},
	{
		header: "slug",
		cell({ row }) {
			return <section className="">{row.original.slug}</section>;
		},
	},
	{
		header: "create at",
		cell({ row }) {
			return (
				<span className="w-60 block">
					{format(row.original.createdAt as unknown as string, "Pp")}
				</span>
			);
		},
	},
	{
		accessorKey: "id",
		header: "options",
		cell({ row }) {
			return (
				<section className=" flex flex-row gap-x-4">
					<Button
						variant="outline"
						size="icon"
						onClick={async () => {
							// const { data, error } = await authClient.admin.unbanUser({
							// 	userId: row.original.id,
							// });
							// console.log({ data, error });
						}}
					>
						<LuPencil />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={async () => {
							// const { data, error } = await authClient.admin.banUser({
							// 	userId: row.original.id,
							// 	banReason: "Spamming", // Optional (if not provided, the default ban reason will be used - No reason)
							// 	banExpiresIn: 60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
							// });
							// console.log({ data, error });
						}}
					>
						<LuUserMinus />
					</Button>

					<Button asChild variant="outline" size="icon">
						<Link to={`./${row.original.slug}`} relative="path">
							<LuChevronRight />
						</Link>
					</Button>
				</section>
			);
		},
	},
];
