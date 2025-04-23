import {
	$betterAuthClient,
	betterAuthClient,
} from "@package/clients/better-auth.client";
import {
	ApiPaths as betterAuthApiPaths,
	type components,
} from "@package/clients/better-auth.openapi";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@package/ui/components/alert-dialog";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@package/ui/components/avatar";
import { Badge } from "@package/ui/components/badge";
import { Button } from "@package/ui/components/button";
import { toast } from "@package/ui/components/sonner";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@package/ui/components/tooltip";

import {
	LuChevronRight,
	LuPencil,
	LuUserPen,
	LuUserPlus,
	LuUserSearch,
	LuUserX,
} from "@package/ui/icons";
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
			const { refetch } = $betterAuthClient.useQuery(
				"get",
				betterAuthApiPaths.listUsers,
			);
			const { mutateAsync } = $betterAuthClient.useMutation(
				"post",
				row.original.banned
					? betterAuthApiPaths.unbanUser
					: betterAuthApiPaths.banUser,
				{
					onSuccess: ({ user }) => {
						refetch();
					},
				},
			);

			return (
				<section className=" flex flex-row gap-x-4">
					<Button
						type="button"
						variant="secondary"
						size="icon"
						onClick={async () => {
							// const { data, error } = await authClient.admin.unbanUser({
							// 	userId: row.original.id,
							// });
							// console.log({ data, error });
						}}
					>
						<LuUserPen />
					</Button>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button type="button" variant="secondary" size="icon">
								{row.original.banned ? <LuUserPlus /> : <LuUserX />}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete
									your account and remove your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>

								<AlertDialogAction
									asChild
									onClick={async () => {
										if (!row.original.id) {
											throw new Error("[row.id] USER NOT ID");
										}

										toast.promise(
											mutateAsync({
												body: {
													userId: row.original.id,
												},
											}),
										);
									}}
								>
									{row.original.banned ? (
										<Button type="button" variant="default">
											UnBan User
											<LuUserPlus />
										</Button>
									) : (
										<Button type="button" variant="ghost">
											Ban User
											<LuUserX />
										</Button>
									)}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<Button asChild type="button" variant="secondary" size="icon">
						<Link to={`./${row.original.id}`} relative="path">
							<LuUserSearch />
						</Link>
					</Button>
				</section>
			);
		},
	},
];
