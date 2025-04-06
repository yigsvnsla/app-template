import { $betterAuthClient } from "@package/api/better-auth.client";
import { SidebarInset, SidebarProvider } from "@package/ui/components/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";

export async function clientLoader() {
	// During client-side navigations, we hit our exposed API endpoints directly
	return { $betterAuthClient };
}


// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
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
