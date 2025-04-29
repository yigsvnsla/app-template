"use client";

import { $betterAuthClient } from "@package/clients/better-auth.client";
import { ApiPaths } from "@package/clients/better-auth.openapi";
import type { components } from "@package/clients/better-auth.openapi";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@package/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@package/ui/components/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@package/ui/components/sidebar";
import { toast } from "@package/ui/components/sonner";
import { Spinner } from "@package/ui/components/spinner";
import { getAvatarInitials } from "@package/ui/lib/utils";
import {
	BellIcon,
	CreditCardIcon,
	LogOutIcon,
	MoreVerticalIcon,
	UserCircleIcon,
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import type { clientLoader } from "~/routes/dashboard/_layout";

export default function NavUser() {
	const { isMobile } = useSidebar();
	const navigate = useNavigate();

	const loaderdata = useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();
	const user = loaderdata?.user;

	const { mutateAsync, isPending } = $betterAuthClient.useMutation(
		"post",
		ApiPaths.PostSignout,
		{
			onSuccess: (data) => {
				// storeSetToken(null);
				// storeSetUser(null);
				navigate("/auth/sign-in");
			},
		},
	);

	const handleLogout = async () => {
		toast.promise(mutateAsync({}), {
			loading: "Logging out...",
			success: "Logged out successfully",
			error: (error) => error.message,
		});
	};

	// TODO: IDEAR ALGO MEJOR QUE VALIDAR DIRECTAMENTE CON EL ESTADO DEL USUARIO
	return (
		<>
			{user && (
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar className="h-8 w-8 rounded-lg grayscale">
										<AvatarImage src={user.image} alt={user.name} />
										<AvatarFallback className="rounded-lg">
											{getAvatarInitials(user.name ?? "")}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user.name}</span>
										<span className="truncate text-xs text-muted-foreground">
											{user.email}
										</span>
									</div>
									<MoreVerticalIcon className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align="end"
								sideOffset={4}
							>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage src={user.image} alt={user.name} />
											<AvatarFallback className="rounded-lg">
												{getAvatarInitials(user.name ?? "")}
											</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">{user.name}</span>
											<span className="truncate text-xs text-muted-foreground">
												{user.email}
											</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<UserCircleIcon />
										Account
									</DropdownMenuItem>
									<DropdownMenuItem>
										<CreditCardIcon />
										Billing
									</DropdownMenuItem>
									<DropdownMenuItem>
										<BellIcon />
										Notifications
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem disabled={isPending} onClick={handleLogout}>
									<LogOutIcon />
									{isPending ? <Spinner className="text-white" /> : "Log out"}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			)}
		</>
	);
}
