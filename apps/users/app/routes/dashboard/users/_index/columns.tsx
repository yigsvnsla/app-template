import type { components } from "@package/clients/better-auth.openapi";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@package/ui/components/avatar";
import { Badge } from "@package/ui/components/badge";
import { Button } from "@package/ui/components/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@package/ui/components/tooltip";

import { LuChevronRight, LuPencil, LuUserMinus } from "@package/ui/icons";
import { getAvatarInitials } from "@package/ui/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Link } from "react-router";

export const columns: ColumnDef<components["schemas"]["User"]>[] = [
	{
		accessorKey: "name",
		cell({ row }) {
			return (
				<section className=" flex flex-row gap-x-4">
					<Avatar>
						<AvatarImage src={row.original.image} />
						<AvatarFallback>
							{getAvatarInitials(row.original.name ?? "")}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<h6 className="font-semibold capitalize text-base">
							{row.original.name}
						</h6>
						<p className="text-xs">{row.original.email}</p>
					</div>
				</section>
			);
		},
	},
	{
		accessorKey: "role",
		cell({ row }) {
			return (
				<Badge variant="outline" className="uppercase">
					{row.original.role}
				</Badge>
			);
		},
	},

	{
		accessorKey: "status",
		cell({ row }) {
			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Badge
								variant={row.original.banned ? "destructive" : "secondary"}
								className="uppercase"
							>
								{row.original.banned ? "banned" : "active"}
							</Badge>
						</TooltipTrigger>
						<TooltipContent className="bg-secondary text-foreground space-y-2">
							<section>
								<span className="capitalize font-semibold">ban reason</span>
								<p className="text-xs capitalize">
									{row.original.banReason ?? "no applies"}
								</p>
							</section>
							<section>
								<span className="capitalize font-semibold">ban expire</span>
								<p className="text-xs capitalize">
									{
										// TODO: CREATE ISSUE IN BETTER AUTH FOR THIS
										format(row.original.updatedAt as unknown as string, "Pp") ??
											"no applies"
									}
								</p>
							</section>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			);
		},
	},
	{
		accessorKey: "Verified",
		cell({ row }) {
			return (
				<Badge
					variant={row.original.emailVerified ? "outline" : "secondary"}
					className="uppercase"
				>
					{row.original.emailVerified ? "verified" : "not verified"}
				</Badge>
			);
		},
	},
	{
		header: "create at",
		cell({ row }) {
			return (
				<span className=" block">
					{
						// TODO: CREATE ISSUE IN BETTER AUTH FOR THIS
						format(row.original.createdAt as unknown as string, "Pp")
					}
				</span>
			);
		},
	},
	{
		header: "update at",
		cell({ row }) {
			return (
				<span className=" block">
					{
						// TODO: CREATE ISSUE IN BETTER AUTH FOR THIS
						format(row.original.updatedAt as unknown as string, "Pp")
					}
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
						<Link to={`./${row.original.id}`} relative="path">
							<LuChevronRight />
						</Link>
					</Button>
				</section>
			);
		},
	},
];
