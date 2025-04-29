import { betterAuthClient } from "@package/clients/better-auth.client";
import { ApiPaths as BetterAuthApiPaths } from "@package/clients/better-auth.openapi";
import { SidebarInset, SidebarProvider } from "@package/ui/components/sidebar";
import { Outlet, redirect } from "react-router";
import { AppSidebar } from "~/routes/dashboard/-components/app-sidebar";
import ScreenLoader from "~/routes/dashboard/-components/screen-loader";
import { SiteHeader } from "~/routes/dashboard/-components/site-header";

export async function clientLoader() {
  const { data } = await betterAuthClient.GET(BetterAuthApiPaths.GetGetsession);

  if (!data || !data.user) {
    throw redirect("/auth/sign-in");
  }

  return data;
}

export function HydrateFallback() {
	return <ScreenLoader />;
}

export default function DashboardLayout() {
	return (
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
